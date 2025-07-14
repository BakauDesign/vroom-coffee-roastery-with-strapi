import { ToolsProductForm } from "~/schema/product";
import {
    createBaseProduct,
    extractType,
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

export async function getToolsProduct({
    event
}: LoaderParams) {
    const { platform, url } = event;

    const productType = extractType(url.pathname);

    const keyword = url.searchParams.get("search");
    // const type = url.searchParams.get("type");
    const material = url.searchParams.get("material");
    const compatibility = url.searchParams.get("compatibility");

    try {
        const db = await getDB(platform.env);
        
        if (
            keyword ||
            // type ||
            material ||
            compatibility
        ) {
            const products = await db.product.findMany({
                where: {
                    name: { contains: keyword || "" },
                    type: { contains: productType },
                    is_active: true,
                    tools: {
                        material: { contains: material || "" },
                        compatibility: { contains: compatibility || "" }
                    }
                }
            })

            return {
                data: products,
                success: true,
                message: "Success retrieved product tools" 
            };
        }
        const products = await db.product.findMany({
            where: {
                type: { contains: productType }
            }
        });

        return {
            data: products,
            success: true,
            message: "Success retrieved user" 
        };

    } catch (error) {
        return {
            data: [],
            success: false,
            message: "Error in server" 
        };   
    }
}

export async function getToolsProductById({
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
                tools: true
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

export async function createToolsProduct({
    values,
    event,
}: ActionParams<ToolsProductForm>) {
    const { platform, redirect } = event;

    const db = await getDB(platform.env);

    try {
        const newProduct = await createBaseProduct({ values, event });

        if (!newProduct) {
            return;
        }

        const toolsData = {
            material: values.tools_data.material,
            capacity: values.tools_data.capacity,
            dimensions: values.tools_data.dimensions,
            compatibility: values.tools_data.compatibility,
            settings: values.tools_data.settings,
            accessories: values.tools_data.accessories,
            packaging: values.tools_data.packaging,
            product_id: newProduct.id
        };

        const newToolsProduct = await db.tools_Product.create({ data: toolsData });

        const mainFeatureData = values.tools_data.main_feature.map(sr => ({
            emoji: sr.emoji,
            name: sr.name,
            description: sr.description,
            tools_product_id: newToolsProduct.id,
        }));

        if (mainFeatureData.length > 0) {
            await db.main_Feature.createMany({ data: mainFeatureData });
        }

        return {
            success: true,
            message: "Tools Product berhasil ditambahkan!"
        };

    } catch (error: any) {
        console.error("Error creating Tools Product:", error);
        return {
            success: false,
            message: error.message || "Gagal menambahkan Roasted Beans Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
    finally {
        throw redirect(301, "/cms/products/coffee-tools");
    }
}

export async function updateToolsProduct({
    values,
    event,
}: ActionParams<ToolsProductForm>) {
    const { platform, params, redirect } = event;
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

        const toolsData = {
            material: values.tools_data.material,
            capacity: values.tools_data.capacity,
            dimensions: values.tools_data.dimensions,
            compatibility: values.tools_data.compatibility,
            settings: values.tools_data.settings,
            accessories: values.tools_data.accessories,
            packaging: values.tools_data.packaging,
            product_id: updatedProduct.id
        };

        await db.tools_Product.update({
            where: { product_id: updatedProduct.id },
            data: toolsData,
        });

        const mainFeatureData = values.tools_data.main_feature.map(sr => ({
            emoji: sr.emoji,
            name: sr.name,
            description: sr.description,
            tools_product_id: id,
        }));

        if (mainFeatureData.length > 0) {
            await db.main_Feature.createMany({ data: mainFeatureData });
        }

        return {
            success: true,
            message: "Tools Product berhasil diperbarui!"
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
            message: error.message || "Gagal memperbarui Tools Product.",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
    finally {
        throw redirect(301, "/cms/products/coffee-tools");
    }
}

export async function getMainFeature({
    event
}: LoaderParams) {
    const { platform, params } = event;
    const id = parseInt(params.id);

    const db = await getDB(platform.env);

    try {
        const mainFeatures = await db.main_Feature.findMany({
            where: {
                tools_product_id: id
            }
        });

        return {
            data: mainFeatures,
            success: true,
            message: "Success retrieve main feature",
        };
    } catch (error) {
        return {
            data: [],
            success: false,
            message: "Error executing main feature",
        };
    }
}

export async function deleteMainFeature({
    values,
    event
}: ActionParams<any>) {
    const { platform } = event;
    const id = values.id as number;
    
    try {
        const db = await getDB(platform.env);

        await db.main_Feature.delete({
            where: { id: id }
        });

        return {
            data: null,
            success: true,
            message: "Success deleting main feature",
        };
        
    } catch (error) {
        return {
            data: null,
            success: false,
            message: "Failed deleting main feature",
        };
    }
}