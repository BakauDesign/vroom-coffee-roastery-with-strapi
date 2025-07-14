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

import {
    ToolsProductForm, // eslint-disable-line @typescript-eslint/consistent-type-imports
    ToolsProductSchema,
} from '~/schema/product';

import { TextField } from '~/components/cms/text-field';
import { Toggle } from "~/components/cms/toggle";
import { formatRupiah } from "~/lib/utils";

import { useDiscount } from "~/hooks/useDiscount";
import { useMainFeature } from "~/hooks/useMainFeature";

import { Trash } from "~/assets/cms/icons/Trash";
import { createToolsProduct } from "~/server/services/products/tools";

export const useProductFormLoader = routeLoader$<InitialValues<ToolsProductForm>>(() => ({
    name: '',
    description: '',
    photo: null,
    photoFile: null,
    highlight: '',
    stock: 0,
    price: 0,
    discount: null,
    weight: 0,
    tools_data: {
        material: '',
        capacity: '',
        dimensions: null,
        compatibility: null,
        settings: null,
        accessories: null,
        packaging: '',
        main_feature: []
    }
}));
 
export const useProductFormAction = formAction$<ToolsProductForm>(
    async (values, event) => {
        return await createToolsProduct({ values, event });
    },
    {
        validate: valiForm$(ToolsProductSchema),
        numbers: ['stock', 'price', 'discount', 'weight'],
        arrays: ['tools_data.main_feature']
    }
);

