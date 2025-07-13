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
import { getProductById } from "~/server/services/products";
import { formatDateTime, formatRupiah, isLocalhost } from "~/lib/utils";
import { OrderContext } from "~/context/order-context";
import type { PurchasedProductType } from "~/context/order-context";
import { Modal } from "~/components/main/modal";

import {
    formAction$,
    InitialValues,
    setValue,
    useForm,
    valiForm$
} from "@modular-forms/qwik";

import { CreateReviewForm, ReviewSchema } from "~/schema/review";
import { createReviewCustomer } from "~/server/services/reviews";
import { Input } from "~/components/main/input";
import { TextField } from "~/components/main/text-field";
import { Star } from "~/assets/Icons/Star";

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

export const useReviewFormLoader = routeLoader$<InitialValues<CreateReviewForm>>(() => {
    return {
        name: '',
        location: '',
        rating: 5,
        content: ''
    }
});
 
export const useReviewFormAction = formAction$<CreateReviewForm>(
    async (values, event) => {
        await createReviewCustomer({ values, event });
        event.redirect(301, `/products/roasted-coffee-beans/${event.params.id}`);
    },
    {
        validate: valiForm$(ReviewSchema),
        numbers: [
            'rating'
        ]
    }
);

export const useProductDetail = routeLoader$(
    async (event) => {
        const { params, redirect } = event;

        const productId = parseInt(params.id);

        const result = await getProductById({
            productId,
            event,
            options: "Roasted Coffee Beans"
        });

        if (!result.data) {
            throw redirect(302, "/products/roasted-coffee-beans");
        }

        return result.data;
    }
);

