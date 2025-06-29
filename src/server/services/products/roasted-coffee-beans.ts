import { RoastedBeansProductEditForm as EditForm, RoastedBeansProductForm } from "~/schema/product";
import {
    createBaseProduct,
    updateBaseProduct
} from "../products";
import { getDB } from "~/lib/db";
import type { JSONObject, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";

export async function createRoastedBeansProduct({
    values,
    event,
}: {
    values: RoastedBeansProductForm;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform, redirect } = event;

    const db = await getDB(platform.env);

    try {
        const newProduct = await createBaseProduct({ values, event });

        if (!newProduct) {
            return;
        }

        const roastedBeansData = {
            origin: values.roasted_beans_data.origin,
            process: values.roasted_beans_data.process,
            test_notes: values.roasted_beans_data.testNotes || '',
            packaging: values.roasted_beans_data.packaging,
            product_id: newProduct.id,
        };
        const newRoastedBeansProduct = await db.roasted_Beans_Product.create({ data: roastedBeansData });

        const servingRecommendationsData = values.roasted_beans_data.serving_recomendation.map(sr => ({
            name: sr.name,
            description: sr.description,
            roasted_beans_product_id: newRoastedBeansProduct.id,
        }));

        if (servingRecommendationsData.length > 0) {
            await db.serving_Recomendation.createMany({ data: servingRecommendationsData });
        }

        return {
            success: true,
            message: "Roasted Beans Product berhasil ditambahkan!"
        };

    } catch (error: any) {
        console.error("Error creating Roasted Beans Product:", error);
        return {
            success: false,
            message: error.message || "Gagal menambahkan Roasted Beans Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
    finally {
        throw redirect(301, "/cms/products/roasted-coffee-beans");
    }
}

export async function updateRoastedBeansProduct({
    values,
    event,
}: {
    values: EditForm;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform, params } = event;
    const id = parseInt(params.id);

    const db = await getDB(platform.env);

    try {
        const updatedProduct = await updateBaseProduct({
            values: values,
            event
        });

        if (!updatedProduct) {
            return {
                success: false,
                message: "Gagal memperbarui produk dasar.",
                errors: { general: "Terjadi kesalahan saat memperbarui detail produk dasar." }
            };
        }

        const roastedBeansData = {
            origin: values.roasted_beans_data.origin,
            process: values.roasted_beans_data.process,
            test_notes: values.roasted_beans_data.testNotes || '',
            packaging: values.roasted_beans_data.packaging
        };

        await db.roasted_Beans_Product.update({
            where: { product_id: updatedProduct.id },
            data: roastedBeansData,
        });

        // await updateServingRecommendations({ values, event });
        const servingRecommendationsData = values.roasted_beans_data.serving_recomendation.map(sr => ({
            name: sr.name,
            description: sr.description,
            roasted_beans_product_id: id,
        }));

        if (servingRecommendationsData.length > 0) {
            await db.serving_Recomendation.createMany({ data: servingRecommendationsData });
        }

        return {
            success: true,
            message: "Roasted Beans Product berhasil diperbarui!"
        };

    } catch (error: any) {
        if (error.code === 'P2025') {
            return {
                success: false,
                message: "Produk atau data terkait tidak ditemukan.",
                errors: { general: "Produk yang ingin diperbarui tidak ditemukan." }
            };
        }
        return {
            success: false,
            message: error.message || "Gagal memperbarui Roasted Beans Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    } 
    // try {
    //     // Ambil rekomendasi yang sudah ada di database
    //     const existingRecommendations = await db.serving_Recomendation.findMany({
    //         where: { roasted_beans_product_id: roastedBeansProductId },
    //         select: {
    //             id: true,
    //             name: true,
    //             description: true
    //         },
    //     });

    //     // Pastikan input serving_recomendation selalu berupa array
    //     const formServingRecommendations = values.roasted_beans_data.serving_recomendation ?? [];

    //     const newRecommendationIdsInForm = new Set(
    //         formServingRecommendations
    //             .filter(rec => rec.id !== undefined && rec.id !== null) // Filter out undefined and null IDs
    //             .map(rec => rec.id!)
    //     );

    //     const recommendationsToCreate: Omit<ServingRecommendationFormData, 'id'>[] = [];
    //     const recommendationIdsToDelete: number[] = [];
    //     const prismaOperations: Promise<any>[] = []; // Inisialisasi di sini

    //     // Logic untuk membuat atau memperbarui (jika ada ID yang sama)
    //     // Atau Anda bisa memisahkan ini: buat baru jika tidak ada ID, update jika ada ID
    //     for (const newRec of formServingRecommendations) {
    //         if (newRec.id === undefined || newRec.id === null) {
    //             // Ini adalah rekomendasi baru, tambahkan untuk dibuat
    //             recommendationsToCreate.push({
    //                 name: newRec.name,
    //                 description: newRec.description,
    //             });
    //         } else {
    //             // Ini adalah rekomendasi yang sudah ada (dengan ID), coba update
    //             // Temukan yang cocok di existingRecommendations
    //             const existingRec = existingRecommendations.find(e => e.id === newRec.id);
    //             if (existingRec) {
    //                 // Hanya update jika ada perubahan
    //                 if (existingRec.name !== newRec.name || existingRec.description !== newRec.description) {
    //                     prismaOperations.push(
    //                         db.serving_Recomendation.update({
    //                             where: { id: newRec.id },
    //                             data: {
    //                                 name: newRec.name,
    //                                 description: newRec.description,
    //                             },
    //                         })
    //                     );
    //                 }
    //             }
    //             // Jika ID ada tapi tidak ditemukan di existingRecommendations,
    //             // bisa berarti data tidak konsisten atau item ini harus dibuat
    //             // Untuk kesederhanaan, asumsikan ini skenario "buat baru" jika ID tidak match.
    //             // Namun, lebih aman jika hanya memperbarui yang cocok.
    //             // Jika Anda ingin membuat yang ada ID-nya tetapi tidak di DB, tambahkan ke recommendationsToCreate
    //         }
    //     }

    //     // Logic untuk menghapus rekomendasi yang tidak lagi ada di form
    //     for (const existingRec of existingRecommendations) {
    //         if (!newRecommendationIdsInForm.has(existingRec.id)) {
    //             recommendationIdsToDelete.push(existingRec.id);
    //         }
    //     }

    //     // Tambahkan operasi createMany
    //     if (recommendationsToCreate.length > 0) {
    //         prismaOperations.push(
    //             db.serving_Recomendation.createMany({
    //                 data: recommendationsToCreate.map(data => ({
    //                     ...data,
    //                     roasted_beans_product_id: roastedBeansProductId,
    //                 })),
    //             })
    //         );
    //     }

    //     // Tambahkan operasi deleteMany
    //     if (recommendationIdsToDelete.length > 0) {
    //         prismaOperations.push(
    //             db.serving_Recomendation.deleteMany({
    //                 where: { id: { in: recommendationIdsToDelete } },
    //             })
    //         );
    //     }

    //     await Promise.all(prismaOperations);

    //     return {
    //         success: true,
    //         message: "Rekomendasi penyajian berhasil diperbarui!",
    //     };

    // } catch (error: any) {
    //     console.error("Error updating serving recommendations:", error);
    //     return {
    //         success: false,
    //         message: error.message || "Gagal memperbarui rekomendasi penyajian.",
    //         errors: {
    //             general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
    //         }
    //     };
    // }
    // finally {
    //     throw redirect(301, "/cms/products/roasted-coffee-beans");
    // }
}

export async function getServingRecommendations({
    event
}: {
    event: RequestEventLoader<QwikCityPlatform>;
}) {
    const { platform, params } = event;
    const id = parseInt(params.id);

    const db = await getDB(platform.env);

    try {
        const servingRecomendations = await db.serving_Recomendation.findMany({
            where: {
                roasted_beans_product_id: id
            }
        });

        return {
            data: servingRecomendations,
            success: true,
            message: "Success retrieve serving recommendation",
        };
    } catch (error) {
        return {
            data: [],
            success: false,
            message: "Error executing serving recommendation",
        };
    }
}

export async function updateServingRecommendations({
    values,
    event,
}: {
    values: EditForm;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform, params } = event;
    const id = parseInt(params.id);

    const db = await getDB(platform.env);

    try {
        const existingRecommendations = await db.serving_Recomendation.findMany({
            where: { roasted_beans_product_id: id },
            select: {
                id: true,
                name: true,
                description: true
            },
        });

        console.info(existingRecommendations);
        console.info(values.roasted_beans_data.serving_recomendation);

        // if (typeof values.roasted_beans_data.serving_recomendation === "undefined") {
        //     return;
        // }

        // const newRecommendationIdsInForm = new Set(
        //     values.roasted_beans_data.serving_recomendation.filter(
        //         rec => rec.id !== undefined
        //     ).map(rec => rec.id!)
        // );

        // const recommendationsToCreate: Omit<ServingRecommendationFormData, 'id'>[] = [];
        // const recommendationIdsToDelete: number[] = [];

        // for (
        //     const newRec of values.roasted_beans_data.serving_recomendation
        // ) {
        //     if (newRec.id === undefined || !existingRecommendations.some(e => e.id === newRec.id)) {
        //         recommendationsToCreate.push({
        //             name: newRec.name,
        //             description: newRec.description,
        //         });
        //     }
        // }

        // for (const existingRec of existingRecommendations) {
        //     if (!newRecommendationIdsInForm.has(existingRec.id)) {
        //         recommendationIdsToDelete.push(existingRec.id);
        //     }
        // }

        // console.info("recommendationsToCreate: ", recommendationsToCreate);
        // console.info("recommendationIdsToDelete: ", recommendationIdsToDelete);

        // const prismaOperations: Promise<any>[] = [];

        // if (recommendationsToCreate.length > 0) {
        //     prismaOperations.push(
        //         db.serving_Recomendation.createMany({
        //             data: recommendationsToCreate.map(data => ({
        //                 ...data,
        //                 roasted_beans_product_id: id,
        //             })),
        //         })
        //     );
        // }

        // if (recommendationIdsToDelete.length > 0) {
        //     prismaOperations.push(
        //         db.serving_Recomendation.deleteMany({
        //             where: { id: { in: recommendationIdsToDelete } },
        //         })
        //     );
        // }
        // await Promise.all(prismaOperations); // Jalankan semua operasi secara paralel

        // console.info("recommendationsToCreate: ", recommendationsToCreate);
        // console.info("recommendationIdsToDelete: ", recommendationIdsToDelete);

        return {
            success: true,
            message: "Rekomendasi penyajian berhasil diperbarui!",
        };
    } catch (error) {
        return {
            success: false,
            message: "Error executing serving recommendation",
        };
    }
}

export async function deleteServingRecommendations({
    values,
    event
}: {
    values: JSONObject;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform } = event;
    const id = values.id as number;
    
    try {
        const db = await getDB(platform.env);

        await db.serving_Recomendation.delete({
            where: { id: id }
        });

        return {
            data: null,
            success: true,
            message: "Success deleting serving recommendation",
        };
        
    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Failed deleting serving recommendation",
        };
    }
}