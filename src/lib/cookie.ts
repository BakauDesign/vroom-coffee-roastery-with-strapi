import { Cookie } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { Users } from "~/interfaces";
import { getFingerprint } from "./auth";

type JwtPayloadToken = {
    id: number;
    username: string;
    fingerprint: string;
    exp: number;
    iat?: number;
};

type JwtPayloadUser = JwtPayloadToken & {
    name: string;
    avatar: string;
    role: string;
};

interface Token {
    user: Omit<Users, "password"> | null;
    request: Request;
    cookie: Cookie;
    platform: PlatformCloudflarePages;
}

interface PublicUserInfo extends Omit<Token, "user"> {
    user: {
        name: string;
        avatar: string;
        role: string;
    } | null;
}

export async function verifyToken({
    request,
    cookie,
    platform
}: Omit<Token, "user">) {
    const currentFingerprint = await getFingerprint(request);

    const token = cookie.get("vroom-coffee-roastery");

    if (!token?.value) {
        return null;
    }

    const decoded = jwt.decode(token.value).payload as JwtPayloadToken;

    if (decoded.fingerprint !== currentFingerprint) {
        return null;
    }

    try {
        const user = await jwt.verify(
            token.value,
            platform?.env?.JWT_SECRET as string
        );

        if (user) {
            return true;
        }
        
    } catch (e) {}
}

export async function getToken({ request, cookie }: Omit<Token, "user" | "platform">) {
    const currentFingerprint = await getFingerprint(request);

    const token = cookie.get("vroom-coffee-roastery");

    if (!token?.value) {
        return null;
    }

    const decoded = jwt.decode(token.value).payload as JwtPayloadToken;

    if (decoded.fingerprint !== currentFingerprint) {
        return null;
    }
    return token.value;
}

export async function getTokenUserId({ request, cookie }: Omit<Token, "user" | "platform">) {
    const currentFingerprint = await getFingerprint(request);

    const token = cookie.get("vroom-coffee-roastery");

    if (!token?.value) {
        return null;
    }

    const decoded = jwt.decode(token.value).payload as JwtPayloadToken;

    if (decoded.fingerprint !== currentFingerprint) {
        return null;
    }
    return decoded.id;
}

export async function getUser({ request, cookie }: Omit<Token, "user" | "platform">) {
    const currentFingerprint = await getFingerprint(request);

    const userInfo = cookie.get("vroom-coffee-roastery-user-info");

    if (!userInfo?.value) {
        return null;
    }

    const decoded = jwt.decode(userInfo.value).payload as JwtPayloadUser;

    if (decoded.fingerprint !== currentFingerprint) {
        return null;
    }

    const { name, role, avatar } = decoded;
    return { name, role, avatar };
}

export async function createToken({
    user, request, cookie, platform
}: Token) {
    const fingerprint = await getFingerprint(request);

    try {
        const token = await jwt.sign(
            {
                id: user?.id,
                username: user?.username,
                fingerprint: fingerprint,
                exp:  Math.floor(Date.now() / 1000) + (24 * (60 * 60))
            },
            platform?.env?.JWT_SECRET as string
        );

        cookie.set("vroom-coffee-roastery", token, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: [7, 'days'],
            sameSite: 'lax',
        });
    } catch (e) {}
}

export async function createUser({
    user, request, cookie, platform
}: PublicUserInfo) {
    const fingerprint = await getFingerprint(request);

    try {
        const userInfo = await jwt.sign(
            {
                name: user?.name,
                avatar: user?.avatar,
                role: user?.role,
                fingerprint: fingerprint,
                exp:  Math.floor(Date.now() / 1000) + (24 * (60 * 60))
            },
            platform?.env?.JWT_SECRET as string
        );

        cookie.set("vroom-coffee-roastery-user-info", userInfo, {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: [8, 'days'],
            sameSite: 'lax',
        });
    } catch (e) {}
}

export async function deleteToken({
    cookie,
}: {
    cookie: Cookie;
}) {
    try {
        cookie.set("vroom-coffee-roastery", '', {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 0,
            sameSite: 'lax',
        });
        cookie.set('vroom-coffee-roastery-user-info', '', {
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 0,
            sameSite: 'lax',
        });
    } catch (e) {}
}