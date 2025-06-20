import { getDB } from '~/lib/db';

import { Cookie } from "@builder.io/qwik-city";
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