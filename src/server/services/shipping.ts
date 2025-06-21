import { getDB } from '~/lib/db';

import { Cookie } from "@builder.io/qwik-city";
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