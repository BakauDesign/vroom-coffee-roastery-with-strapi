import { hash } from "bcryptjs";

import { getDB } from '~/lib/db';

import { Users } from "~/interfaces";
import { getTokenUserId } from "~/lib/cookie";
import { Cookie } from "@builder.io/qwik-city";

export type ErrorAuthentication = {
	message: string;
}

interface Params {
    env: { DB: D1Database };
	request: Request;
	cookie: Cookie;
}

interface GetUser extends Omit<Params,
        "request" |
        "cookie"
    > {
	id: number;
}

interface CreateUser extends Params {
	user: Omit<Users, "id" | "created_at">;
}

interface UpdateUser extends Params {
	user: Omit<Users, "created_at">;
}

export async function getUserById({
    id,
    env
}: GetUser) {
    try {
        const db = await getDB(env);

        const user = await db.user.findUnique({
                                where: { id },
                            });
            
        return {
            user,
            success: true,
            message: "Success retrieved user" 
        };
    } catch (error) {
        return {
            user: null,
            success: false,
            message: "Error in server" 
        };
    }
}

export async function createUser({
    user,
    env,
    request,
    cookie
}: CreateUser) {
    const verifiedRole = await verifyRole(request, cookie, env);

    if (verifiedRole?.verified) {
        const { name, username, avatar, role, password } = user;
    
        try {
            const db = await getDB(env);

            const hashPassword = await hash(password, 12);

            await db.user.create({
                                data: {
                                    name,
                                    username,
                                    avatar,
                                    role,
                                    password: hashPassword
                                }
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
    return verifiedRole?.message;
}

export async function updateUser({
    user,
    env,
    request,
    cookie
}: UpdateUser) {
    const verifiedRole = await verifyRole(request, cookie, env);

    if (verifiedRole?.verified) {
        const { id, name, username, avatar, role, password } = user;
    
        try {
            const db = await getDB(env);

            const hashPassword = await hash(password, 12);

            await db.user.update({
                                data: {
                                    name,
                                    username,
                                    avatar,
                                    role,
                                    password: hashPassword
                                },
                                where: {
                                    id: id
                                }
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
    return verifiedRole?.message;
}

async function verifyRole(request: Request, cookie: Cookie, env: { DB: D1Database }) {
    const tokenUserId = await getTokenUserId({ request, cookie });
    const db = await getDB(env);

    try {
        if (tokenUserId) {
            const user: Omit<Users,"id" | "username" | "password" | "avatar" | "name"> | null =
                await db.user
                        .findUnique({ 
                            where: {
                                id: tokenUserId
                            },
                            select: {
                                role: true
                            }
                        });
                        
            if (!user || user.role !== "Super Admin") {
                return {
                    verified: false,
                    message: "You don't have access for this action" 
                };
            }
            return { verified: true };			
        }
    } catch (err) {
        return {
            message: "Error in server" 
        };
    }
}