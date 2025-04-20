import { component$ } from '@builder.io/qwik';

import Separator400 from "~/assets/Separator 400.png";
import Separator1000 from "~/assets/Separator 1000.png";

export const Separator = component$(() => {
    return (
        <>
            <div class="w-full flex overflow-hidden *:w-full *:h-[3px]">
                <picture>
                    <source srcset={Separator1000} media="(min-width: 1024px)" type='image/png' />
                    <img src={Separator400} alt="Separator 400" />
                </picture>
            </div>
        </>
    );
});