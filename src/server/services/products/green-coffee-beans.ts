import { GreenBeansProductForm } from "~/schema/product";
import {
    createBaseProduct,
    updateBaseProduct
} from "../products";
import { getDB } from "~/lib/db";
import type { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";

interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

export async function getGreenBeansProductById({
    event
}: LoaderParams) {
    const { platform, params } = event;
    const productId = parseInt(params.id);
    
    const db = await getDB(platform.env);

    try {
        const product = await db.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                green_beans: true
            },
        });

        if (!product) {
            return {
                success: true,
                data: null,
            };
        }

        return {
            success: true,
            data: product,
        };
    } catch (error: any) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return {
            success: false,
            message: error.message || "Gagal mengambil detail produk."
        };
    }
}

export async function createGreenBeansProduct({
    values,
    event,
}: ActionParams<GreenBeansProductForm>) {
    const { platform, redirect } = event;

    const db = await getDB(platform.env);

    try {
        const newProduct = await createBaseProduct({ values, event });

        if (!newProduct) {
            return;
        }

        const greenBeansData = {
            elevation: values.green_beans_data.elevation,
            variety: values.green_beans_data.variety,
            origin: values.green_beans_data.origin,
            process: values.green_beans_data.process,
            moisure_content: values.green_beans_data.moisture_content,
            density: values.green_beans_data.density,
            defect: values.green_beans_data.defect,
            screen_size: values.green_beans_data.screen_size,

            roast_level: values.green_beans_data.roast_level,
            flavor_description:	values.green_beans_data.flavor_description,

            water_activity: values.green_beans_data.water_activity,
            quakers: values.green_beans_data.quakers,
            cupping_potential: values.green_beans_data.cupping_potential,
            product_id: newProduct.id
        };


        await db.green_Beans_Product.create({
            data: greenBeansData
        });

        return {
            success: true,
            message: "Green Beans Product berhasil ditambahkan!"
        };

    } catch (error: any) {
        console.error("Error creating Green Beans Product:", error);
        return {
            success: false,
            message: error.message || "Gagal menambahkan Green Beans Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
    finally {
        throw redirect(301, "/cms/products/green-coffee-beans");
    }
}

export async function updateGreenBeansProduct({
    values,
    event,
}: ActionParams<GreenBeansProductForm>) {
    const { platform } = event;

    const db = await getDB(platform.env);

    try {
        const updatedProduct = await updateBaseProduct({ values, event });

        if (!updatedProduct) {
            return {
                success: false,
                message: "Gagal memperbarui produk dasar.",
                errors: { general: "Terjadi kesalahan saat memperbarui detail produk dasar." }
            };
        }

        const greenBeansData = {
            elevation: values.green_beans_data.elevation,
            variety: values.green_beans_data.variety,
            origin: values.green_beans_data.origin,
            process: values.green_beans_data.process,
            moisure_content: values.green_beans_data.moisture_content,
            density: values.green_beans_data.density,
            defect: values.green_beans_data.defect,
            screen_size: values.green_beans_data.screen_size,

            roast_level: values.green_beans_data.roast_level,
            flavor_description:	values.green_beans_data.flavor_description,

            water_activity: values.green_beans_data.water_activity,
            quakers: values.green_beans_data.quakers,
            cupping_potential: values.green_beans_data.cupping_potential
        }

        await db.green_Beans_Product.update({
            where: { product_id: updatedProduct.id },
            data: greenBeansData,
        });

        return {
            success: true,
            message: "Green Beans Product berhasil diperbarui!"
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
            message: error.message || "Gagal memperbarui Green Beans Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    } 
    finally {
        throw event.redirect(301, "/cms/products/green-coffee-beans");
    }
}