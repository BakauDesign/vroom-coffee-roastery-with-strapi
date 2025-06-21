import * as v from 'valibot';

import { getDB } from '~/lib/db';

import { JSONObject, RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import { Products, RoastedBeansProduct } from '~/interfaces';


interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

// interface ActionParams {
//     values: JSONObject;
//     event: RequestEventAction<QwikCityPlatform>
// }

export async function getProducts({
    event
}: LoaderParams) {
    const { platform, url } = event;

    const productType = extractType(url.pathname);

    
    const keyword = url.searchParams.get("search");
    const brewingMethod = url.searchParams.get("brewingMethod");

    try {
        const db = await getDB(platform.env);

        console.info(brewingMethod)
        
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

function extractType(pathname: string) {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const productTypeSlug = pathSegments[2];

    const spacedType = productTypeSlug.replace(/-/g, ' ');

    const formattedType = spacedType.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedType;
}