export default component$(() => {
    const loader = useProductFormLoader();
    const action = useProductFormAction();
 
    const [form, { Form, Field , FieldArray}] = useForm<ToolsProductForm>({
        loader: loader,
        action: action,
        validateOn: 'submit',
        fieldArrays: ['tools_data.main_feature']
    });

    const navigate = useNavigate();

    const {
        handlePriceChange,
        handleDiscountChange,
        activatedDiscount,
        price,
        discountPrice
    } = useDiscount(form);

    const {
        addFeature,
        removeFeature,
        newRecEmoji,
        newRecName,
        newRecDescription
    } = useMainFeature(form);

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
                        <Breadcrumb.Item href="/cms/products/coffee-tools">
                            Products
                        </Breadcrumb.Item>

                        <Breadcrumb.Item href="/cms/products/coffee-tools">
                            Coffee Tools
                        </Breadcrumb.Item>
 
                        <Breadcrumb.Item visited>
                            Add New Product
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>
 
                    <Header.Root>
                        <Header.Content>
                            <Header.Detail>
                                <Header.Headline>
                                    Tambah Alat Kopi Baru
                                </Header.Headline>
 
                                <Header.SupportingHeadline>
                                    Lengkapi detail peralatan untuk ditampilkan di katalog toko. Pastikan informasi jelas dan foto menarik.
                                </Header.SupportingHeadline>
                            </Header.Detail>
 
                            <Header.Actions>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    onClick$={() => navigate("/cms/products/coffee-tools")}
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
                                                    photoFile="photoFile"
                                                    photoUrl="photo"
                                                    photo={loader.value.photo}
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
                                                    <Input.Option>Opsional</Input.Option>
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
                                🔧 Spesifikasi Teknis
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Klik untuk tambahkan quantity check report (opsional).
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="tools_data.material">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Bahan utama alat. Contoh: 'Stainless Steel + Keramik' atau 'Kaca Borosilikat'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Material</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Kaca Borosilikat."
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

                                <Field name="tools_data.capacity">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Sesuaikan jenis alat: Grinder: '30g biji kopi', Brewer: '350ml air', Tamper: '58mm diameter'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Kapasitas</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 30g biji kopi."
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

                                <Field name="tools_data.dimensions">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Ukuran dalam cm (PxLxT). Contoh: '12x8x20 cm'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Dimensi</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 12x8x20 cm."
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

                                <Field name="tools_data.compatibility">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Alat atau aksesori pendukung. Contoh: 'Filter V60 #02' atau 'Portafilter 58mm'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Kompatibilitas</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Filter V60 #02."
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

                                <Field name="tools_data.settings">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Variasi penggunaan. Contoh: '24 klik grind size' atau 'Suhu 90-96°C'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Pengaturan</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: '24 klik grind size' atau 'Suhu 90-96°C'."
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

                                <Field name="tools_data.accessories">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Item bawaan. Pisahkan dengan koma. Contoh: 'Brush, pouch, panduan'.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Aksesori</Input.Label>
                                                    <Input.Option>Opsional</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: 'Brush, pouch, panduan'."
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
                                🔮 Fitur Utama
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Lewati bagian ini jika tidak ada data teknis.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <FieldArray
                                name="tools_data.main_feature"
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
                                                    name={`tools_data.main_feature.${index}.emoji`}
                                                >
                                                    {(fieldEmoji, propsEmoji) => (
                                                        <div class="flex items-center justify-between gap-2 text-neutral-custom-800">
                                                            <Field
                                                                name={`tools_data.main_feature.${index}.name`}
                                                            >
                                                                {(fieldName, propsName) => (
                                                                    <>
                                                                        <p>
                                                                            {`${fieldEmoji.value} ${fieldName.value}`}
                                                                        </p>
                                                                        
                                                                        <Trash
                                                                            class="cursor-pointer"
                                                                            onClick$={() => removeFeature(index)}
                                                                        />

                                                                        <input
                                                                            type="hidden"
                                                                            {...propsEmoji}
                                                                            id={fieldEmoji.name}
                                                                            name={fieldEmoji.name}
                                                                            value={fieldEmoji.value}
                                                                        />

                                                                        <input
                                                                            type="hidden"
                                                                            {...propsName}
                                                                            id={fieldName.name}
                                                                            name={fieldName.name}
                                                                            value={fieldName.value}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Field>
                                                        </div>
                                                    )}
                                                </Field>
                                                
                                                <Field
                                                    name={`tools_data.main_feature.${index}.description`}
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
                                                    Gunakan emoji yang mewakili fitur (🌡️ untuk 'Tahan Panas', 💧 untuk 'Waterproof').
                                                </p>
                                            </article>

                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Nama Penyajian</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
                
                                                <Input.FieldText
                                                    bind:value={newRecEmoji}
                                                    onChange$={(_, element) => newRecEmoji.value = element.value}
                                                    placeholder="cth: ‘🌡️ untuk 'Tahan Panas', 💧 untuk 'Waterproof'."
                                                />
                                            </Input.Root>
                                        </section>

                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan kata kunci jelas tanpa singkatan (contoh: `Anti-Karat` hindari 'Anti-Krt').
                                                </p>
                                            </article>

                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Nama Fitur</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
                
                                                <Input.FieldText
                                                    bind:value={newRecName}
                                                    onChange$={(_, element) => newRecName.value = element.value}
                                                    placeholder="cth: 'Anti-Karat'."
                                                />
                                            </Input.Root>
                                        </section>

                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Fokus pada benefit utama (contoh: 'Bahan food grade aman untuk kesehatan').
                                                </p>
                                            </article>

                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Deskripsi</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
                
                                                <Input.FieldText
                                                    bind:value={newRecDescription}
                                                    onChange$={(_, element) => newRecDescription.value = element.value}
                                                    placeholder="cth: 'Bahan food grade aman untuk kesehatan.'"
                                                />
                                            </Input.Root>
                                        </section>

                                        <section>
                                            <Button
                                                variant="primary"
                                                size="small"
                                                onClick$={async () => {
                                                    await addFeature();
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
                                <Field name="tools_data.packaging">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 w-full max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Jenis kemasan produk. Contoh: 'Box kardus premium' atau 'Pouch kain'.
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
                                                    placeholder="cth: 'Box kardus premium' atau 'Pouch kain'."
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