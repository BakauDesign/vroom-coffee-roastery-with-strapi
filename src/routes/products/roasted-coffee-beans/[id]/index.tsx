import {
    component$,
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import InfoIcon from "~/assets/Icons/Info.png"
import { Button } from "~/components/main/button";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { getProductById } from "~/server/services/products";
import { formatRupiah, isLocalhost } from "~/lib/utils";

// import Keberlanjutan from "~/assets/Icons/Keberlanjutan.png";
// import Transparansi from "~/assets/Icons/Transparansi.png";
// import Inovasi from "~/assets/Icons/Inovasi.png";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

export const useProductDetail = routeLoader$(
    async (event) => {
        const { params, redirect } = event;

        const productId = parseInt(params.id);

        const result = await getProductById({
            productId,
            event,
            options: "Roasted Coffee Beans"
        });

        if (!result?.data) {
            throw redirect(302, "/products/roasted-coffee-beans");
        }

        return result.data;
    }
)

export default component$(() => {
    const { value: product } = useProductDetail();
    const loc = useLocation();

    return (
        <>
            <figure class="hero-product grid-cols-2">
                <figcaption class="content">
                    <section class="detail">
                        <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                            <h1>
                                { product.name }
                            </h1>

                            <p>
                                { product.description.slice(0, 107) }
                            </p>
                        </article>

                        <article class="price-stock">
                            <section class="price-weight-wrapper">
                                { product.discount && product.discount_price ? (
                                    <section class="price-discount">
                                        <h1>
                                            {formatRupiah(product.discount_price)}
                                        </h1>

                                        <p>
                                            {product.discount}%
                                        </p>
                                    </section>
                                ) : null}
                                
                                <h1 class="price-weight">
                                    {formatRupiah(product.price)}/{product.weight}gr
                                </h1>
                            </section>

                            <section class="stock">
                                <p>
                                    SISA {product.stock} PCS
                                </p>
                            </section>
                        </article>

                    </section>

                    <section class="actions">
                        <Button
                            variant="primary"
                            size="large"
                        >
                            Beli Sekarang
                        </Button>

                        <Button
                            variant="secondary"
                            size="large"
                        >
                            Beli di Tokopedia
                        </Button>
                    </section>
                </figcaption>

                <section class="product-image max-h-[500px]">
                    <div class="hidden lg:block" />
                    <img 
                        src={`${isLocalhost(loc.url) ? `http://127.0.0.1:8788/media/${product.photo}` : `https://vroom-coffee-roastery.pages.dev/media/${product.photo}`}`}
                        alt="Product image"
                        height={500}
                        width={500}
                    />

                    {product.highlight ? (
                        <article class="higlight">
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                                height={100}
                                width={100}
                            />
                            <p>
                                { product.highlight }
                            </p>
                        </article>
                    ) : (
                        null
                    )}
                    
                </section>
            </figure>

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <section class="general-section gap-y-[60px] items-center">
                    <label class="flex items-center gap-x-4">
                        <h1 class="font-lora font-medium text-neutral-custom-950 text-h2-small sm:text-h2-medium lg:text-h2-large">
                            Detail&nbsp;Informasi
                        </h1>

                        <div class="bg-primary-100 h-[1.5px] w-full" />
                    </label>

                    <article class="flex flex-col gap-y-4">
                        <h1 class="font-lora font-medium text-h3-small text-neutral-custom-950">
                            Deskripsi Produk
                        </h1>

                        <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-600 max-w-[800px]">
                            { product.description }
                        </p>
                    </article>
                    
                    <div class="bg-neutral-custom-200 h-[1.5px] w-full" />

                    <section class={`
                        grid gap-8 grid-cols-3
                        *:*:first:font-lora  *:*:first:text-h3-small *:*:first:font-medium *:*:first:text-neutral-custom-950
                        *:*:font-work-sans  *:*:text-label-small *:*:sm:text-label-medium *:*:text-neutral-custom-600 *:*:*:first:min-w-[100px] *:*:*:first:sm:min-w-[100px]
                        *:flex *:flex-col *:gap-4 *:*:flex *:*:gap-4
                    `}>
                        <ul>
                            <li>🌿 Karakteristik Biji</li>
                            
                            <li>
                                <p>Asal</p>
                                <p>:</p>
                                <p>{ product.roasted_beans?.origin }</p>
                            </li>

                            <li>
                                <p>Proses</p>
                                <p>:</p>
                                <p>{ product.roasted_beans?.process }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>👃 Test Notes</li>
                            
                            <li>
                                <p>{ product.roasted_beans?.test_notes || "Tidak ada test notes" }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>⚡ Rekomendasi Penyajian</li>
                            
                            {product.roasted_beans?.serving_recommendation.map((serving) => {
                                return (
                                    <li key={serving.id}>
                                        <p>{serving.name}</p>
                                        <p>:</p>
                                        <p>{serving.description}</p>
                                    </li>
                                );
                            })}
                        </ul>

                        <ul>
                            <li>📦 Packaging</li>
                            
                            <li>
                                <p>Kemasan</p>
                                <p>:</p>
                                <p>{product.weight}gr + {product.roasted_beans?.packaging}</p>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-primary-100 h-[1.5px] w-full" />
                </section>
            </div>

            <Separator />
        </>
    );
});