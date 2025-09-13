
import {
    component$,
    useContext,
    useSignal,
    useTask$
} from "@builder.io/qwik";

import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import {
    routeLoader$
    // routeLoader$,
    // useLocation
} from "@builder.io/qwik-city";

import { Input } from "~/components/main/input";
import { Shipping } from "~/components/main/shipping";
import { getShipping } from "~/server/services/shippings";
import { TextField } from "~/components/main/text-field";
import { formatRupiah } from "~/lib/utils";
import { OrderRoastedBeanContext } from "~/context/order-context";

import {
    formAction$,
    useForm,
    valiForm$,
    setValues
} from "@modular-forms/qwik";

import type {
    InitialValues
} from "@modular-forms/qwik";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    CreateRoastedBeanOrderForm,
    OrderRoastedBeanSchema
} from "~/schema/order";
import { useRoastedBeanCart } from "~/hooks/useCart";
import { IncreaseQuantity } from "~/assets/Icons/IncreaseQuantity";
import { DecreaseQuantity } from "~/assets/Icons/DecreaseQuantity";
import { Trash } from "~/assets/cms/icons/Trash";
import { Button } from "~/components/main/button";
import { createRoastedBeansOrder } from "~/server/orders";

// export const useProductDetail = routeLoader$(
//     async (event) => {
//         const { params, redirect } = event;

//         const productId = parseInt(params.id);

//         const result = await getProductById({
//             productId,
//             event,
//             options: "Roasted Coffee Beans"
//         });

//         if (!result?.data) {
//             throw redirect(302, "/products/roasted-coffee-beans");
//         }

//         return result.data;
//     }
// )

export const useOrderFormLoader = routeLoader$<InitialValues<CreateRoastedBeanOrderForm>>(() => {
    return {
        nama_pembeli: '',
        nomor_whatsapp: '',
        alamat: '',
        catatan_kurir: '',
        nama_layanan_pengiriman: '',
        biaya_pengiriman: '',
        produk_yang_dibeli: []
    };
});

export const useOrderFormAction = formAction$<CreateRoastedBeanOrderForm>(
    async (values, event) => {
        await createRoastedBeansOrder({ values, event });
    },
    {
        validate: valiForm$(OrderRoastedBeanSchema),
        arrays: ['produk_yang_dibeli']
    }
);

export const useShipping = routeLoader$(
    async (event) => {
        const shipping = await getShipping({ is_active: true, event });
        return shipping.data;
    }
)

