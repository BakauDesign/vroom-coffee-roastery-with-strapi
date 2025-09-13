import {
    component$,
    useVisibleTask$
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

// import InfoIcon from "~/assets/Icons/Info.png"
// import { Button } from "~/components/main/button";
import {
    Link
} from "@builder.io/qwik-city";

import Utensil from "~/assets/main/products/orders/Utensil.avif";

export default component$(() => {
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        localStorage.setItem('vroom-tool-cart', "[]");
    });

    return (
        <>
            <div class=" pt-[148px]" />

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <figure class="flex items-center justify-center">
                    <img
                        src={Utensil}
                        alt="Utensil"
                        height={300}
                        width={300}
                    />

                    <figcaption class="flex flex-col gap-y-6 max-w-[600px]">
                        <article class="flex flex-col gap-y-4">
                            <h1 class="font-lora text-primary-700 font-medium text-h2-small md:text-h2-medium lg:text-h2-large">
                                Terjadi Gangguan Sistem (#ERROR-500)
                            </h1>

                            <h2 class="font-work-sans text-neutral-800 text-body-small md:text-body-medium">
                                Pesanan Anda gagal diproses karena kesalahan teknis.
                            </h2>
                        </article>

                        <Link href="/" class="font-lora underline text-cms-h3-small text-primary-700">
                            Kembali Ke Halaman Utama
                        </Link>
                    </figcaption>
                </figure>
            </div>

            <Separator />
        </>
    );
});