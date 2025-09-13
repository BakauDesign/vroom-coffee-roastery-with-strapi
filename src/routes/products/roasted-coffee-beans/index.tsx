import {
    component$,
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";
import { SearchBarFilterBlock } from "~/components/blocks/main/search-bar-filter-block";

import HeroImage_1 from "~/assets/main/products/roasted-coffee-beans/Hero image 1.avif";
import HeroImage_2 from "~/assets/main/products/roasted-coffee-beans/Hero image 2.avif";
import HeroImage_3 from "~/assets/main/products/roasted-coffee-beans/Hero image 3.avif";

import { useRoastedProductsCMS } from "~/hooks/useRoastedProducts";
import { roastedFilterOption as filterOption } from "~/lib/filter-option";

import { routeLoader$ } from "@builder.io/qwik-city";
import { getRoastedBeansProducts } from "~/server/services/products";
import { Product } from "~/components/main/product";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

export const useProducts = routeLoader$(
    async ( event ) => {
        return await getRoastedBeansProducts({
			is_active: true,
			highlighted: true,
            event
        });
    }
);

export const useFilter = routeLoader$(async () => {
    return filterOption;        
});

export default component$(() => {
    const { value: products } = useProducts();

    const { brewingMethod: brewingMethodFilter } = useFilter().value;

    const {
        brewingMethod,
        searchKeyword
    } = useRoastedProductsCMS();

    return (
        <>
            <figure class="hero-section ">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                        <h1>
                            Kopi Spesialti Siap Seduh, <br />Dipanggang dengan Presisi
                        </h1>

                        <p>
                            Biji kopi matang premium hasil roasting terkontrol, siap memberikan pengalaman ngopi terbaik di rumah Anda.
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

                <SearchBarFilterBlock.Root>
                    <SearchBarFilterBlock.SearchBar
                        class="w-full sm:max-w-[400px]"
                        placeholder="Cari Produk..."
                        onValueChange$={(value) => searchKeyword.value = value}
                    />

                    <section class="flex flex-col gap-6">
                        <p class="font-lora text-h3-small sm:text-h3-medium lg:text-h3-large font-medium text-neutral-custom-950">
                            Filter sesuai kebutuhan Anda:
                        </p>

                        <SearchBarFilterBlock.Filter
                            label="Metode Brewing:"
                            currentValue={brewingMethod}
                            values={brewingMethodFilter}
                            onClickOption$={(value) => brewingMethod.value = value}
                        />
                    </section>
                </SearchBarFilterBlock.Root>

                <section class="general-section gap-y-[60px] items-center">
                    <section class="grid gap-9 overflow-scroll grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {products.data.map((product) => {
                            return (
                                <Product
                                    type="Roasted Coffee Beans"
                                    key={product.documentId}
                                    slug={product.slug}
                                    documentId={product.documentId}
                                    nama={product.informasi_produk.nama}
                                    deskripsi={product.informasi_produk.deskripsi}
                                    foto={product.informasi_produk.foto}
                                    harga={product.daftar_varian_kemasan[0].harga}
                                    diskon={product.daftar_varian_kemasan[0].diskon}
                                    harga_diskon={product.daftar_varian_kemasan[0].harga_diskon}
                                    berat={product.daftar_varian_kemasan[0].berat}
                                />
                            )
                        })}
                    </section>
                </section>
            </div>

            <Separator />
        </>
    );
});