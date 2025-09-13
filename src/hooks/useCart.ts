import { $, useComputed$, useTask$ } from '@builder.io/qwik';

import type { Signal } from "@builder.io/qwik";

import { setValues, setValue } from '@modular-forms/qwik';
import type { FormStore } from '@modular-forms/qwik';

import type { OrderRoastedBeanCartItems, OrderToolCartItems } from "~/context/order-context";
import type { Shipping } from '~/interfaces';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateRoastedBeanOrderForm, CreateToolOrderForm } from '~/schema/order';

// export function useCart(
//     order: Signal<OrderCartItems>,
//     form: FormStore<CreateOrderForm>,
//     selectedShipping: Signal<number>, // ID shipping yang dipilih
//     shippings: Signal<ShippingItem[] | undefined>
// ) {
//     // useComputed$ untuk menghitung total kuantitas secara reaktif
//     const totalQuantity = useComputed$(() => {
//         return order.value.reduce((sum, item) => sum + item.quantity, 0);
//     });

//     // useComputed$ untuk menghitung total harga secara reaktif
//     const totalPrice = useComputed$(() => {
//         return order.value.reduce((sum, item) => sum + (item.variant_price * item.quantity), 0);
//     });

//     // Fungsi untuk menambah kuantitas
//     const incrementQuantity = $((productId: number | null | undefined) => {
//         if (productId === null || productId === undefined) {
//             return;
//         }

//         const updatedItems = order.value.map(item => {
//             if (item.product_id === productId) {
//                 return { ...item, quantity: item.quantity + 1 }; // Buat objek baru
//             }
//             return item;
//         });
//         order.value = updatedItems; // Ganti seluruh array Signal
//         localStorage.setItem('vroom-cart', JSON.stringify(updatedItems));
//     });

//     // Fungsi untuk mengurangi kuantitas
//     const decrementQuantity = $((productId: number | null | undefined) => {
//         if (productId === null || productId === undefined) {
//             return;
//         }

//         const updatedItems = order.value
//             .map(item => {
//                 if (item.product_id === productId) {
//                     return { ...item, quantity: item.quantity - 1 }; // Buat objek baru
//                 }
//                 return item;
//             })
//             .filter(item => item.quantity > 0); // Hapus item jika kuantitas <= 0

//         order.value = updatedItems; // Ganti seluruh array Signal
//         localStorage.setItem('vroom-cart', JSON.stringify(updatedItems));
//     });

//     // Fungsi untuk menghapus item
//     const removeItem = $((productId: number | null | undefined) => {
//         if (productId === null || productId === undefined) {
//             return;
//         }

//         const updatedItems = order.value.filter(item => item.product_id !== productId);

//         order.value = updatedItems; // Ganti seluruh array Signal
//         localStorage.setItem('vroom-cart', JSON.stringify(updatedItems));
//     });

//     useTask$(({ track }) => {
//         track(order);
//         setValues(form, 'purchasedProduct', order.value);
//     });

//     useTask$(({ track }) => {
//         const currentSelectedShippingId = track(selectedShipping);
//         const currentShippings = track(shippings);

//         if (currentSelectedShippingId !== 0 && currentShippings && currentShippings.length > 0) {
//             const chosenShipping = currentShippings.find(
//                 (shipping) => shipping.id === currentSelectedShippingId
//             );

//             if (chosenShipping?.id) {
//                 setValue(form, 'shipping.id', chosenShipping.id);
//                 setValue(form, 'shipping.name', chosenShipping.name);
//                 setValue(form, 'shipping.cost', chosenShipping.cost);
//             } else {
//                 setValue(form, 'shipping.id', 0);
//                 setValue(form, 'shipping.cost', 0);
//             }
//         } else {
//             setValue(form, 'shipping.id', 0);
//             setValue(form, 'shipping.cost', 0);
//         }
//     });

//     return {
//         totalQuantity,
//         totalPrice,
//         items: order,
//         incrementQuantity,
//         decrementQuantity,
//         removeItem
//     };
// }

