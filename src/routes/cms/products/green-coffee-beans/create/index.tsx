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
    GreenBeansProductForm,
    GreenBeansProductSchema
} from '~/schema/product';

import { TextField } from '~/components/cms/text-field';
import { Toggle } from "~/components/cms/toggle";
import { formatRupiah } from "~/lib/utils";
import { useDiscount } from "~/hooks/useDiscount";
import { createGreenBeansProduct } from "~/server/services/products/green-coffee-beans";

export const useProductFormLoader = routeLoader$<InitialValues<GreenBeansProductForm>>(() => ({
    name: '',
    description: '',
    photo: null,
    photoFile: null,
    highlight: '',
    stock: 0,
    price: 0,
    discount: 0,
    weight: 0,
    green_beans_data: {
        elevation: 1400,
        variety: null,
        origin: '',
        process: null,
        moisture_content: null,
        density: 0,
        defect: null,
        screen_size: null,

        roast_level: null,
        flavor_description:	null,

        water_activity: null,
        quakers: null,
        cupping_potential: null,
    }
}));
 
export const useProductFormAction = formAction$<GreenBeansProductForm>(
    async (values, event) => {
        return await createGreenBeansProduct({ values, event });
    },
    {
        validate: valiForm$(GreenBeansProductSchema),
        numbers: [
            'stock', 'price', 'discount', 'weight',
            'green_beans_data.elevation',
            'green_beans_data.moisture_content',
            'green_beans_data.density',
            'green_beans_data.screen_size',
            'green_beans_data.water_activity',
            'green_beans_data.quakers',
            'green_beans_data.cupping_potential'
        ]
    }
);


export default component$(() => {
    const loader = useProductFormLoader();
    const action = useProductFormAction();
 
    const [form, { Form, Field}] = useForm<GreenBeansProductForm>({
        loader: loader,
        action: action,
        validateOn: 'submit'
    });

    const navigate = useNavigate();

    const {
        handlePriceChange,
        handleDiscountChange,
        activatedDiscount,
        price,
        discountPrice
    } = useDiscount(form);

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
                        <Breadcrumb.Item href="/cms/products/green-coffee-beans">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item href="/cms/products/green-coffee-beans">
                            Green Coffee Beans
                        </Breadcrumb.Item>
 
                        <Breadcrumb.Item visited>
                            Add New Product
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>
 
                    <Header.Root>
                        <Header.Content>
                            <Header.Detail>
                                <Header.Headline>
                                    Tambah Produk Green Beans
                                </Header.Headline>
 
                                <Header.SupportingHeadline>
                                    Isi detail biji kopi matang terbaru dengan roast level dan karakteristik unik.
                                </Header.SupportingHeadline>
                            </Header.Detail>
 
                            <Header.Actions>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    onClick$={() => navigate("/cms/products/green-coffee-beans")}
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
                                                    <Input.Option>Opsional</Input.Option>
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
                                🌿 Karakteristik Biji
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Lewati bagian ini jika tidak ada data teknis.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="green_beans_data.origin">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Lokasi perkebunan. Contoh: 'Kabupaten Aceh Tengah, Gayo'.
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
                                                    placeholder="cth: Kabupaten Aceh Tengah, Gayo"
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

                                <Field name="green_beans_data.elevation" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Ketinggian perkebunan (mdpl). Contoh: 1400.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Ketinggian</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type="number"
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 1400"
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

                                <Field name="green_beans_data.variety">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Varietas kopi (contoh: Typica, Bourbon, Gesha).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Varietas</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Typica, Bourbon, Gesha."
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

                                <Field name="green_beans_data.process">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Metode pengolahan. Contoh: Washed, Natural, Honey.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Proses</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Washed, Natural, Honey."
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

                                <Field name="green_beans_data.moisture_content" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Persentase kadar air. Contoh: 12%.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Moisture Content</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 12%."
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

                                <Field name="green_beans_data.density" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Massa jenis (gram/liter). Contoh: 680.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Density</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 680."
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

                                <Field name="green_beans_data.defect">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Jumlah defect per gram. Contoh: 5 per 300gr.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Defect</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 680."
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

                                <Field name="green_beans_data.screen_size" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Ukuran saringan. Contoh: 16-18.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Screen Size</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 16-18."
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
                                🔥 Potensi Roast
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Lewati bagian ini jika tidak ada data teknis.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="green_beans_data.roast_level">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Rekomendasi level roast. Contoh: Light-Medium untuk floral.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Roast Level</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Light-Medium"
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

                                <Field name="green_beans_data.flavor_description">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Prediksi profil rasa. Contoh: 'Floral, stone fruit, brown sugar'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Deskripsi Rasa</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Floral, stone fruit, brown sugar."
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
                                🔍 QC Report
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Klik untuk tambahkan quantity check report (opsional).
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="green_beans_data.water_activity" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Aktivitas air (skala 0-1). Contoh: 0.58.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Water Activity</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 0.58"
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

                                <Field name="green_beans_data.quakers" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Jumlah quaker per sample. Contoh: 2.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Quakers</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 2"
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

                                <Field name="green_beans_data.cupping_potential" type="number">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Potensi skor cupping. Contoh: 85-87.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Cupping Potential</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    type='number'
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 85-87."
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