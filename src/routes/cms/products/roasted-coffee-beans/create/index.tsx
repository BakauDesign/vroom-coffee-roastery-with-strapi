// import * as v from 'valibot';

import {
    component$
} from "@builder.io/qwik";
 
import {
    routeLoader$,
    useNavigate
} from '@builder.io/qwik-city';
 
import { Breadcrumb } from "~/components/cms/breadcrumb";
import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
 
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
 
import { useForm, formAction$, valiForm$ } from "@modular-forms/qwik";
import type {
    InitialValues
} from "@modular-forms/qwik";

import { Input } from "~/components/cms/input";
import { FormBlock } from "~/components/blocks/cms/form-block";
import { UploadPhoto } from "~/components/cms/upload-photo";

import { // eslint-disable-line @typescript-eslint/consistent-type-imports
    ProductSchema,
    RoastedBeansProductForm,
    // ProductPhotoSchema
} from '~/schema/product';

import { TextField } from '~/components/cms/text-field';
import { Toggle } from "~/components/cms/toggle";
import { formatRupiah } from "~/lib/utils";
import { useDiscount } from "~/hooks/useDiscount";
import { useServingRecommendations } from "~/hooks/useServingRecommendations";
import { Trash } from "~/assets/cms/icons/Trash";
import { createProduct } from "~/server/services/products";
// import { uploadFileToBucket } from '~/lib/r2';

export const useProductFormLoader = routeLoader$<InitialValues<RoastedBeansProductForm>>(() => ({
    name: '',
    description: '',
    photo: null,
    highlight: '',
    stock: 0,
    price: 0,
    discount: null,
    weight: 0,
    roasted_beans_data: {
        origin: '',
        process: '',
        testNotes: '',
        packaging: '',
        serving_recomendation: [
            {
                name: "V60",
                description: "15g coffee, 250ml water @93°C, brew time 2:30 mins (medium grind)."
            },
            {
                name: "Espresso",
                description: "18g coffee, 36ml yield, 28 sec extraction (fine grind)."
            }
        ]
    }
}));
 
export const useProductFormAction = formAction$<RoastedBeansProductForm>(
    async (values, event) => {
        // const validPhoto = v.safeParse(ProductPhotoSchema, values.photo);

        // if (!validPhoto.success) {
        //     return {
        //         errors: { photo: validPhoto.issues[0].message }
        //     }
        // }
        try {
            // const uploadedPhoto = await uploadFileToBucket(values.photo, event.platform.env.BUCKET);
            
            return await createProduct({ values, event, photo: 'test.jpg' });
        } catch (error) {
            console.info("Error uploading photo");
        }


    },
    {
        validate: valiForm$(ProductSchema),
        numbers: ['stock', 'price', 'discount', 'weight'],
        arrays: ['roasted_beans_data.serving_recomendation']
    }
);