export function useRoastedBeanCart(
    order: Signal<OrderRoastedBeanCartItems>,
    form: FormStore<CreateRoastedBeanOrderForm>,
    selectedShipping: Signal<string>, // ID shipping yang dipilih
    shippings: Signal<Shipping[] | undefined>
) {
    // useComputed$ untuk menghitung total kuantitas secara reaktif
    const totalQuantity = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + item.kuantitas, 0);
    });

    // useComputed$ untuk menghitung total harga secara reaktif
    const totalPrice = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + (parseInt(item.varian_harga || "0") * item.kuantitas), 0);
    });

    // Fungsi untuk menambah kuantitas
    const incrementQuantity = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value.map(item => {
            if (item.documentId === documentId) {
                return { ...item, kuantitas: item.kuantitas + 1 }; // Buat objek baru
            }
            return item;
        });
        order.value = updatedItems; // Ganti seluruh array Signal
        localStorage.setItem('vroom-roasted-bean-cart', JSON.stringify(updatedItems));
    });

    // Fungsi untuk mengurangi kuantitas
    const decrementQuantity = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value
            .map(item => {
                if (item.documentId === documentId) {
                    return { ...item, kuantitas: item.kuantitas - 1 }; // Buat objek baru
                }
                return item;
            })
            .filter(item => item.kuantitas > 0); // Hapus item jika kuantitas <= 0

        order.value = updatedItems; // Ganti seluruh array Signal
        localStorage.setItem('vroom-roasted-bean-cart', JSON.stringify(updatedItems));
    });

    // Fungsi untuk menghapus item
    const removeItem = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value.filter(item => item.documentId !== documentId);

        order.value = updatedItems;
        localStorage.setItem('vroom-roasted-bean-cart', JSON.stringify(updatedItems));
    });

    useTask$(({ track }) => {
        track(order);
        setValues(form, 'produk_yang_dibeli', order.value);
    });

    useTask$(({ track }) => {
        const currentSelectedShipping = track(selectedShipping);
        const currentShippings = track(shippings);

        if (currentSelectedShipping !== '' && currentShippings && currentShippings.length > 0) {
            const chosenShipping = currentShippings.find(
                (shipping) => shipping.documentId === currentSelectedShipping
            );

            if (chosenShipping?.documentId) {
                setValue(form, 'nama_layanan_pengiriman', chosenShipping.nama);
                setValue(form, 'biaya_pengiriman', chosenShipping.biaya);
            } else {
                setValue(form, 'nama_layanan_pengiriman', '0');
                setValue(form, 'biaya_pengiriman', '0');
            }
        } else {
            setValue(form, 'nama_layanan_pengiriman', '0');
            setValue(form, 'biaya_pengiriman', '0');
        }
    });

    return {
        totalQuantity,
        totalPrice,
        items: order,
        incrementQuantity,
        decrementQuantity,
        removeItem
    };
}

export function useToolCart(
    order: Signal<OrderToolCartItems>,
    form: FormStore<CreateToolOrderForm>,
    selectedShipping: Signal<string>, // ID shipping yang dipilih
    shippings: Signal<Shipping[] | undefined>
) {
    // useComputed$ untuk menghitung total kuantitas secara reaktif
    const totalQuantity = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + item.kuantitas, 0);
    });

    // useComputed$ untuk menghitung total harga secara reaktif
    const totalPrice = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + (parseInt(item.varian_harga || "0") * item.kuantitas), 0);
    });

    // Fungsi untuk menambah kuantitas
    const incrementQuantity = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value.map(item => {
            if (item.documentId === documentId) {
                return { ...item, kuantitas: item.kuantitas + 1 }; // Buat objek baru
            }
            return item;
        });
        order.value = updatedItems; // Ganti seluruh array Signal
        localStorage.setItem('vroom-tool-cart', JSON.stringify(updatedItems));
    });

    // Fungsi untuk mengurangi kuantitas
    const decrementQuantity = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value
            .map(item => {
                if (item.documentId === documentId) {
                    return { ...item, kuantitas: item.kuantitas - 1 }; // Buat objek baru
                }
                return item;
            })
            .filter(item => item.kuantitas > 0); // Hapus item jika kuantitas <= 0

        order.value = updatedItems; // Ganti seluruh array Signal
        localStorage.setItem('vroom-tool-cart', JSON.stringify(updatedItems));
    });

    // Fungsi untuk menghapus item
    const removeItem = $((documentId: string | null | undefined) => {
        if (documentId === null || documentId === undefined) {
            return;
        }

        const updatedItems = order.value.filter(item => item.documentId !== documentId);

        order.value = updatedItems;
        localStorage.setItem('vroom-tool-cart', JSON.stringify(updatedItems));
    });

    useTask$(({ track }) => {
        track(order);
        setValues(form, 'produk_yang_dibeli', order.value);
    });

    useTask$(({ track }) => {
        const currentSelectedShipping = track(selectedShipping);
        const currentShippings = track(shippings);

        if (currentSelectedShipping !== '' && currentShippings && currentShippings.length > 0) {
            const chosenShipping = currentShippings.find(
                (shipping) => shipping.documentId === currentSelectedShipping
            );

            if (chosenShipping?.documentId) {
                setValue(form, 'nama_layanan_pengiriman', chosenShipping.nama);
                setValue(form, 'biaya_pengiriman', chosenShipping.biaya);
            } else {
                setValue(form, 'nama_layanan_pengiriman', '0');
                setValue(form, 'biaya_pengiriman', '0');
            }
        } else {
            setValue(form, 'nama_layanan_pengiriman', '0');
            setValue(form, 'biaya_pengiriman', '0');
        }
    });

    return {
        totalQuantity,
        totalPrice,
        items: order,
        incrementQuantity,
        decrementQuantity,
        removeItem
    };
}