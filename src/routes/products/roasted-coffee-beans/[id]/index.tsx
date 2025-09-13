import {
    $,
    component$,
    isDev,
    useContext,
    useSignal
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
import { getRoastedBeansProductById } from "~/server/services/products";
import { formatDateTime, formatRupiah } from "~/lib/utils";
import { OrderRoastedBeanContext } from "~/context/order-context";
import type { RoastedBeanProductType } from "~/context/order-context";

import { Star } from "~/assets/Icons/Star";
import type { PackageVariant } from "~/interfaces";
import { RadioButton } from "~/components/main/radio-button";

export const useProductDetail = routeLoader$(
    async (event) => {
        const { redirect } = event;

        // const productId = parseInt(params.id);

        const result = await getRoastedBeansProductById({
            is_active: true,
            event
        });

        if (!result.data.length) {
            throw redirect(302, "/products/roasted-coffee-beans");
        }

        return result.data;
    }
);

export default component$(() => {
    const product = useProductDetail();
    const selectedPackageVariant = useSignal<PackageVariant>(product.value[0].daftar_varian_kemasan[0]);
    const packageVariants = useSignal<Array<PackageVariant>>(product.value[0].daftar_varian_kemasan);

    const nav = useNavigate();

    const order = useContext(OrderRoastedBeanContext);

    const addToOrder = $(() => {
        const newItem: RoastedBeanProductType = {
            documentId: product.value[0].documentId,
            nama_produk: product.value[0].informasi_produk.nama,
            varian_harga: selectedPackageVariant.value.diskon ? selectedPackageVariant.value.harga_diskon : selectedPackageVariant.value.harga,
            varian_kemasan: selectedPackageVariant.value.kemasan,
            varian_berat: selectedPackageVariant.value.berat,
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
                                { selectedPackageVariant.value.diskon ? (
                                    <section class="price-discount">
                                        <h1>
                                            {formatRupiah(parseInt(selectedPackageVariant.value.harga))}
                                        </h1>

                                        <p>
                                            {(selectedPackageVariant.value.diskon) ? (
                                                `${selectedPackageVariant.value.diskon}%`
                                            ) : null}
                                        </p>
                                    </section>
                                ) : null}
                                
                                <h1 class="price-weight">
                                    { selectedPackageVariant.value.diskon ? (
                                        `${formatRupiah(parseInt(selectedPackageVariant.value.harga_diskon))}/${selectedPackageVariant.value.berat}gr`
                                    ) : (
                                        `${formatRupiah(parseInt(selectedPackageVariant.value.harga))}/${selectedPackageVariant.value.berat}gr`
                                    )}
                                </h1>
                            </section>

                            <section class="stock">
                                <p>
                                    SISA {selectedPackageVariant.value.stok} PCS
                                </p>
                            </section>
                        </article>

                    </section>

                    <section class="flex gap-4 items-center">
                        {packageVariants.value.map((variant) => ( 
                            <RadioButton
                                key={variant.documentId}
                                name="varian kemasan"
                                currentValue={selectedPackageVariant}
                                value={variant}
                                onClickOption$={() => {
                                    selectedPackageVariant.value = variant;
                                }}
                                class="flex items-center gap-x-1"
                                >
                                    {variant.kemasan}
                            </RadioButton>
                        ))}
                    </section>


                    <section class="actions">
                        <Button
                            variant="primary"
                            size="large"
                            onClick$={() => {
                                addToOrder();
                                nav("/products/roasted-coffee-beans/orders/create");
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
                                <p>{ product.value[0].asal }</p>
                            </li>

                            <li>
                                <p>Proses</p>
                                <p>:</p>
                                <p>{ product.value[0].proses }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>👃 Test Notes</li>
                            
                            <li>
                                <p>{ product.value[0].catatan_tes || "Tidak ada test notes" }</p>
                            </li>
                        </ul>

                        <ul>
                            <li>⚡ Rekomendasi Penyajian</li>
                            
                            {product.value[0]?.daftar_rekomendasi_penyajian.map((serving) => {
                                return (
                                    <li key={serving.id}>
                                        <p>{serving.nama}</p>
                                        <p>:</p>
                                        <p>{serving.deskripsi}</p>
                                    </li>
                                );
                            })}
                        </ul>

                        <ul>
                            <li>📦 Packaging</li>
                            
                            <li>
                                <p>Kemasan</p>
                                <p>:</p>
                                <p>{product.value[0].daftar_varian_kemasan[0].harga}gr + {product.value[0].kemasan}</p>
                            </li>
                        </ul>
                    </section>

                    <div class="bg-neutral-custom-200 h-[1.5px] w-full" />

                    <section class="flex flex-col gap-y-6">
                        {product.value[0].ulasan_produk_roasted_beans.length ? (
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
                            {product.value[0].ulasan_produk_roasted_beans.map((review) => (
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


                    {/* <section class="flex flex-col gap-y-6 items-center">
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
                    </section> */}
                </section>
            </div>

            <Separator />
            {/* </Form> */}
        </>
    );
});