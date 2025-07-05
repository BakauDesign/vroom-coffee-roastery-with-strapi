import {
    $,
    component$,
    useContext
    // useContextProvider
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import InfoIcon from "~/assets/Icons/Info.png"
import { Button } from "~/components/main/button";
import {
    routeLoader$,
    useLocation,
    useNavigate
} from "@builder.io/qwik-city";
import { formatRupiah, isLocalhost } from "~/lib/utils";
import { OrderContext } from "~/context/order-context";
import type { PurchasedProductType } from "~/context/order-context";
import { getGreenBeansProductById } from "~/server/services/products/green-coffee-beans";

// import {
//     // formAction$,
//     InitialValues,
//     insert,
//     useForm,
//     // valiForm$
// } from "@modular-forms/qwik";

// import { 
//     CreateOrderForm,
//     // OrderForm,
//     // OrderSchema
// } from "~/schema/order";

// import Keberlanjutan from "~/assets/Icons/Keberlanjutan.png";
// import Transparansi from "~/assets/Icons/Transparansi.png";
// import Inovasi from "~/assets/Icons/Inovasi.png";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

// export const useOrderFormLoader = routeLoader$<InitialValues<CreateOrderForm>>(() => ({
//     buyer_name: '',
//     whatsapp_number: '',
//     address: '',
//     courier_notes: '',
//     status: '',
//     tracking_number: '',
//     shipping_cost: 0,
//     payment_method: '',
//     purchasedProduct: []
// }));

export const useProductDetail = routeLoader$(
    async (event) => {
        const { redirect } = event;

        const result = await getGreenBeansProductById({ event });

        if (!result.data) {
            throw redirect(302, "/products/green-coffee-beans");
        }

        return result.data;
    }
);

export default component$(() => {
    const product = useProductDetail();
    
    const loc = useLocation();
    const nav = useNavigate();

    const order = useContext(OrderContext);

    const addToOrder = $(() => {
        const newItem: PurchasedProductType = {
            product_id: product.value.id,
            name: product.value.name,
            type: product.value.type,
            price: product.value.price,
            weight: product.value.weight,
            quantity: 1
        };

        order.value = [...order.value, newItem];
    });

    return (
        <>
            {/* <Form> */}
            <figure class="hero-product grid-cols-2">
                <figcaption class="content">
                    <section class="detail">
                        <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                            <h1>
                                { product.value.name }
                            </h1>

                            <p>
                                { product.value.description.slice(0, 107) }
                            </p>
                        </article>

                        <article class="price-stock">
                            <section class="price-weight-wrapper">
                                { product.value.discount ? (
                                    <section class="price-discount">
                                        <h1>
                                            {formatRupiah(product.value.price)}
                                        </h1>

                                        <p>
                                            {product.value.discount}%
                                        </p>
                                    </section>
                                ) : null}
                                
                                <h1 class="price-weight">
                                    { product.value.discount_price ? (
                                        `${formatRupiah(product.value.discount_price)}/${product.value.weight}gr`
                                    ) : (
                                        `${formatRupiah(product.value.price)}/${product.value.weight}gr`
                                    )}
                                </h1>
                            </section>

                            <section class="stock">
                                <p>
                                    SISA {product.value.stock} PCS
                                </p>
                            </section>
                        </article>

                    </section>

                    <section class="actions">
                        <Button
                            variant="primary"
                            size="large"
                            onClick$={() => {
                                // insert(form, 'purchasedProduct', {
                                //     value: {
                                //         name: product.value.name,
                                //         type: product.value.type,
                                //         price: product.value.price,
                                //         weight: product.value.weight,
                                //         quantity: 1
                                //     }
                                // })
                                addToOrder();
                                nav("/products/orders/create");
                            }}
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
                        src={`${isLocalhost(loc.url) ? `http://127.0.0.1:8788/media/${product.value.photo}` : `https://vroom-coffee-roastery.pages.dev/media/${product.value.photo}`}`}
                        alt="Product image"
                        height={500}
                        width={500}
                    />

                    {product.value.highlight ? (
                        <article class="higlight">
                            <img
                                src={InfoIcon}
                                alt="Info Icon"
                                height={100}
                                width={100}
                            />
                            <p>
                                { product.value.highlight }
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
                            { product.value.description }
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
                                <p>{ product.value.green_beans?.origin }</p>
                            </li>

                            <li>
                                <p>Ketinggian</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.elevation }</p>
                            </li>

                            <li>
                                <p>Varietas</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.variety || '-' }</p>
                            </li>

                            <li>
                                <p>Moisture Content</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.process || '-' }</p>
                            </li>

                            <li>
                                <p>Density</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.density || '-' }</p>
                            </li>

                            <li>
                                <p>Defect</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.defect || '-' }</p>
                            </li>

                            <li>
                                <p>Screen Size</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.screen_size || '-' }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>🔥 Potensi Roast</li>
                            
                            <li>
                                <p>Roast Level</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.roast_level || '-' }</p>
                            </li>

                            <li>
                                <p>Deskripsi Rasa</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.flavor_description || '-' }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>📊 QC Report</li>
                            
                            <li>
                                <p>Water Activity</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.water_activity || '-' }</p>
                            </li>

                            <li>
                                <p>Quakers</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.quakers || '-' }</p>
                            </li>

                            <li>
                                <p>Cupping Potential</p>
                                <p>:</p>
                                <p>{ product.value.green_beans?.cupping_potential || '-' }</p>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-primary-100 h-[1.5px] w-full" />
                </section>
            </div>

            <Separator />
            {/* </Form> */}
        </>
    );
});