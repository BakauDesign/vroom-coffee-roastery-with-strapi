import { CreateOrderCustomerForm } from "~/schema/order";

import { getDB } from "~/lib/db";
import type { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";

interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

export async function createOrderCustomer({
    values,
    event,
}: ActionParams<CreateOrderCustomerForm>) {
    const { platform, redirect } = event;

    const db = await getDB(platform.env);

    try {
        const totalCost = values.purchasedProduct.reduce((accumulator, currentProduct) => {
            return accumulator + (currentProduct.price * currentProduct.quantity);
        }, 0);

        const orderData = {
            buyer_name: values.buyer_name,
            whatsapp_number: parseInt(values.whatsapp_number),
            address: values.address,
            courier_notes: values.courier_notes,
            status: "Menunggu Konfirmasi",
            tracking_number: '',
            payment_method: "Transfer Bank",
            shipping_cost: values.shipping.cost,
            total_cost: totalCost,

            shipping_id: values.shipping.id
        }

        const newOrder = await db.order.create({
            data: orderData
        });

        if (!newOrder) {
            return;
        }

        const purchasedProductsData = values.purchasedProduct.map(pr => ({
            name: pr.name,
            type: pr.type,
            price: pr.price,
            weight: pr.weight,
            quantity: pr.quantity,
            order_id: newOrder.id,
            product_id: pr.product_id
        }));

        if (purchasedProductsData.length > 0) {
            await db.purchased_Product.createMany({ data: purchasedProductsData });
        }

        redirect(301, "/products/orders/success");

        return {
            success: true,
            message: "Order berhasil ditambahkan!"
        };

    } catch (error: any) {
        redirect(301, "/products/orders/error");

        return {
            success: false,
            message: error.message || "Gagal menambahkan Order",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
}

export async function getOrders({
    event,
}: LoaderParams) {
    const { platform } = event;

    const db = await getDB(platform.env);

    try {
        const orders = await db.order.findMany({
            include: {
                purchasedProduct: true,
                shipping_data: true
            }
        });

        orders

        return {
            success: true,
            data: orders,
            message: "Order berhasil diambil!"
        };

    } catch (error: any) {
        console.error("Error creating Order", error);
        return {
            success: false,
            orders: [],
            message: error.message || "Gagal menambahkan Order",
            errors: {
                general: (error.meta?.cause || error.message || 'Terjadi kesalahan tidak dikenal.') as string
            }
        };
    }
}