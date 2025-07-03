import {
    $,
    component$,
    useSignal
} from '@builder.io/qwik';

import type { QRL } from '@builder.io/qwik';

import SquareTopDown from "~/assets/Icons/Square Top Down.svg";
import { Separator } from './separator';
import type { Users } from '~/interfaces';
import { isLocalhost } from '~/lib/utils';
import { useLocation } from '@builder.io/qwik-city';

export interface UserProfileProps {
    user: Omit<Users, "id" | "username" | "password"> | null;
    showDetail?: boolean;
    onClickLogout$: QRL<() => void>;
}

export const UserProfile = component$<UserProfileProps>((
    { onClickLogout$, showDetail, user }) => {
    const isOpened = useSignal(false);
    const loc = useLocation();

    return (
        <section class="bg-neutral-custom-base pt-4 pb-6 flex items-center justify-between gap-4 z-20">
            <img 
                src={`${isLocalhost(loc.url) ? `http://127.0.0.1:8788/media/${user?.avatar}` : `https://vroom-coffee-roastery.pages.dev/media/${user?.avatar}`}`} 
                alt={`${user?.name} avatar`}
                class="min-h-[60px] min-w-[60px] aspect-square object-cover overflow-hidden rounded-[4px]"
                height={60}
                width={60}
            />

            <article class={`
                    w-full flex flex-col gap-y-1 font-inter text-cms-label-small sm:text-cms-label-medium
                    ${showDetail ? "block" : "hidden"}
                `}>
                <h1 class="text-neutral-custom-700 font-medium">{ user?.name }</h1>
                <h2 class="text-neutral-custom-500">{ user?.role }</h2>
            </article>

            <img
                src={SquareTopDown} 
                alt="SquareTopDown Icon"
                class={`cursor-pointer ${showDetail ? "block" : "hidden"}`}
                onClick$={$(() => isOpened.value = !isOpened.value)}
                height={24}
                width={24}
            />

            <div 
                class={`z-10 top-0 left-0 right-0 bottom-0 ${isOpened.value ? "absolute" : "static"} absolute shrink-0 ${showDetail ? "block" : "hidden"}`}
                onClick$={$(() => isOpened.value = false)}
            >
                <div class={`
                        flex flex-col text-neutral-custom-700 bg-neutral-custom-base border-[1.5px] rounded-[4px]
                        absolute right-6 bottom-6 ${isOpened.value ? "h-[100px] border-neutral-custom-100" : "h-0 border-neutral-custom-base"} overflow-hidden
                    `}>
                    <p class="font-medium select-none p-4">Akun</p>

                    <Separator />

                    <ul
                        class={`
                            p-4 flex flex-col gap-y-4 *:cursor-pointer
                            
                        `}
                    >
                        <li onClick$={() => onClickLogout$()}>Logout</li>
                    </ul>
                </div>
            </div>
        </section>
    );
});