import {
    $,
    component$,
    isDev,
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
    useNavigate
} from "@builder.io/qwik-city";
import { formatRupiah } from "~/lib/utils";
import { getToolsProductById } from "~/server/services/products";
import { OrderToolContext, type PurchasedToolProductType } from "~/context/order-context";

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

        const result = await getToolsProductById({ event });

        if (!result.data.length) {
            throw redirect(302, "/products/coffee-tools");
        }

        return result.data;
    }
);

export default component$(() => {
    const product = useProductDetail();

    const nav = useNavigate();

    const order = useContext(OrderToolContext);

    const addToOrder = $(() => {
        const newItem: PurchasedToolProductType = {
            documentId: product.value[0].documentId,
            nama_produk: product.value[0].informasi_produk.nama,
            varian_harga: product.value[0].diskon ? product.value[0].harga_diskon : product.value[0].harga,
            varian_kemasan: product.value[0].kemasan,
            varian_berat: product.value[0].berat,
            kuantitas: 1
        };
    
        const updatedItems = order.value.filter(
            (item) => item.documentId !== newItem.documentId
        );
    
        updatedItems.push(newItem);
    
        order.value = updatedItems;
    });


    return (
        <>
            {/* <Form> */}
            <figure class="hero-product grid-cols-2">
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
                            <section class="price-weight-wrapper">
                                { product.value[0].diskon ? (
                                    <section class="price-discount">
                                        <h1>
                                            {formatRupiah(parseInt(product.value[0].harga))}
                                        </h1>

                                        <p>
                                            {product.value[0].diskon}%
                                        </p>
                                    </section>
                                ) : null}
                                
                                <h1 class="price-weight">
                                    { product.value[0].diskon ? (
                                        `${formatRupiah(parseInt(product.value[0].harga_diskon))}`
                                    ) : (
                                        `${formatRupiah(parseInt(product.value[0].harga))}`
                                    )}
                                </h1>
                            </section>

                            <section class="stock">
                                <p>
                                    SISA {product.value[0].stok} PCS
                                </p>
                            </section>
                        </article>

                    </section>

                    <section class="actions">
                        <Button
                            variant="primary"
                            size="large"
                            onClick$={() => {
                                addToOrder();
                                nav("/products/coffee-tools/orders/create");
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
                                class="min-h-[60px] min-w-[60px]"
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
                            <li>🔧 Spesifikasi Teknis</li>
                            
                            <li>
                                <p>Material</p>
                                <p>:</p>
                                <p>{ product.value[0].material || "-" }</p>
                            </li>

                            <li>
                                <p>Kapasitas</p>
                                <p>:</p>
                                <p>{ product.value[0].kapasitas || "-" }</p>
                            </li>

                            <li>
                                <p>Berat</p>
                                <p>:</p>
                                <p>{ product.value[0].berat }g</p>
                            </li>

                            <li>
                                <p>Aksesori</p>
                                <p>:</p>
                                <p>{ product.value[0].aksesoris || '-' }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>📦 Packaging</li>
                            
                            <li>
                                <p>Kemasan</p>
                                <p>:</p>
                                <p>{ product.value[0].kemasan || '-' }</p>
                            </li>

                            <li>
                                <p>Stok Tersedia</p>
                                <p>:</p>
                                <p>{ product.value[0].stok }</p>
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