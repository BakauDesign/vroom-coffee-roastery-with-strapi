import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import Background from "~/assets/Icons/frown.svg";

export default component$(() => {
    return (
        <>
            <div class="h-screen w-screen px-4 sm:px-12 lg:px-16 flex items-center justify-center *:flex *:flex-col *:md:flex-row *:gap-y-6 *:lg:gap-x-12 *:items-start *:md:items-end relative">
                <div class="absolute flex flex-col gap-y-9">
                    
                    <article class="flex flex-col gap-y-4">
                        <Link class="font-lora font-medium text-h3-small text-primary-700 underline" href="/">
                            Kembali ke Halaman Utama
                        </Link>

                        <h1 class="font-playfair-display text-display-small sm:text-display-large font-medium text-primary-800">
                            Waduh,<br />Sepertinya<br />Anda Tersesat!
                        </h1>
                    </article>

                    <section class="flex flex-col gap-y-6">
                        <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-900 max-w-[600px]">
                            Halaman yang Anda cari tidak ditemukan. Mungkin sudah dipindahkan—atau sedang istirahat seperti biji kopi sebelum di-roast.
                        </p>

                        <section class="flex flex-col gap-y-4 font-work-sans text-label-small sm:text-label-medium">
                            <h1 class="font-medium text-neutral-custom-800">Atau coba cari yang Anda butuhkan:</h1>

                            <ul class="flex flex-col gap-y-3 *:pt-1 *:text-label-small *:sm:text-label-medium *:text-neutral-custom-700 *:underline">
                                <li>
                                    <Link href="/products/roasted-coffee-beans">Biji Kopi Matang</Link>
                                </li>

                                <li>
                                    <Link href="/products/green-coffee-beans">Biji Kopi Mentah</Link>
                                </li>

                                <li>
                                    <Link href="/about-us">Tentang Kami</Link>
                                </li>
                            </ul>
                        </section>
                    </section>

                </div>
                <img src={Background} alt="Background Coming Soon.png" class="h-[271px] w-[271px] object-cover" width={271} height={271} />
            </div>
        </>
    );
});