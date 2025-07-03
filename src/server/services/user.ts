import * as v from 'valibot';

import { hash } from "bcryptjs";

import { getDB } from '~/lib/db';
import {
    deleteFileFromBucket,
    uploadFileToBucket
} from '~/lib/r2';

import { Users } from "~/interfaces";

import { getTokenUserId } from "~/lib/cookie";

import { Cookie, RequestEventAction } from "@builder.io/qwik-city";

import {
    UserForm,
    UserAvatarSchema,
} from "~/schema/user";
export type ErrorAuthentication = {
	message: string;
}

interface Params {
    env: { DB: D1Database; BUCKET: R2Bucket; };
	request: Request;
	cookie: Cookie;
}

interface GetUser extends Omit<Params,
        "request" |
        "cookie"
    > {
	id: number;
}

interface ActionParam<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

interface DeleteUser extends Params {
	user: Omit<Users,
        "name" |
        "username" |
        "role" |
        "password" |
        "created_at"
    >;
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
    values,
    event
}: ActionParam<UserForm>) {
    const { request, cookie, platform } = event;
    const verifiedRole = await verifyRole(request, cookie, platform.env);

    if (verifiedRole?.verified) {
        const { name, username, role, password, avatarFile } = values;
    
        try {
            const db = await getDB(platform.env);

            const hashPassword = await hash(password, 12);

            const validAvatar = v.safeParse(UserAvatarSchema, values.avatarFile);

            if (!validAvatar.success) {
                return {
                    errors: { avatar: validAvatar.issues[0].message }
                }
            }
                
            const avatarUploaded = await uploadFileToBucket(avatarFile, platform.env.BUCKET);

            await db.user.create({
                            data: {
                                name,
                                username,
                                avatar: avatarUploaded.path,
                                role,
                                password: hashPassword
                            },
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
    return {
        success: true,
        message: verifiedRole?.message
    }
}

export async function updateUser({
    values,
    event
}: ActionParam<UserForm>) {
    const { request, cookie, platform, params } = event;
    const verifiedRole = await verifyRole(request, cookie, platform.env);

    if (verifiedRole?.verified) {
        const id = parseInt(params.id);
        const { name, username, avatar, role, password, avatarFile } = values;
    
        try {
            const { success: avatarChanged } = v.safeParse(UserAvatarSchema, avatarFile);

            const db = await getDB(platform.env);

            const hashPassword = await hash(password, 12);

            if (avatarChanged) {
                await deleteFileFromBucket(avatar, platform.env.BUCKET);
                
                const avatarUploaded = await uploadFileToBucket(avatarFile, platform.env.BUCKET);

                await db.user.update({
                                data: {
                                    name,
                                    username,
                                    avatar: avatarUploaded.path,
                                    role,
                                    password: hashPassword
                                },
                                where: {
                                    id: id
                                }
                            });
            } else {
                await db.user.update({
                                data: {
                                    name,
                                    username,
                                    role,
                                    password: hashPassword
                                },
                                where: {
                                    id: id
                                }
                            });
            }

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

export async function deleteUser({
    user,
    env,
    request,
    cookie
}: DeleteUser) {
    const verifiedRole = await verifyRole(request, cookie, env);

    if (verifiedRole?.verified) {
        try {
            const db = await getDB(env);

            await db.user.delete({
                where: { id: user.id }
            });

            await env.BUCKET.delete(user.avatar)
        } catch (error) {
            return {
                message: "Error in server"
            }
        }
    }
}

export async function verifyRole(request: Request, cookie: Cookie, env: { DB: D1Database }) {
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
            return {
                verified: true,
                message: "You have authorized for this action"
            };
        }
    } catch (err) {
        return {
            message: "Error in server" 
        };
    }
}