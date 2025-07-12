import {
    component$,
    useContext,
    useSignal,
    useTask$,
    // useVisibleTask$
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

// import InfoIcon from "~/assets/Icons/Info.png"
// import { Button } from "~/components/main/button";
import {
    routeLoader$
    // routeLoader$,
    // useLocation
} from "@builder.io/qwik-city";
// import { getProductById } from "~/server/services/products";
// import { formatRupiah, isLocalhost } from "~/lib/utils";
import { Input } from "~/components/main/input";
import { Shipping } from "~/components/main/shipping";
import { getShipping } from "~/server/services/shipping";
import { TextField } from "~/components/main/text-field";
import { formatRupiah } from "~/lib/utils";
import { OrderContext } from "~/context/order-context";

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
    CreateOrderForm, 
    CreateOrderSchema
    // OrderForm,
    // OrderSchema
} from "~/schema/order";
import { useCart } from "~/hooks/useCart";
import { IncreaseQuantity } from "~/assets/Icons/IncreaseQuantity";
import { DecreaseQuantity } from "~/assets/Icons/DecreaseQuantity";
import { Trash } from "~/assets/cms/icons/Trash";
import { Button } from "~/components/main/button";
import { createOrderCustomer } from "~/server/orders";

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

export const useOrderFormLoader = routeLoader$<InitialValues<CreateOrderForm>>(() => {
    return {
        buyer_name: '',
        whatsapp_number: '',
        address: '',
        courier_notes: '',
        shipping: {
            id: 0,
            name: '',
            cost: 0,
        },
        purchasedProduct: []
    };
});

export const useOrderFormAction = formAction$<CreateOrderForm>(
    async (values, event) => {
        await createOrderCustomer({ values, event })
        // console.info(values)
    },
    {
        validate: valiForm$(CreateOrderSchema),
        arrays: ['purchasedProduct'],
        numbers: [
            'shipping.id',
            'shipping.cost',
            'purchasedProduct.$.price',
            'purchasedProduct.$.quantity',
            'purchasedProduct.$.weight',
            'purchasedProduct.$.product_id'
        ]
    }
);

export const useShipping = routeLoader$(
    async ({ platform }) => {
        const shipping = await getShipping({ ...platform });

        return shipping.data;
    }
)

export default component$(() => {
    // const { value: product } = useProductDetail();
    const shippings = useShipping();
    const selectedShipping = useSignal(0);
    // const loc = useLocation();

    const [form, { Form, Field, FieldArray }] = useForm<CreateOrderForm>({
        loader: useOrderFormLoader(),
        action: useOrderFormAction(),
        fieldArrays: ['purchasedProduct']
    });

    const order = useContext(OrderContext);

    useTask$(({ track }) => {
        track(order);
        setValues(form, 'purchasedProduct', order.value);
    });

    const {
    //     // totalQuantity,
        totalPrice,
    //     items, // Mengembalikan Signal order itu sendiri sebagai 'items'
        incrementQuantity,
        decrementQuantity,
        removeItem
    } = useCart(order, form, selectedShipping, shippings);

    // useVisibleTask$(() => {
    //     const cart = localStorage.getItem('vroom-cart') as string;

    //     try {
    //         const parsedCart: OrderCartItems = JSON.parse(cart);

    //         if (parsedCart.length > 0) {
    //             setValues(form, "purchasedProduct", parsedCart)
    //         }
    //     } catch (error) {
    //         console.info("Error cart")
    //     }

        
    // });

    // console.info(order.value)

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
                                <Field name="buyer_name">
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

                                <Field name="whatsapp_number">
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

                                <Field name="address">
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

                                <Field name="courier_notes">
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

                                <Field name="shipping.id" type="number">
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

                                <Field name="shipping.name">
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

                                <Field name="shipping.cost" type="number">
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
                                            key={shipping.id}
                                            selected={selectedShipping.value === shipping.id}
                                            onClick$={() => {
                                                selectedShipping.value = shipping.id;
                                            }}
                                    >
                                        <Shipping.Logo src={shipping.logo} />

                                        <Shipping.Detail>
                                            <Shipping.Name>{shipping.name}</Shipping.Name>
                                            <Shipping.Cost>{formatRupiah(shipping.cost)}</Shipping.Cost>
                                        </Shipping.Detail>
                                    </Shipping.Root>
                                    );
                                })}
                            </section>

                            <Field name="shipping.id" type="number">
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
                                name="purchasedProduct"
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

                                    <hr class="border-[1px] border-primary-50 w-full" />

                                    <tbody class="flex flex-col gap-y-4 *:flex *:gap-x-6">
                                        {fieldArray.items.length > 0 ? (
                                            fieldArray.items.map((item, index) => (
                                                <tr
                                                    key={item}
                                                    class="*:font-normal *:text-left text-neutral-custom-700 *:py-1 *:px-3"
                                                >
                                                    <Field
                                                        name={`purchasedProduct.${index}.name`}
                                                    >
                                                        {(field, props) => (
                                                            <td class="min-w-[300px]">
                                                                { field.value }
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
                                                            name={`purchasedProduct.${index}.price`}
                                                            type="number"
                                                        >
                                                            {(field, props) => (
                                                                <td class="min-w-[200px]">
                                                                    { field.value ? formatRupiah(field.value) : null }
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
                                                            name={`purchasedProduct.${index}.quantity`}
                                                            type="number"
                                                        >
                                                            {(fieldQuantity, props) => (
                                                                <Field
                                                                    name={`purchasedProduct.${index}.product_id`}
                                                                    type="number"
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
                                                        name={`purchasedProduct.${index}.price`}
                                                        type="number"
                                                    >
                                                        {(fieldPrice) => (
                                                            <td class="min-w-[200px]">
                                                                <Field
                                                                    name={`purchasedProduct.${index}.quantity`}
                                                                    type="number"
                                                                >
                                                                    {(fieldQuantity) => (
                                                                        <p>
                                                                            { fieldPrice.value && fieldQuantity.value ? 
                                                                                formatRupiah(fieldPrice.value * fieldQuantity.value) : 
                                                                            null }

                                                                        </p>
                                                                    )}
                                                            
                                                                </Field>
                                                            </td>                                                        
                                                        )}
                                                    </Field>

                                                    <Field
                                                        name={`purchasedProduct.${index}.product_id`}
                                                        type="number"
                                                    >
                                                        {(field) => (
                                                            <td class="min-w-[150px] flex items-center gap-4">
                                                                <Trash class="cursor-pointer" onClick$={() => removeItem(field.value)} />             
                                                            </td>
                                                        )}
                                                    </Field>

                                                    <Field
                                                        name={`purchasedProduct.${index}.weight`}
                                                        type="number"
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

                                                    <Field
                                                        name={`purchasedProduct.${index}.type`}
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
                                            
                                    </tbody>
            
                                    <hr class="border-[1px] border-primary-50 w-full" />

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
                                            <Field name="shipping.cost" type="number">
                                                {(fieldCost: any) => (
                                                    <td>
                                                        {fieldCost.value ? (
                                                            <Field name="shipping.name">
                                                                {(fieldName: any) => (
                                                                    <p>
                                                                        {`${formatRupiah(fieldCost.value)} (${fieldName.value})`}
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
                                            <Field name="shipping.cost" type="number">
                                                {(field: any) => (
                                                    <td>{ formatRupiah(totalPrice.value + field.value) }</td>
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