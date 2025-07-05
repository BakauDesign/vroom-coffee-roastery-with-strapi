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
import { getProducts } from "~/server/services/products";
import { Product } from "~/components/main/product";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

export const useProducts = routeLoader$(
    async ( event ) => {
        return await getProducts({ event });
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

                <section class="general-section gap-y-[60px] items-center">
                    <section class="grid gap-9 overflow-scroll grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                        {products.data.map((product) => {
                            return (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    type={product.type}
                                    price={product.price}
                                    discount={product.discount}
                                    discountPrice={product.discount_price}
                                    photo={product.photo}
                                    weight={product.weight}
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