export default component$(() => {
    const product = useProductDetail();

    const [form, { Form, Field }] = useForm<CreateReviewForm>({
        loader: useReviewFormLoader(),
        action: useReviewFormAction(),
        validateOn: 'submit',
    });
    
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
                        grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                        *:*:first:font-lora  *:*:first:text-h3-small *:*:first:font-medium *:*:first:text-neutral-custom-950
                        *:*:font-work-sans  *:*:text-label-small *:*:sm:text-label-medium *:*:text-neutral-custom-600 *:*:*:first:min-w-[100px] *:*:*:first:sm:min-w-[100px]
                        *:flex *:flex-col *:gap-4 *:*:flex *:*:gap-4
                    `}>
                        <ul>
                            <li>🌿 Karakteristik Biji</li>
                            
                            <li>
                                <p>Asal</p>
                                <p>:</p>
                                <p>{ product.value.roasted_beans?.origin }</p>
                            </li>

                            <li>
                                <p>Proses</p>
                                <p>:</p>
                                <p>{ product.value.roasted_beans?.process }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>👃 Test Notes</li>
                            
                            <li>
                                <p>{ product.value.roasted_beans?.test_notes || "Tidak ada test notes" }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>⚡ Rekomendasi Penyajian</li>
                            
                            {product.value.roasted_beans?.serving_recommendation.map((serving) => {
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
                                <p>{product.value.weight}gr + {product.value.roasted_beans?.packaging}</p>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-neutral-custom-200 h-[1.5px] w-full" />

                    <section class="flex flex-col gap-y-6">
                        {product.value.review.length ? (
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
                            {product.value.review.map((review) => (
                                <li key={review.id}>
                                    <article>
                                        <section>
                                            <h1 class="font-lora text-h3-small text-neutral-custom-900">
                                                {review.name}, {review.location}
                                            </h1>

                                            <section>
                                                {[...Array(review.rating)].map((_, index) => (
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
                                            {review.content}
                                        </p>
                                    </article>

                                    <p class="font-work-sans font-medium text-right text-label-small sm:text-label-medium text-neutral-custom-600">
                                        {formatDateTime(review.date.toISOString())}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>


                    <section class="flex flex-col gap-y-6 items-center">
                        <article class="text-center flex flex-col gap-y-4 items-center">
                            <h1 class="font-lora text-primary-700 font-semibold text-h2-small sm:text-h2-medium lg:text-h2-large max-w-[800px]">
                                Apa Pendapatmu Tentang {product.value.name}?
                            </h1>

                            <h2 class="font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium max-w-[600px]">
                                Kami ingin tahu kesan pertama Anda! Bagikan pengalaman minum kopi ini dalam 3 kalimat.
                            </h2>
                        </article>

                        <Modal.Root>
                            <Modal.TriggerOpen>
                                <Button
                                    variant="primary"
                                >
                                    Ceritakan Pengalamanmu
                                </Button>
                            </Modal.TriggerOpen>

                            <Modal.Content>
                                <section class="pt-8 pb-6 px-8 w-[1000px] bg-primary-base border-[3px] border-solid border-primary-50 rounded-2xl *:flex *:flex-col *:gap-y-8">
                                    <Form>
                                    <article class="flex flex-col gap-y-3">
                                        <h1 class="font-lora font-semibold text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-900">
                                            Bagaimana Pengalaman Anda?
                                        </h1>

                                        <h2 class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                                            Beri tahu kami pendapatmu tentang {product.value.name}, ulasan jujur membantu kami tumbuh!
                                        </h2>
                                    </article>

                                    <section class="flex flex-col gap-y-6">
                                        <Field name="rating" type="number">
                                            {(field: any) => (
                                                <section class="flex gap-3 items-center justify-center">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star
                                                            key={index + 1}
                                                            height={48}
                                                            width={48}
                                                            class={`cursor-pointer ${field.value > index ? "text-yellow-400" : "text-yellow-100"}`}
                                                            onClick$={() => setValue(form, "rating", index + 1)}
                                                        />
                                                    ))}
                                                </section>
                                            )}
                                        </Field>
                                
                                        <Field name="name">
                                            {(field: any, props: any) => (
                                                <Input.Root>
                                                    <Input.Header>
                                                        <Input.Label>Nama</Input.Label>
                                                        <Input.Option>Wajib</Input.Option>
                                                    </Input.Header>
                                         
                                                    <Input.FieldText
                                                        {...props}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="cth: 'Aulia Azahra'."
                                                    />
                                         
                                                    <Input.Message>
                                                        <p class="text-red-500">
                                                            { field.error }
                                                        </p>
                                                    </Input.Message>
                                                </Input.Root>
                                                
                                            )}
                                        </Field>

                                        <Field name="location">
                                            {(field: any, props: any) => (
                                                <Input.Root>
                                                    <Input.Header>
                                                        <Input.Label>Asal</Input.Label>
                                                        <Input.Option>Wajib</Input.Option>
                                                    </Input.Header>
                                         
                                                    <Input.FieldText
                                                        {...props}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="cth: 'Jakarta Selatan'."
                                                    />
                                         
                                                    <Input.Message>
                                                        <p class="text-red-500">
                                                            { field.error }
                                                        </p>
                                                    </Input.Message>
                                                </Input.Root>
                                                
                                            )}
                                        </Field>

                                        <Field name="content">
                                            {(field: any, props: any) => (
                                                <TextField.Root>
                                                    <TextField.Header>
                                                        <TextField.Label>Ulasan</TextField.Label>
                                                        <TextField.Option>Wajib</TextField.Option>
                                                    </TextField.Header>
                                         
                                                    <TextField.Field
                                                        {...props}
                                                        id={field.name}
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="cth: 'Aromanya floral, cocok untuk pour over. Packing sangat rapi!'."
                                                    />
                                         
                                                    <Input.Message>
                                                        <p class="text-red-500">
                                                            { field.error }
                                                        </p>
                                                    </Input.Message>
                                                </TextField.Root>
                                            )}
                                        </Field>
                                    </section>

                                    <section class="*:flex *:gap-4 *:justify-end">
                                        <Modal.TriggerClose>
                                            <Button
                                                variant="secondary"
                                            >
                                                Batalkan
                                            </Button>    
                                        
                                            <Button
                                                variant="primary"
                                                type="submit"
                                            >
                                                Kirim Ulasan
                                            </Button>
                                        </Modal.TriggerClose>
                                    </section>
                                    </Form>
                                </section>
                            </Modal.Content>
                        </Modal.Root>
                    </section>
                </section>
            </div>

            <Separator />
            {/* </Form> */}
        </>
    );
});