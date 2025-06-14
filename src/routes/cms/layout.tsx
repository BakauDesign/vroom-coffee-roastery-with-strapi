import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { createUser, deleteToken, getTokenUserId, getUser, verifyToken } from "~/lib/cookie";

import { routeAction$ } from '@builder.io/qwik-city';
import { Sidebar } from "~/components/cms/sidebar";
import { getDB } from "~/lib/db";
import type { Users } from "~/interfaces";

export const useAuthenticateUser = routeLoader$(
    async (event) => {
        const { request, cookie, platform, redirect, pathname } = event;

        const isUser = await verifyToken({ request, cookie, platform });

        if (isUser && pathname.replace(/\/+$/, '') === "/cms/login") {
            throw redirect(302, "/cms/dashboard");
        }

        if (!isUser && pathname.replace(/\/+$/, '') !== "/cms/login") {
            throw redirect(302, "/cms/login");
        }
    }
);

export const useUserLoader = routeLoader$(
    async ({ request, cookie, platform }) => {
        const userInfo = await getUser({ request, cookie });
        const tokenUserId = await getTokenUserId({ request, cookie });

        if (!userInfo && tokenUserId) {
            const db = await getDB(platform.env);
            const user: Omit<Users, "id" | "username" | "password"> | null = await db.user
                .findUnique({ 
                    where: {
                        id: tokenUserId
                    },
                    select: {
                        name: true,
                        role: true,
                        avatar: true
                    }
            });
            await createUser({ user, request, cookie, platform })

            return user;
        }

        return userInfo;
    }
);

export const useLogoutAction = routeAction$((_, { cookie }) => {
    deleteToken({ cookie });
});

export default component$(() => {
    const loc = useLocation();
    const user = useUserLoader();
    const logout = useLogoutAction();
    
    if (loc.url.pathname.startsWith('/cms/login')) {
        return (
            <main class="h-screen w-screen overflow-y-scroll p-4 sm:p-6 bg-primary-base flex flex-col items-center gap-y-20">
                <Slot />
            </main>
        );
    }

    return (
        <main class="h-screen w-screen overflow-y-scroll p-4 sm:p-6 bg-primary-base flex flex-col items-center gap-y-20">
            <section class="shrink-0 h-fit min-h-full w-full flex flex-col gap-6 lg:flex-row relative">
                <Sidebar
                    onClickLogout$={() => logout.submit()}
                    user={user.value}
                />
                
                <Slot />
            </section>
        </main>
    );
});
