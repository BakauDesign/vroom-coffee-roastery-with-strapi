import bcrypt from "bcryptjs";

import { getDB } from './db';

import { Users } from "~/interfaces";

export type ErrorAuthentication = {
	message: string;
}

export async function login(username: string, password: string, env: { DB: D1Database }): Promise<Omit<Users, "password"> | ErrorAuthentication> {
	try {
		const db = await getDB(env);
		const userExist = await db.user.findUnique({
                                            where: {
                                                username: username
                                            }
                                        });

		if (!userExist) {
			return {
				message: "Invalid username or password" 
			};
		}

		const passwordMatch = await bcrypt.compare(password, userExist.password);

		if (passwordMatch) {
			return userExist;
		}
		
	} catch (e) {
		return {
			message: "Error in server" 
		};
	}
	
	return {
		message: "Invalid username or password" 
	};
}

export async function getFingerprint(request: Request) {
	const ip = request.headers.get('x-forwarded-for') || request.headers.get('cf-connecting-ip') || 'unknown';
    const ua = request.headers.get('user-agent') || '';

    return `${ip}${ua}`;
}