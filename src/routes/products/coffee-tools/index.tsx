import {
    component$,
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

// import Keberlanjutan from "~/assets/Icons/Keberlanjutan.png";
// import Transparansi from "~/assets/Icons/Transparansi.png";
// import Inovasi from "~/assets/Icons/Inovasi.png";

import HeroImage_1 from "~/assets/main/products/coffee-tools/Hero image 1.avif";
import HeroImage_2 from "~/assets/main/products/coffee-tools/Hero image 2.avif";
import HeroImage_3 from "~/assets/main/products/coffee-tools/Hero image 3.avif";

import { routeLoader$ } from "@builder.io/qwik-city";
import { getToolsProducts } from "~/server/services/products";
import { Product } from "~/components/main/product";
import { Button } from "~/components/main/button";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

export const useProducts = routeLoader$(
    async ( event ) => {
        return await getToolsProducts({ event });
    }
)

export default component$(() => {
    const { value: products } = useProducts();

    return (
        <>
            <figure class="hero-section ">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                        <h1>
                            Brew Seperti Profesional<br />Dengan Tools yang Kami Kurasi
                        </h1>

                        <p>
                            Dari grinder hingga peralatan V60—semuanya untuk meningkatkan kenikmatan kopi Anda.
                        </p>
                    </article>
                </figcaption>

                <section class="hero-image grid-cols-2 lg:grid-cols-4 *:aspect-square">
                    <div class="hidden lg:block" />
                    <img src={HeroImage_1} alt="Hero image 1" height={500} width={500} />
                    <img src={HeroImage_2} alt="Hero image 2" height={500} width={500} />
                    <img src={HeroImage_3} alt="Hero image 3" height={500} width={500} />
                </section>
            </figure>

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <section class="general-section gap-y-[60px] items-center">
                    <figure class="flex flex-col gap-y-4 max-w-[400px] self-center">
                        <picture>
                            <img src="" alt="" />
                        </picture>

                        <figcaption class="flex flex-col gap-y-3">
                            <article class="flex flex-col gap-y-4">
                                <h1 class="font-lora font-medium text-neutral-custom-800 text-h3-medium sm:text-h3-large">
                                    Kami Juga Menyediakan Layanan Roasting Kustom
                                </h1>

                                <p class="font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium">
                                    Layanan roasting profesional untuk biji kopi mentah Anda. Kami menawarkan kontrol penuh atas profil roasting untuk menonjolkan karakteristik rasa terbaik dari biji kopi Anda. Cocok untuk kafe, bisnis kopi, atau penggemar rumahan yang ingin membuat signature roast mereka sendiri.
                                </p>
                            </article>
                        </figcaption>

                        <Button
                            variant="primary"
                            size="large"
                            onClick$={() => {
                                window.open('https://api.whatsapp.com/send/?phone=+62-812-9333-1050&text=Halo%2C%20Vroom%20Coffee%20Roastery.%20Saya%20tertarik%20dengan%20jasa%20roasting%20kustom.%0A%0AApakah%20saya%20bisa%20berkonsultasi%20tentang%20profil%20roasting%20yang%20cocok%20untuk%20biji%20kopi%20saya%3F%20Mohon%20info%20detail%20prosesnya.%0A%0ATerima%20kasih.')
                            }}
                        >
                            Pesan Roasting Sekarang!
                        </Button>
                    </figure>
                    <section class="grid gap-9 overflow-scroll grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {products.data ? products.data.map((product) => {
                            return (
                                <Product
                                    key={product.documentId}
                                    slug={product.slug}
                                    type="Coffee Tools"
                                    documentId={product.documentId}
                                    nama={product.informasi_produk.nama}
                                    deskripsi={product.informasi_produk.deskripsi}
                                    foto={product.informasi_produk.foto}
                                    harga={product.harga}
                                    diskon={product.diskon}
                                    harga_diskon={product.harga_diskon}
                                    berat={product.berat}
                                />
                            )
                        }) : null}
                    </section>
                </section>
            </div>

            <Separator />
        </>
    );
});