export default component$(() => {
    const shippings = useShipping();
    const selectedShipping = useSignal('');

    const [form, { Form, Field, FieldArray }] = useForm<CreateRoastedBeanOrderForm>({
        loader: useOrderFormLoader(),
        action: useOrderFormAction(),
        fieldArrays: ['produk_yang_dibeli']
    });

    const order = useContext(OrderRoastedBeanContext);

    useTask$(({ track }) => {
        track(order);
        setValues(form, 'produk_yang_dibeli', order.value);
    });

    // console.info('nama_pembeli: ', getValue(form, 'nama_pembeli'));
    // console.info('nomor_whatsapp: ', getValue(form, 'nomor_whatsapp'));
    // console.info('alamat', getValue(form, 'alamat'));
    // console.info('nama_layanan_pengiriman', getValue(form, 'nama_layanan_pengiriman'));
    // console.info('biaya_pengiriman', getValue(form, 'biaya_pengiriman'));
    // console.info('produk_yang_dibeli', getValues(form, 'produk_yang_dibeli'))

    const {
        totalPrice,
        incrementQuantity,
        decrementQuantity,
        removeItem
    } = useRoastedBeanCart(order, form, selectedShipping, shippings);

    return (
        <>
            <div class=" pt-[148px]" />

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <Form>
                <section class="general-section gap-y-6 items-center">
                    <label class="flex flex-col gap-4">
                        <h1 class="font-lora font-medium text-neutral-custom-950 text-h2-small sm:text-h2-medium lg:text-h2-large">
                            Pesanan Anda
                        </h1>

                        <p class="font-work-sans text-neutral-custom-700 text-body-small sm:text-body-medium">
                            Silakan cek kembali pesanan sebelum melakukan pembayaran manual.
                        </p>
                    </label>

                    <div class="bg-neutral-200 h-[1.5px] w-full" />

                    <section class="grid grid-cols-2 gap-[60px]">
                        <section class="flex flex-col gap-y-6">
                            <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-800">
                                Detail Informasi Customer
                            </h1>

                            <section class="flex flex-col gap-y-4">
                                <Field name="nama_pembeli">
                                    {(field: any, props: any) => (
                                        <Input.Root>
                                            <Input.Header>
                                                <Input.Label>Nama Lengkap</Input.Label>
                                            </Input.Header>
                                                            
                                            <Input.FieldText
                                                {...props}
                                                id={field.name}
                                                name={field.name}
                                                value={field.value}
                                                placeholder={`contoh: "Budi Santoso"`}
                                            />

                                            <Input.Message>
                                                <p class="text-red-500">
                                                    { field.error }
                                                </p>
                                            </Input.Message>
                                        </Input.Root>
                                    )}
                                </Field>

                                <Field name="nomor_whatsapp">
                                    {(field: any, props: any) => (
                                        <Input.Root>
                                            <Input.Header>
                                                <Input.Label>Nomor Whatsapp Aktif (Tanpa Nol)</Input.Label>
                                            </Input.Header>
                                                            
                                            <Input.FieldText
                                                {...props}
                                                id={field.name}
                                                name={field.name}
                                                value={field.value}
                                                placeholder="contoh: 81212345678"
                                            />

                                            <Input.Message>
                                                <p class="text-red-500">
                                                    { field.error }
                                                </p>
                                            </Input.Message>
                                        </Input.Root>
                                    )}
                                </Field>

                                <Field name="alamat">
                                    {(field: any, props: any) => (
                                        <TextField.Root>
                                            <TextField.Header>
                                                <TextField.Label>Alamat Lengkap</TextField.Label>
                                            </TextField.Header>
                                                            
                                            <TextField.Field
                                                {...props}
                                                id={field.name}
                                                name={field.name}
                                                value={field.value}
                                                placeholder="contoh: Jl. Anggrek No. 56, RT 05/RW 02 Kel. Kebayoran Baru, Kec. Kebayoran Lama Jakarta Selatan 12240"
                                            />

                                            <TextField.Message>
                                                <p class="text-red-500">
                                                    { field.error }
                                                </p>
                                            </TextField.Message>
                                        </TextField.Root>
                                    )}
                                </Field>

                                <Field name="catatan_kurir">
                                    {(field: any, props: any) => (
                                        <TextField.Root>
                                            <TextField.Header>
                                                <TextField.Label>Catatan Kurir</TextField.Label>
                                                <TextField.Option>Opsional</TextField.Option>
                                            </TextField.Header>
                                                            
                                            <TextField.Field
                                                {...props}
                                                id={field.name}
                                                name={field.name}
                                                value={field.value}
                                                placeholder="contoh: Simpan di depan pagar, terima dari jam 9-17 WIB"
                                            />

                                            <Input.Message>
                                                <p class="text-red-500">
                                                    { field.error }
                                                </p>
                                            </Input.Message>
                                        </TextField.Root>
                                    )}
                                </Field>

                                <Field name="nama_layanan_pengiriman">
                                    {(field: any, props: any) => (
                                        <input
                                            type="hidden"
                                            {...props}
                                            id={field.name}
                                            name={field.name}
                                            value={field.value}
                                        />
                                    )}
                                </Field>

                                <Field name="biaya_pengiriman">
                                    {(field: any, props: any) => (
                                        <input
                                            type="hidden"
                                            {...props}
                                            id={field.name}
                                            name={field.name}
                                            value={field.value}
                                        />
                                    )}
                                </Field>
                            </section>
                        </section>

                        <section class="flex flex-col gap-y-6">
                            <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-800">
                                Pilihan Ekspedisi
                            </h1>

                            <section class="grid grid-cols-2 gap-4">
                                {shippings.value.map((shipping) => {
                                    return (
                                        <Shipping.Root
                                            key={shipping.documentId}
                                            selected={selectedShipping.value === shipping.documentId}
                                            onClick$={() => {
                                                selectedShipping.value = shipping.documentId;
                                            }}
                                    >
                                        <Shipping.Logo src={shipping.logo.url} />

                                        <Shipping.Detail>
                                            <Shipping.Name>{shipping.nama}</Shipping.Name>
                                            <Shipping.Cost>{formatRupiah(parseInt(shipping.biaya || "0"))}</Shipping.Cost>
                                        </Shipping.Detail>
                                    </Shipping.Root>
                                    );
                                })}
                            </section>

                            <Field name="nama_layanan_pengiriman">
                                {(field: any) => (
                                    <p class="text-red-500 text-2xl">
                                        { field.error }
                                    </p>
                                )}
                            </Field>
                        </section>
                    </section>

                    <section class="flex flex-col gap-y-6">
                            <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-800">
                                Ringkasan Pesanan
                            </h1>

                            <FieldArray
                                name="produk_yang_dibeli"
                            >
                                {(fieldArray) => (
                                    <table
                                    class="flex flex-col gap-y-3 font-work-sans text-body-small sm:text-body-medium"
                                >
                                    <thead>
                                        <tr class="flex gap-x-6 *:font-normal *:text-left text-neutral-custom-700 *:py-1 *:px-3">
                                            <th class="min-w-[300px]">Produk</th>
                                            <th class="min-w-[200px]">Harga Satuan</th>
                                            <th class="min-w-[150px]">Kuantitas</th>
                                            <th class="min-w-[200px]">Subtotal</th>
                                        </tr>
                                    </thead>


                                    <tbody class="flex flex-col gap-y-4 *:flex *:gap-x-6">
                                        <hr class="border-[1px] border-primary-50 w-full" />
                                        
                                        {fieldArray.items.length > 0 ? (
                                            fieldArray.items.map((item, index) => (
                                                <tr
                                                    key={item}
                                                    class="*:font-normal *:text-left text-neutral-custom-700 *:py-1 *:px-3"
                                                >
                                                    <Field
                                                        name={`produk_yang_dibeli.${index}.nama_produk`}
                                                    >
                                                        {(fieldNama) => (
                                                        <>
                                                            <Field
                                                                name={`produk_yang_dibeli.${index}.varian_kemasan`}
                                                            >
                                                                {(fieldKemeasan, props) => (
                                                                    <td class="min-w-[300px] max-w-[300px]">
                                                                        { `${fieldNama.value} - ${fieldKemeasan.value}gr` }
                                                                        <input
                                                                            type="hidden"
                                                                            {...props}
                                                                            id={fieldNama.name}
                                                                            name={fieldNama.name}
                                                                            value={fieldNama.value}
                                                                            />
                                                                    </td>          
                                                                )}                                              
                                                            </Field>
                                                        </>
                                                        )}
                                                    </Field>

                                                    <Field
                                                            name={`produk_yang_dibeli.${index}.varian_harga`}
                                                        >
                                                            {(field, props) => (
                                                                <td class="min-w-[200px]">
                                                                    { field.value ? formatRupiah(parseInt(field.value || "0")) : null }
                                                                    <input
                                                                        type="hidden"
                                                                        {...props}
                                                                        id={field.name}
                                                                        name={field.name}
                                                                        value={field.value}
                                                                    />
                                                                </td>                                                        
                                                            )}
                                                    </Field>

                                                    <Field
                                                            name={`produk_yang_dibeli.${index}.kuantitas`}
                                                            type="number"
                                                        >
                                                            {(fieldQuantity, props) => (
                                                                <Field
                                                                    name={`produk_yang_dibeli.${index}.documentId`}
                                                                >
                                                                    {(fieldProductId) => (
                                                                        <td class="min-w-[150px] flex items-center gap-4">
                                                                            <DecreaseQuantity onClick$={() => decrementQuantity(fieldProductId.value)} />
                                                                            <p>{ fieldQuantity.value }</p>
                                                                            <IncreaseQuantity onClick$={() => incrementQuantity(fieldProductId.value)} />
                                                                            <input
                                                                                type="hidden"
                                                                                {...props}
                                                                                id={fieldQuantity.name}
                                                                                name={fieldQuantity.name}
                                                                                value={fieldQuantity.value}
                                                                            />
                                                                        </td>                                                        
                                                                    )}
                                                                </Field>
                                                            )}
                                                    </Field>

                                                    <Field
                                                        name={`produk_yang_dibeli.${index}.varian_harga`}
                                                    >
                                                        {(fieldPrice) => (
                                                            <td class="min-w-[200px]">
                                                                <Field
                                                                    name={`produk_yang_dibeli.${index}.kuantitas`}
                                                                    type="number"
                                                                >
                                                                    {(fieldQuantity) => (
                                                                        <p>
                                                                            { fieldPrice.value && fieldQuantity.value ? 
                                                                                formatRupiah(parseInt(fieldPrice.value || "0") * fieldQuantity.value) : 
                                                                            null }

                                                                        </p>
                                                                    )}
                                                            
                                                                </Field>
                                                            </td>                                                        
                                                        )}
                                                    </Field>

                                                    <Field
                                                        name={`produk_yang_dibeli.${index}.documentId`}
                                                    >
                                                        {(field) => (
                                                            <td class="min-w-[150px] flex items-center gap-4">
                                                                <Trash class="cursor-pointer" onClick$={() => removeItem(field.value)} />             
                                                            </td>
                                                        )}
                                                    </Field>

                                                    <Field
                                                        name={`produk_yang_dibeli.${index}.varian_berat`}
                                                    >
                                                        {(field, props) => (
                                                            <input
                                                                type="hidden"
                                                                {...props}
                                                                id={field.name}
                                                                name={field.name}
                                                                value={field.value}
                                                            />
                                                        )}
                                                    </Field>
                                                    </tr>
                                            ))
                                        ) : null}
                                            
                                        <hr class="border-[1px] border-primary-50 w-full" />
                                    </tbody>
            

                                    <tfoot class="*:*:font-normal *:text-left text-neutral-custom-700 *:flex *:gap-x-6 *:*:py-1 *:*:px-3 *:*:first:min-w-[698px]">
                                        <tr>
                                            <td class="font-lora">
                                                Total Pesanan
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Subtotal</th>
                                            <td>{ formatRupiah(totalPrice.value) }</td>
                                        </tr>

                                        <tr>
                                            <th>Ongkir</th>
                                            <Field name="biaya_pengiriman">
                                                {(fieldCost) => (
                                                    <td>
                                                        {fieldCost.value ? (
                                                            <Field name="nama_layanan_pengiriman">
                                                                {(fieldName) => (
                                                                    <p>
                                                                        {selectedShipping.value ? (
                                                                            `${formatRupiah(parseInt(fieldCost.value || "0"))} ${fieldName.value ? fieldName.value : "-"}`
                                                                        ) : ("-")
                                                                        }
                                                                    </p>
                                                                )}
                                                            </Field>
                                                        ) : (
                                                            "-"
                                                        )}
                                                    </td>
                                                )}
                                            </Field>
                                        </tr>

                                        <tr>
                                            <th>Total Tagihan</th>
                                            <Field name="biaya_pengiriman">
                                                {(field) => (
                                                    <td>{ formatRupiah(totalPrice.value + parseInt(field.value || "0")) }</td>
                                                )}
                                            </Field>
                                        </tr>
                                    </tfoot>
                                    </table>
                                )}
                            </FieldArray>
                            
                            <section>
                                <Button
                                    variant="primary"
                                    size="small"
                                    type="submit"
                                >
                                    Konfirmasi & Proses Pesanan
                                </Button>
                            </section>
                    </section>
                </section>
                </Form>
            </div>

            <Separator />
        </>
    );
});