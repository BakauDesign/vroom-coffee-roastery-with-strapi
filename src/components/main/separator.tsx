import { component$ } from '@builder.io/qwik';

import Separator400 from "~/assets/Separator 400.png";
import Separator1000 from "~/assets/Separator 1000.png";

export const Separator = component$(() => {
    return (
        <>
            <div class="flex overflow-hidden *:w-full *:h-[3px]">
                <img src={Separator400} alt="Separator 400" class="sm:hidden" />
                <img src={Separator1000} alt="Separator 1000" class="hidden sm:block" />
            </div>
        </>
    );
});