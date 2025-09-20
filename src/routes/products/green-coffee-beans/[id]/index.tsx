import {
    component$,
    isDev
} from "@builder.io/qwik";

import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import InfoIcon from "~/assets/Icons/Info.png"
import { Button } from "~/components/main/button";
import { routeLoader$ } from "@builder.io/qwik-city";
import { formatDateTime } from "~/lib/utils";
import { getGreenBeansProductById } from "~/server/services/products";
import { Star } from "~/assets/Icons/Star";

export const useProductDetail = routeLoader$(
    async (event) => {
        const { redirect } = event;

        const result = await getGreenBeansProductById({
			is_active: true,
            event
        });

        if (result.data.length === 0) {
            throw redirect(302, "/products/green-coffee-beans");
        }

        return result.data;
    }
);

export default component$(() => {
    const product = useProductDetail();

    return (
        <>
            {/* <Form> */}
            <figure class="hero-product lg:grid-cols-2">
                <figcaption class="content">
                    <section class="detail">
                        <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                            <h1>
                                { product.value[0].informasi_produk.nama }
                            </h1>

                            <p>
                                { product.value[0].informasi_produk.deskripsi.slice(0, 107) }
                            </p>
                        </article>

                        <article class="price-stock">
                            {/* <section class="price-weight-wrapper">
                                { product.value.packagingVariants[0].discount_price ? (
                                    <section class="price-discount">
                                        <h1>
                                            {formatRupiah(product.value.packagingVariants[0].price)}
                                        </h1>

                                        <p>
                                            {product.value.packagingVariants[0].discount}%
                                        </p>
                                    </section>
                                ) : null}
                                
                                <h1 class="price-weight">
                                    { product.value.packagingVariants[0].discount_price ? (
                                        `${formatRupiah(product.value.packagingVariants[0].discount_price)}/${product.value.packagingVariants[0].weight}gr`
                                    ) : (
                                        `${formatRupiah(product.value.packagingVariants[0].price)}/${product.value.packagingVariants[0].weight}gr`
                                    )}
                                </h1>
                            </section>

                            <section class="stock">
                                <p>
                                    SISA {product.value.packagingVariants[0].stock} PCS
                                </p>
                            </section> */}
                        </article>

                    </section>

                    <section class="actions">
                        <Button
                            variant="primary"
                            size="large"
                            onClick$={() => {
                                window.open(`https://api.whatsapp.com/send/?phone=+62-812-9333-1050&text=Halo%2C%20nama%20saya%20[Nama%20Pembeli]%2C%20saya%20ingin%20memesan%20produk%20green%20coffee%20beans%20${product.value[0].informasi_produk.nama}.`)
                            }}
                        >
                            Beli Sekarang
                        </Button>
                    </section>
                </figcaption>

                <section class="product-image max-h-[500px]">
                    <div class="hidden lg:block" />
                    <img 
                        src={`${isDev ? `http://localhost:1337${product.value[0].informasi_produk.foto.url}` : `${product.value[0].informasi_produk.foto.url}`}`}
                        alt="Product image"
                        height={500}
                        width={500}
                    />

                    {product.value[0].informasi_produk.highlight ? (
                        <article class="higlight">
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                                height={100}
                                width={100}
                            />
                            <p>
                                { product.value[0].informasi_produk.highlight }
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
                            { product.value[0].informasi_produk.deskripsi }
                        </p>
                    </article>
                    
                    <div class="bg-neutral-custom-200 h-[1.5px] w-full" />

                    <section class={`
                        grid gap-8 grid-cols-3
                        *:*:first:font-lora  *:*:first:text-h3-small *:*:first:font-medium *:*:first:text-neutral-custom-950
                        *:*:font-work-sans  *:*:text-label-small *:*:sm:text-label-medium *:*:text-neutral-custom-600 *:*:*:first:min-w-[100px] *:*:*:first:sm:min-w-[150px]
                        *:flex *:flex-col *:gap-4 *:*:flex *:*:gap-4
                    `}>
                        <ul>
                            <li>🌿 Karakteristik Biji</li>
                            
                            <li>
                                <p>Asal</p>
                                <p>:</p>
                                <p>{ product.value[0].asal }</p>
                            </li>

                            <li>
                                <p>Ketinggian</p>
                                <p>:</p>
                                <p>{ product.value[0].ketinggian }</p>
                            </li>

                            <li>
                                <p>Varietas</p>
                                <p>:</p>
                                <p>{ product.value[0].varietas || '-' }</p>
                            </li>

                            <li>
                                <p>Proses</p>
                                <p>:</p>
                                <p>{ product.value[0].proses || '-' }</p>
                            </li>

                            <li>
                                <p>Density</p>
                                <p>:</p>
                                <p>{ product.value[0].densitas || '-' }</p>
                            </li>

                            <li>
                                <p>Defect</p>
                                <p>:</p>
                                <p>{ product.value[0].cacat || '-' }</p>
                            </li>

                            <li>
                                <p>Screen Size</p>
                                <p>:</p>
                                <p>{ product.value[0].ukuran_lubang_saringan || '-' }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>🔥 Potensi Roast</li>
                            
                            <li>
                                <p>Roast Level</p>
                                <p>:</p>
                                <p>{ product.value[0].level_roast || '-' }</p>
                            </li>

                            <li>
                                <p>Deskripsi Rasa</p>
                                <p>:</p>
                                <p>{ product.value[0].deskripsi_rasa || '-' }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>📊 QC Report</li>
                            
                            <li>
                                <p>Water Activity</p>
                                <p>:</p>
                                <p>{ product.value[0].aktivitas_air || '-' }</p>
                            </li>

                            <li>
                                <p>Quakers</p>
                                <p>:</p>
                                <p>{ product.value[0].quaker || '-' }</p>
                            </li>

                            <li>
                                <p>Cupping Potential</p>
                                <p>:</p>
                                <p>{ product.value[0].potensi_cupping || '-' }</p>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-primary-100 h-[1.5px] w-full" />

                    
                                        <section class="flex flex-col gap-y-6">
                                            {product.value[0].ulasan_produk_green_beans.length ? (
                                                <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-950">
                                                    Ulasan Pelanggan
                                                </h1>
                                            ) : null}
                    
                                            <ul 
                                                class={`
                                                    grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8
                                                    *:p-6 *:bg-primary-base *:border-[3px] *:border-solid *:border-primary-50 *:rounded-[12px]
                                                    *:flex *:flex-col *:gap-y-6 *:*:flex *:*:flex-col *:*:gap-y-4 *:*:*:flex *:*:*:flex-col *:*:*:gap-y-2 *:*:*:*:flex *:*:*:*:gap-2
                                                `}
                                            >
                                                {product.value[0].ulasan_produk_green_beans.map((review) => (
                                                    <li key={review.informasi_ulasan.id}>
                                                        <article>
                                                            <section>
                                                                <h1 class="font-lora text-h3-small text-neutral-custom-900">
                                                                    {review.informasi_ulasan.nama}, {review.informasi_ulasan.lokasi}
                                                                </h1>
                    
                                                                <section>
                                                                    {[...Array(review.informasi_ulasan.rating)].map((_, index) => (
                                                                        <Star
                                                                            key={index + 1}
                                                                            height={16}
                                                                            width={16}
                                                                            class="text-yellow-400"
                                                                        />
                                                                    ))}
                                                                </section>
                                                            </section>
                    
                                                            <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                                                                {review.informasi_ulasan.konten}
                                                            </p>
                                                        </article>
                    
                                                        <p class="font-work-sans font-medium text-right text-label-small sm:text-label-medium text-neutral-custom-600">
                                                            {formatDateTime(review.createdAt)}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                    
                </section>
            </div>

            <Separator />
            {/* </Form> */}
        </>
    );
});