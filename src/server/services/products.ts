import * as v from 'valibot';

import { getDB } from '~/lib/db';

import { JSONObject, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import {
    ProductPhotoSchema,
    RoastedBeansProductForm,
    GreenBeansProductForm,
    ToolsProductForm
} from '~/schema/product';
import { deleteFileFromBucket, uploadFileToBucket } from '~/lib/r2';

// type roastedBeansProductSchema = v.InferInput<typeof RoastedBeansProductSchema>;
type AllProductForms = RoastedBeansProductForm | GreenBeansProductForm | ToolsProductForm;

// export type EditProductForms = AllProductForms & {
//     is_active: true;
//     roasted_beans_id: number;
// }

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

export interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

export async function getHighlightedProduct ({
    event
}: LoaderParams) {
    const { platform } = event;
    
    try {
        const db = await getDB(platform.env);
        
        const products = await db.product.findMany({
            where: {
                is_highlight: true,
                is_active: true
            }
        });

        return {
            data: products,
            success: true,
            message: "Success retrieved product" 
        };

    } catch (error) {
        return {
            data: [],
            success: false,
            message: "Error in product" 
        };   
    }
}

export async function getProducts({
    event
}: LoaderParams) {
    const { platform, url } = event;

    const productType = extractType(url.pathname);

    const keyword = url.searchParams.get("search");
    const brewingMethod = url.searchParams.get("brewingMethod");

    try {
        const db = await getDB(platform.env);
        
        if (keyword || brewingMethod) {
            const products = await db.product.findMany({
                where: {
                    name: { contains: keyword || "" },
                    roasted_beans: {
                        serving_recommendation: {
                            some: { 
                                name: { contains: brewingMethod || '' }
                            }
                        }
                    },
                    is_active: true,
                    type: { contains: productType }
                }
            })

            return {
                data: products,
                success: true,
                message: "Success retrieved user" 
            };
        }
        const products = await db.product.findMany({
            where: {
                type: { contains: productType }
            }
        })

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

export async function getProductById({
    productId,
    event,
    // options
}: { 
    productId: number, 
    event: RequestEventLoader<QwikCityPlatform>;
    options: "Roasted Coffee Beans" | "Green Coffee Beans" | "Coffee Tools";
}) {
    const { platform } = event;
    const db = await getDB(platform.env);

    try {
        const product = await db.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                roasted_beans: {
                    include: {
                        serving_recommendation: true
                    }
                },
                review: {
                    where: {
                        product_id: productId,
                        is_hidden: false
                    }
                }
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

export async function createBaseProduct({
    values,
    event
}: ActionParams<AllProductForms>) {
    const { platform, url } = event;
    // const validPhoto = v.safeParse(ProductPhotoSchema, values.photo);
    
    // if (!validPhoto.success) {
    //     return {
    //         errors: { photo: validPhoto.issues[0].message }
    //     }
    // }

    const productType = extractType(url.pathname);

    const originalDiscountPrice = values.discount ? values.price - (values.price * values.discount / 100) : undefined;

    const discount_price = originalDiscountPrice ? Math.round(originalDiscountPrice / 500) * 500 : undefined;

    try {
        const uploadedPhoto = await uploadFileToBucket(values.photoFile, platform.env.BUCKET);
    
        const db = await getDB(platform.env);

        const productData = {
            name: values.name,
            description: values.description,
            photo: uploadedPhoto.path,
            highlight: values.highlight,
            stock: values.stock,
            price: values.price,
            discount: values.discount,
            discount_price,
            weight: values.weight,
            type: productType,
            is_active: true,
            is_highlight: false
        };

        const product = await db.product.create({ data: productData });

        if (product) {
            return product;
        }
    } catch (error) {
        console.error("Error creating product");
    }
}

export async function updateBaseProduct({
    values,
    event
}: ActionParams<AllProductForms>) {
    const { platform, url} = event;

    const productId = parseInt(event.params.id);

    const productType = extractType(url.pathname);

    const originalDiscountPrice = values.discount ? values.price - (values.price * values.discount / 100) : undefined;

    const discount_price = originalDiscountPrice ? Math.round(originalDiscountPrice / 500) * 500 : undefined;
    
    const photoChanged = v.safeParse(ProductPhotoSchema, values.photoFile);
    
    try {
        const db = await getDB(platform.env);

        if (photoChanged.success) {
            await deleteFileFromBucket(values.photo, platform.env.BUCKET);
            const { path } = await uploadFileToBucket(values.photoFile, platform.env.BUCKET);

            const data: any = {
                name: values.name,
                description: values.description,
                photo: path,
                highlight: values.highlight || null,
                stock: values.stock,
                price: values.price,
                discount: values.discount || null,
                discount_price: discount_price || null,
                weight: values.weight,
                type: productType
            };

            Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

            const updatedProduct = await db.product.update({
                where: { id: productId },
                data: data,
            });    

            return updatedProduct;
        } else {
            const data: any = {
                name: values.name,
                description: values.description,
                photo: values.photo,
                highlight: values.highlight || null,
                stock: values.stock,
                price: values.price,
                discount: values.discount || null,
                discount_price: discount_price || null,
                weight: values.weight,
                type: productType
            };

            Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);

            const updatedProduct = await db.product.update({
                where: { id: productId },
                data: data,
            });    

            return updatedProduct;
        }
    } catch (error) {
       console.info("Error updating product")
    }
    
}

export async function updateProductStatus({
    values,
    event
}: ActionParams<JSONObject>) {
    const { platform } = event;

    const validProduct = v.safeParse(
        v.object({
            id: v.number(),
            is_active: v.boolean()
        }
    ), values);

    
    if (!validProduct.success) {
        return {
            success: false,
            message: "Status gagal diperbarui!!"
        };
    }
    
    try {
        const db = await getDB(platform.env);

        await db.product.update({
            where: { id: validProduct.output.id},
            data: {
                is_active: !validProduct.output.is_active
            }
        });
        
        return {
            success: true,
            message: "Status Product berhasil diperbarui!!"
        };
    } catch (error) {
        return {
            success: true,
            message: "Status Product gagal diperbarui!!"
        };
    }
}

export async function updateProductHighlight({
    values,
    event
}: {
    values: JSONObject;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform } = event;

    const validUser = v.safeParse(
        v.object({
            id: v.number(),
            is_highlight: v.nullable(v.boolean())
        }
    ), values);

    if (!validUser.success) {
        return {
            success: false,
            message: "Highlight gagal diperbarui!!"
        };
    }
    
    try {
        const db = await getDB(platform.env);

        await db.product.update({
            where: { id: validUser.output.id },
            data: {
                is_highlight: !validUser.output.is_highlight
            }
        });
        
        return {
            success: true,
            message: "Highlight Product berhasil diperbarui!!"
        };
    } catch (error) {
        return {
            success: false,
            message: "Highlight Product gagal diperbarui!!"
        };
    }
}

export async function deleteProduct({
    values,
    event
}: {
    values: JSONObject;
    event: RequestEventAction<QwikCityPlatform>;
}) {
    const { platform, redirect } = event;
    const id = parseInt(values.id as string);

    try {
        const db = await getDB(platform.env);

        const productToDelete = await db.product.findUnique({
            where: { id: id },
            select: {
                id: true,
                type: true,
                photo: true,
                roasted_beans: {
                    select: {
                        id: true,
                    }
                },
            },
        });

        if (!productToDelete) {
            return {
                success: false,
                message: "Produk tidak ditemukan."
            };
        }

        if (
            productToDelete.type === 'Roasted Coffee Beans' &&
            productToDelete.roasted_beans
        ) {
            await db.serving_Recomendation.deleteMany({
                    where: { roasted_beans_product_id: productToDelete.roasted_beans.id }
            });
        
            await db.roasted_Beans_Product.delete({
                where: { id: productToDelete.roasted_beans.id }
            });
        }

        await db.product.delete({
            where: { id: id }
        });

        if (productToDelete.photo) {
            await deleteFileFromBucket(productToDelete.photo, platform.env.BUCKET);
        }

        return {
            success: true,
            message: "Produk berhasil dihapus!"
        };
    } catch (error) {
        console.error("Error deleting product");
    }
    throw redirect(301, "/cms/products/roasted-coffee-beans");
}

export function extractType(pathname: string) {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const productTypeSlug = pathSegments[2] || pathSegments[1];

    const spacedType = productTypeSlug.replace(/-/g, ' ');

    const formattedType = spacedType.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedType;
}