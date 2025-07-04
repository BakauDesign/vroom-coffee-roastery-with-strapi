import { $, useComputed$, useTask$ } from '@builder.io/qwik';

import type { Signal } from "@builder.io/qwik";

import { setValues, setValue } from '@modular-forms/qwik';
import type { FormStore } from '@modular-forms/qwik';

import type { OrderCartItems } from "~/context/order-context";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { CreateOrderForm } from '~/schema/order';

interface ShippingItem {
    id: number;
    name: string;
    logo: string;
    cost: number;
}

export function useCart(
    order: Signal<OrderCartItems>,
    form: FormStore<CreateOrderForm>,
    selectedShipping: Signal<number>, // ID shipping yang dipilih
    shippings: Signal<ShippingItem[] | undefined>
) {
    // useComputed$ untuk menghitung total kuantitas secara reaktif
    const totalQuantity = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + item.quantity, 0);
    });

    // useComputed$ untuk menghitung total harga secara reaktif
    const totalPrice = useComputed$(() => {
        return order.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    });

    // Fungsi untuk menambah kuantitas
    const incrementQuantity = $((productId: number | null | undefined) => {
        if (productId === null || productId === undefined) {
            return;
        }

        const updatedItems = order.value.map(item => {
            if (item.product_id === productId) {
                return { ...item, quantity: item.quantity + 1 }; // Buat objek baru
            }
            return item;
        });
        order.value = updatedItems; // Ganti seluruh array Signal
    });

    // Fungsi untuk mengurangi kuantitas
    const decrementQuantity = $((productId: number | null | undefined) => {
        if (productId === null || productId === undefined) {
            return;
        }

        const updatedItems = order.value
            .map(item => {
                if (item.product_id === productId) {
                    return { ...item, quantity: item.quantity - 1 }; // Buat objek baru
                }
                return item;
            })
            .filter(item => item.quantity > 0); // Hapus item jika kuantitas <= 0

        order.value = updatedItems; // Ganti seluruh array Signal
    });

    // Fungsi untuk menghapus item
    const removeItem = $((productId: number | null | undefined) => {
        if (productId === null || productId === undefined) {
            return;
        }

        const updatedItems = order.value.filter(item => item.product_id !== productId);

        order.value = updatedItems; // Ganti seluruh array Signal
        localStorage.setItem('vroom-cart', JSON.stringify(updatedItems));
    });

    useTask$(({ track }) => {
        track(order);
        setValues(form, 'purchasedProduct', order.value);
    });

    useTask$(({ track }) => {
        const currentSelectedShippingId = track(selectedShipping);
        const currentShippings = track(shippings);

        if (currentSelectedShippingId !== 0 && currentShippings && currentShippings.length > 0) {
            const chosenShipping = currentShippings.find(
                (shipping) => shipping.id === currentSelectedShippingId
            );

            if (chosenShipping?.id) {
                setValue(form, 'shipping.id', chosenShipping.id);
                setValue(form, 'shipping.name', chosenShipping.name);
                setValue(form, 'shipping.cost', chosenShipping.cost);
            } else {
                setValue(form, 'shipping.id', 0);
                setValue(form, 'shipping.cost', 0);
            }
        } else {
            setValue(form, 'shipping.id', 0);
            setValue(form, 'shipping.cost', 0);
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