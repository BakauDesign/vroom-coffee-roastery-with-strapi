import * as v from 'valibot';

import { getDB } from '~/lib/db';

import { Cookie, JSONObject, RequestEventAction } from "@builder.io/qwik-city";
import { Shipping } from '~/interfaces';

import {
    ShippingForm,
    ShippingLogoSchema
} from '~/schema/shipping';

import { deleteFileFromBucket, uploadFileToBucket } from '~/lib/r2';

export type ErrorAuthentication = {
	message: string;
}

export interface ActionParams<T extends ShippingForm> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

interface Params {
    env: { DB: D1Database; BUCKET: R2Bucket; };
	request: Request;
	cookie: Cookie;
}

interface GetShipping extends Omit<Params,
    "request" |
    "cookie"
> {}

interface GetShippingById extends Omit<Params,
    "request" |
    "cookie"
> {
    id: number;
}

interface CreateShipping extends Params {
    shipping: Omit<Shipping, "id">;
}

interface UpdateShippingStatus
    extends Omit<Params, "cookie"> 
        {
            shipping: Omit<Shipping,
                "name" |
                "logo" |
                "cost"
            >;
}

interface UpdateShipping extends Omit<Params, 
    "cookie" |
    "request"
>  
    {
            shipping: Shipping;
}

interface DeleteShipping {
    values: JSONObject;
    event: RequestEventAction<QwikCityPlatform>
}

export async function getShipping({ env }: GetShipping) {
    try {
        const db = await getDB(env);

        const shipping = await db.shipping.findMany();
            
        return {
            data: shipping,
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


export async function getShippingById({ env, id }: GetShippingById) {
    try {
        const db = await getDB(env);

        const shipping = await db.shipping.findUnique({
            where: { id: id }
        });
            
        return {
            shipping,
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

export async function createShipping({
    shipping,
    env
}: CreateShipping) {
    try {
        const db = await getDB(env);

        await db.shipping.create({
            data: shipping
        });

        return {
            success: true,
            message: "User has been created"
        }        
    } catch (error) {
        return {
            success: false,
            message: "Error in server" 
        };
    }
}

export async function updateShippingStatus({
    shipping,
    env
}: UpdateShippingStatus) {
    try {
        const db = await getDB(env);

        await db.shipping.update({
            data: {
                status: !shipping.status
            },
            where: {
                id: shipping.id
            }
        });

        return {
            success: true,
            message: "User has been updated"
        }   
    } catch (error) {
        return {
            success: false,
            message: "Error in server" 
        };
    }
}


export async function updateShipping({
    values,
    event
}: ActionParams<ShippingForm>) {
    const { platform, params } = event;
    const id = parseInt(params.id);

    const logoChanged = v.safeParse(ShippingLogoSchema, values.logoFile);

    try {
        const db = await getDB(platform.env);

        if (logoChanged.success) {
            await deleteFileFromBucket(values.logo, platform.env.BUCKET);

            const { path } = await uploadFileToBucket(values.logoFile, platform.env.BUCKET);

            await db.shipping.update({
                data: {
                    name: values.name,
                    cost: values.cost,
                    logo: path
                },
                where: { id }
            });
        } else {
            await db.shipping.update({
                data: {
                    name: values.name,
                    cost: values.cost
                },
                where: { id }
            });
        }

        return {
            success: true,
            message: "Shipping has been updated"
        }   
    } catch (error) {
        return {
            success: false,
            message: "Error in server" 
        };
    }
}

export async function deleteShipping({
    values,
    event
}: DeleteShipping) {
    const { platform } = event;

    const { output: shipping, success: validShipping } = v.safeParse(
        v.object({
            id: v.pipe(v.number()),
            logo: v.pipe(v.string()),
    }), values);

    if (validShipping) {
        try {
            const db = await getDB(platform.env);

            await db.shipping.delete({
                where: { id: shipping.id }
            });

            await platform.env.BUCKET.delete(shipping.logo);
        } catch (error) {
            return {
                message: "Error in server"
            }
        }
    }
}