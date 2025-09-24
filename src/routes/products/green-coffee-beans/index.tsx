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

import HeroImage_1 from "~/assets/main/products/green-coffee-beans/Hero image 1.avif";
import HeroImage_2 from "~/assets/main/products/green-coffee-beans/Hero image 2.avif";
import HeroImage_3 from "~/assets/main/products/green-coffee-beans/Hero image 3.avif";

import { routeLoader$ } from "@builder.io/qwik-city";
import { getGreenBeansProducts } from "~/server/services/products";
import { Product } from "~/components/main/product";

import { greenFilterOption as filterOption } from "~/lib/filter-option";
import { SearchBarFilterBlock } from "~/components/blocks/main/search-bar-filter-block";
import { useGreenProducts } from "~/hooks/useGreenProducts";
import { Button } from "~/components/main/button";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };


export const useProducts = routeLoader$(
    async ( event ) => {
        return await getGreenBeansProducts({
			is_active: true,
			event
        });
    }
);

export const useFilter = routeLoader$(async () => {
    return filterOption;        
});

export default component$(() => {
    const products = useProducts();

    const { origin: asalFilter, process: processFilter } = useFilter().value;
    
    const {
        asal,
        proses,
        searchKeyword,
        productsData,
        totalResult,
        loadMore
    } = useGreenProducts(products);

    return (
        <>
            <figure class="hero-section ">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                        <h1>
                            Biji Kopi Mentah Berkualitas, <br />Langsung dari Kebun
                        </h1>

                        <p>
                            Untuk roaster rumahan atau kafe yang ingin bereksperimen dengan profil roast sendiri. Kadar air 10-12%, grade 80+.
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
                        currentValue={searchKeyword.value}
                    />

                    <section class="flex flex-col gap-6">
                        <p class="font-lora text-h3-small sm:text-h3-medium lg:text-h3-large font-medium text-neutral-custom-950">
                            Filter sesuai kebutuhan Anda:
                        </p>

                        <SearchBarFilterBlock.Filter
                            label="Asal:"
                            currentValue={asal}
                            values={asalFilter}
                            onClickOption$={(value) => asal.value = value}
                        />

                        <SearchBarFilterBlock.Filter
                            label="Proses:"
                            currentValue={proses}
                            values={processFilter}
                            onClickOption$={(value) => proses.value = value}
                        />
                    </section>
                </SearchBarFilterBlock.Root>

                <section class="general-section gap-y-[60px] items-center">
                    <section class="flex items-center gap-4 font-medium font-work-sans text-label-small sm:text-label-medium text-primary-800">
                        <p>Menampilkan&nbsp;{totalResult.value}&nbsp;produk</p>

                        <span class="h-[1.5px] w-full bg-primary-100" />
                    </section>

                    <section class="grid gap-9 overflow-scroll grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {productsData.value.map((product) => {
                            return (
                                <Product
                                    key={product.documentId}
                                    slug={product.slug}
                                    type="Green Coffee Beans"
                                    documentId={product.documentId}
									nama={product.informasi_produk.nama}
									deskripsi={product.informasi_produk.deskripsi}
									foto={product.informasi_produk.foto}
                                />
                            )
                        })}
                    </section>

                    {products.value.response && products.value.response.meta.pagination.page < products.value.response.meta.pagination.pageCount ? (
                        <Button
                            class="justify-self-center"
                            variant="primary"
                            size="large"
                            onClick$={() => loadMore()}
                        >
                            Muat Lebih Banyak
                        </Button>
                    ) : null}
                </section>
            </div>

            <Separator />
        </>
    );
});