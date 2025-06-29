import {
    component$,
    useSignal,
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

// import InfoIcon from "~/assets/Icons/Info.png"
// import { Button } from "~/components/main/button";
import {
    routeLoader$,
    // routeLoader$,
    // useLocation
} from "@builder.io/qwik-city";
// import { getProductById } from "~/server/services/products";
// import { formatRupiah, isLocalhost } from "~/lib/utils";
import { Input } from "~/components/main/input";
import { Shipping } from "~/components/main/shipping";
import { getShipping } from "~/server/services/shipping";
import { TextField } from "~/components/main/text-field";

// import Keberlanjutan from "~/assets/Icons/Keberlanjutan.png";
// import Transparansi from "~/assets/Icons/Transparansi.png";
// import Inovasi from "~/assets/Icons/Inovasi.png";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

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

export const useShipping = routeLoader$(
    async ({ platform }) => {
        const shipping = await getShipping({ ...platform });

        if (shipping.data) {
            return shipping.data;
        }
    }
)

export default component$(() => {
    // const { value: product } = useProductDetail();
    const { value: shippings } = useShipping();
    const selectedShipping = useSignal(0);
    // console.info(shippings)
    // const loc = useLocation();

    return (
        <>
            <div class=" pt-[148px]" />

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

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
                                <Input.Root>
                                    <Input.Header>
                                        <Input.Label>Nama Lengkap</Input.Label>
                                    </Input.Header>
                                                    
                                    <Input.FieldText
                                        // {...props}
                                        // id={field.name}
                                        // name={field.name}
                                        // value={field.value}
                                        placeholder={`contoh: "Budi Santoso"`}
                                    />

                                    <Input.Message>
                                        <p class="text-red-500">
                                            {/* { field.error } */}
                                        </p>
                                    </Input.Message>
                                </Input.Root>

                                <Input.Root>
                                    <Input.Header>
                                        <Input.Label>Nomor Whatsapp Aktif</Input.Label>
                                    </Input.Header>
                                                    
                                    <Input.FieldText
                                        // {...props}
                                        // id={field.name}
                                        // name={field.name}
                                        // value={field.value}
                                        placeholder="081212345678"
                                    />

                                    <Input.Message>
                                        <p class="text-red-500">
                                            {/* { field.error } */}
                                        </p>
                                    </Input.Message>
                                </Input.Root>

                                <TextField.Root>
                                    <TextField.Header>
                                        <TextField.Label>Alamat Lengkap</TextField.Label>
                                    </TextField.Header>
                                                    
                                    <TextField.Field
                                        // {...props}
                                        // id={field.name}
                                        // name={field.name}
                                        // value={field.value}
                                        placeholder="contoh: Jl. Anggrek No. 56, RT 05/RW 02 Kel. Kebayoran Baru, Kec. Kebayoran Lama Jakarta Selatan 12240"
                                    />

                                    <TextField.Message>
                                        <p class="text-red-500">
                                            {/* { field.error } */}
                                        </p>
                                    </TextField.Message>
                                </TextField.Root>

                                <TextField.Root>
                                    <TextField.Header>
                                        <TextField.Label>Catatan Kurir</TextField.Label>
                                    </TextField.Header>
                                                    
                                    <TextField.Field
                                        // {...props}
                                        // id={field.name}
                                        // name={field.name}
                                        // value={field.value}
                                        placeholder="contoh: Simpan di depan pagar, terima dari jam 9-17 WIB"
                                    />

                                    {/* <Input.Message> */}
                                        {/* <p class="text-red-500"> */}
                                            {/* { field.error } */}
                                        {/* </p> */}
                                    {/* </Input.Message> */}
                                </TextField.Root>
                            </section>
                        </section>

                        <section class="flex flex-col gap-y-6">
                            <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-800">
                                Pilihan Ekspedisi
                            </h1>

                            <section class="flex flex-col gap-y-4">
                                {shippings?.map((shipping) => {
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
                                            <Shipping.Cost>{shipping.cost}</Shipping.Cost>
                                        </Shipping.Detail>
                                    </Shipping.Root>
                                    );
                                })}
                            </section>
                        </section>

                        <section class="flex flex-col gap-y-6">
                            <h1 class="font-lora font-medium text-h3-small sm:text-h3-medium lg:text-h3-large text-neutral-custom-800">
                                Ringkasan Pesanan
                            </h1>

                            
                        </section>
                    </section>

                </section>
            </div>

            <Separator />
        </>
    );
});