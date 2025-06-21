import * as v from 'valibot';

import { getDB } from '~/lib/db';

import { Cookie, JSONObject, RequestEventAction } from "@builder.io/qwik-city";
import { Shipping } from '~/interfaces';

export type ErrorAuthentication = {
	message: string;
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
    shipping,
    env
}: UpdateShipping) {
    try {
        const db = await getDB(env);

        await db.shipping.update({
            data: shipping,
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