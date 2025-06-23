import * as v from 'valibot';

import { getDB } from '~/lib/db';

import { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import {
    // ProductPhotoSchema,
    // ProductSchema,
    RoastedBeansProductSchema
} from '~/schema/product';
// import { uploadFileToBucket } from '~/lib/r2';

type roastedBeansProductSchema = v.InferInput<typeof RoastedBeansProductSchema>;

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

interface ActionParams {
    values: roastedBeansProductSchema;
    photo: any;
    event: RequestEventAction<QwikCityPlatform>;
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

export async function createProduct({
    values,
    event,
    photo
}: ActionParams) {
    const { platform, url, redirect } = event;
    // const validPhoto = v.safeParse(ProductPhotoSchema, values.photo);
    
    // if (!validPhoto.success) {
    //     return {
    //         errors: { photo: validPhoto.issues[0].message }
    //     }
    // }

    const productType = extractType(url.pathname);

    const discount_price = values.discount ? values.price - (values.price * values.discount / 100) : undefined;

    try {
        // const uploadedPhoto = await uploadFileToBucket(values.photo, platform.env.BUCKET);
    
        const productData = {
            name: values.name,
            description: values.description,
            photo: photo,
            highlight: values.highlight,
            stock: values.stock,
            price: values.price,
            discount: values.discount,
            discount_price,
            weight: values.weight,
            type: productType
        };

        const roastedBeansData = {
            origin: values.roasted_beans_data.origin,
            process: values.roasted_beans_data.process,
            test_notes: values.roasted_beans_data.testNotes,
            packaging: values.roasted_beans_data.packaging,
        };

        // const servingRecommendationsData = values.roasted_beans_data.serving_recomendation.map(sr => ({
        //     name: sr.name,
        //     description: sr.description,
        // }));

        const db = await getDB(platform.env);

        // await db.$transaction(async (prisma) => {
        const newProduct = await db.product.create({
            data: productData,
        });

        const newRoastedBeansProduct = await db.roasted_Beans_Product.create({
            data: {
                ...roastedBeansData,
                product_id: newProduct.id
            }
        });

        const servingRecommendationsData = values.roasted_beans_data.serving_recomendation.map(sr => ({
            name: sr.name,
            description: sr.description,
            roasted_beans_product_id: newRoastedBeansProduct.id,
        }));

        if (servingRecommendationsData.length > 0) {
            await db.serving_Recomendation.createMany({
                data: servingRecommendationsData,
            });
        }
    } catch (error) {
        console.error("Error creating product");
    }
    throw redirect(301, "/cms/products/roasted-coffee-beans");
}

function extractType(pathname: string) {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const productTypeSlug = pathSegments[2];

    const spacedType = productTypeSlug.replace(/-/g, ' ');

    const formattedType = spacedType.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedType;
}