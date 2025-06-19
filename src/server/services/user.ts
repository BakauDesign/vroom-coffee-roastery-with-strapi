import bcrypt, { hash } from "bcryptjs";

import { getDB } from '~/lib/db';

import { Users } from "~/interfaces";
import { getTokenUserId } from "~/lib/cookie";
import { Cookie } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

export type ErrorAuthentication = {
	message: string;
}

interface CreateUser {
	user: Omit<Users, "id" | "created_at">;
	env: { DB: D1Database };
	request: Request;
	cookie: Cookie;
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