export default component$(() => {
    const loader = useProductFormLoader();
    const action = useProductFormAction();
 
    const [form, { Form, Field , FieldArray}] = useForm<RoastedBeansProductForm>({
        loader: loader,
        action: action,
        validateOn: 'submit',
        fieldArrays: ['roasted_beans_data.serving_recomendation']
    });

    const navigate = useNavigate();

    const {
        handlePriceChange,
        handleDiscountChange,
        activatedDiscount,
        price,
        discountPrice
    } = useDiscount();

    const {
        addRecommendation,
        removeRecommendation,
        newRecName,
        newRecDescription
    } = useServingRecommendations(form);

    return (
        <>
            <Form
                encType="multipart/form-data"
                class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative"
            >
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                {/* <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative"> */}
                {/* <section> */}
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/products/roasted-coffee-beans">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item href="/cms/products/roasted-coffee-beans">
                            Roasted Coffee Beans
                        </Breadcrumb.Item>
 
                        <Breadcrumb.Item visited>
                            Add New Product
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>
 
                    <Header.Root>
                        <Header.Content>
                            <Header.Detail>
                                <Header.Headline>
                                    Tambah Produk Roasted Beans
                                </Header.Headline>
 
                                <Header.SupportingHeadline>
                                    Isi detail biji kopi matang terbaru dengan roast level dan karakteristik unik.
                                </Header.SupportingHeadline>
                            </Header.Detail>
 
                            <Header.Actions>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    onClick$={() => navigate("/cms/products/roasted-coffee-beans")}
                                    type="button"
                                >
                                    Batal
                                </Button>
 
                                <Button
                                    variant="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Tambahkan Produk
                                </Button>
                            </Header.Actions>
                        </Header.Content>
                    </Header.Root>
 
                    <Separator />
 
                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                Informasi dasar
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Belum lengkap: Nama, Logo, Biaya.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="name">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan nama deskriptif yang mencakup asal biji + roast level. Contoh: 'Aceh Gayo Medium Roast' (21 karakter). Hindari singkatan tidak jelas.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Nama produk</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Aceh Gayo Medium Roast"
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
 
                                <Field name="photo">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan foto close-up biji kopi atau kemasan dengan pencahayaan jelas dan pastikan file dalam format .jpg/.png, ukuran maksimal 10MB (800x800px minimum).
                                                </p>
                                            </article>
 
                                            <UploadPhoto.Root>
                                                <UploadPhoto.Header>
                                                    <UploadPhoto.Label>Foto Produk</UploadPhoto.Label>
                                                    <UploadPhoto.Option>Wajib</UploadPhoto.Option>
                                                </UploadPhoto.Header>
 
                                                <UploadPhoto.FieldFile
                                                    {...props}
                                                    name={field.name}
                                                />
 
                                                <UploadPhoto.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </UploadPhoto.Message>
                                            </UploadPhoto.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field name="description">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Deskripsikan rasa, aroma, asal biji, dan rekomendasi brewing. Contoh: 'Single origin dari Gayo, roast medium. Dominan cokelat dengan aftertaste karamel. Cocok untuk pour over atau French Press.'' (150 karakter).
                                                </p>
                                            </article>
 
                                            <TextField.Root>
                                                <TextField.Header>
                                                    <TextField.Label>Deskripsi produk</TextField.Label>
                                                    <TextField.Option>Wajib</TextField.Option>
                                                </TextField.Header>
 
                                                <TextField.Field
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Single origin dari Gayo dengan aftertaste cokelat dan karamel."
                                                    min={0}
                                                />
 
                                                <TextField.Message>
                                                    { field.error }
                                                </TextField.Message>
                                            </TextField.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field type="number" name="price">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Masukkan harga per kemasan (tanpa titik/koma). Contoh: 25000 (Rp25.000). Pastikan sudah termasuk biaya kemasan.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Harga</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    type='number'
                                                    placeholder="cth: 98000"
                                                    min={0}
                                                    onChange$={handlePriceChange}
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field type="number" name="discount">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <section class="flex justify-between">
                                                    <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                        Panduan:
                                                    </h1>

                                                    <Toggle
                                                        value={activatedDiscount.value}
                                                        onClick$={() => activatedDiscount.value = !activatedDiscount.value}
                                                    />
                                                    
                                                </section>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Aktifkan diskon untuk promo. Masukkan persentase tanpa %. Contoh: 10 (artinya diskon 10%).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Diskon</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={activatedDiscount.value ? field.value : null}
                                                    type='number'
                                                    placeholder="cth: 10"
                                                    disabled={!activatedDiscount.value}
                                                    onChange$={handleDiscountChange}
                                                    min={1}
                                                />

                                                { activatedDiscount.value && (
                                                    <section>
                                                        <p>
                                                            { formatRupiah(price.value) }
                                                        </p>

                                                        <p>
                                                            { formatRupiah(discountPrice.value) }
                                                        </p>
                                                    </section>
                                                )}
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field type="number" name="weight">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Berat bersih kopi dalam gram. Contoh: 100 (untuk 100gr) atau 1000 (1kg).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Berat produk</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    type='number'
                                                    placeholder="cth: 250"
                                                    min={0}
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field type="number" name="stock">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Jumlah kemasan yang tersedia. Contoh: 50 (artinya 50 paket siap jual).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Stok (pcs)</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    type='number'
                                                    placeholder="cth: 90pcs"
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field name="highlight">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Kalimat pendek untuk menarik perhatian. Contoh: 'Roast spesial bulan ini - rasa smoky & bold!' (45 karakter).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Highlight Produk</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: rasa smoky & bold!"
                                                />
 
                                                <Input.Message>
                                                    <p>
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
                            </section>
                        </FormBlock.Content>
                    </FormBlock.Root>

                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                👃 Test Notes
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Klik untuk tambahkan catatan test (opsional).
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="roasted_beans_data.testNotes">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan informasi Aroma, Flavor, Aftertaste, Body, dan Acidity produk. Contoh: 'Floral aroma, dark chocolate flavor, sweet aftertaste. Medium body, balanced acidity' 20 karakter.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Test Notes</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Sweet aftertaste with creamy body."
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
                            </section>
                        </FormBlock.Content>
                    </FormBlock.Root>

                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                🌱 Karakteristik Biji
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Asal, ketinggian, dan karakteristik rasa sudah terisi.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="roasted_beans_data.origin">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Asal geografis biji (contoh: Gayo, Aceh, Indonesia). Minimal 10 karakter.
                                                </p>
                                            </article>
 
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
                                                    placeholder="cth: Gayo, Aceh, Indonesia"
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>

                                <Field name="roasted_beans_data.process">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Metode pengolahan biji (contoh: Natural, Honey, Washed).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Proses</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Natural"
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
                            </section>
                        </FormBlock.Content>
                    </FormBlock.Root>

                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                ☕ Rekomendasi Penyajian
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Klik untuk tambahkan catatan rekomendasi penyajian (opsional).
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <FieldArray
                                name="roasted_beans_data.serving_recomendation"
                            >
                                {(fieldArray) => (
                                    <section class="flex flex-col gap-y-8">
                                        <ul class="flex gap-4 *:w-[360px] *:max-w-[360px] *:flex *:flex-col *:gap-y-3 *:py-3 *:px-4 *:bg-neutral-custom-base *:border-[1.5px] *:border-neutral-custom-100 *:rounded-2xl">
                                        {fieldArray.items.map((item, index) => (
                                            <li
                                                key={item}
                                                class="text-cms-label-small sm:text-cms-label-medium *:first:font-medium"
                                            >
                                                <Field
                                                    name={`roasted_beans_data.serving_recomendation.${index}.name`}
                                                >
                                                    {(field, props) => (
                                                        <div class="flex items-center justify-between gap-2 text-neutral-custom-800">
                                                            <p>{field.value}</p>
                                                            {field.error}
                                                            <Trash
                                                                class="cursor-pointer"
                                                                onClick$={() => removeRecommendation(index)}
                                                            />

                                                            <input
                                                                type="hidden"
                                                                {...props}
                                                                id={field.name}
                                                                name={field.name}
                                                                value={field.value}
                                                            />
                                                        </div>
                                                    )}
                                                </Field>
                                                
                                                <Field
                                                    name={`roasted_beans_data.serving_recomendation.${index}.description`}
                                                >
                                                    {(field, props) => (
                                                        <>
                                                            <input
                                                                type="hidden"
                                                                {...props}
                                                                id={field.name}
                                                                name={field.name}
                                                                value={field.value}
                                                            />
                                                            <p class="text-neutral-custom-700">
                                                                { field.value }
                                                            </p>
                                                        </>
                                                    )}
                                                </Field>
                                            </li>
                                        ))}
                                        </ul>

                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan nama singkat (contoh: 'V60', 'Aeropress', 'French Press'). Hindari spasi atau simbol.
                                                </p>
                                            </article>

                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Nama Penyajian</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
                
                                                <Input.FieldText
                                                    bind:value={newRecName}
                                                    onChange$={(_, element) => newRecName.value = element.value}
                                                    placeholder="cth: 'V60', 'Aeropress'"
                                                />
                                            </Input.Root>
                                        </section>

                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Deskripsi singkat langkah penyajian. Contoh: '15g kopi, 250ml air @92°C, 2 menit'.
                                                </p>
                                            </article>

                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Cara Penyajian</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
                
                                                <Input.FieldText
                                                    bind:value={newRecDescription}
                                                    onChange$={(_, element) => newRecDescription.value = element.value}
                                                    placeholder="cth: '15g kopi, 250ml air @92°C, 2 menit'."
                                                />
                                            </Input.Root>
                                        </section>

                                        <section>
                                            <Button
                                                variant="primary"
                                                size="small"
                                                onClick$={async () => {
                                                    await addRecommendation();
                                                }}  
                                            >
                                                Tambah rekomendasi
                                            </Button>
                                        </section>
                                    </section>
                                )}
                            </FieldArray>
{/* 
                            <Button
                                variant="primary"
                                size="small"
                                onClick$={() => {
                                    insert(form, 'roasted_beans_data.serving_recomendation', {
                                        value: { name: newRecName.value, description: newRecDescription.value }
                                    });
                                    
                                }}  
                            >
                                Tambah rekomendasi
                            </Button> */}
                        </FormBlock.Content>
                    </FormBlock.Root>
                    
                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                📦 Packaging
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Belum lengkap: Kemasan.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="roasted_beans_data.packaging">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Jenis kemasan (contoh: One Way Valve, Vacuum Seal).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Kemasan</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: One Way Valve, Vacuum Seal"
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
                            </section>
                        </FormBlock.Content>
                    </FormBlock.Root>
                </section>
                {/* </section> */}
            {/* </section> */}
            </Form>
        </>
    );
});