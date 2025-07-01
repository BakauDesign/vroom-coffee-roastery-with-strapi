import * as v from 'valibot';

export const PurchasedProductSchema = v.object({
    name: v.pipe(
        v.string()
    ),
    type: v.pipe(
        v.string()
    ),
    price: v.pipe(
        v.number()
    ),
    weight: v.pipe(
        v.number()
    ),
    quantity: v.pipe(
        v.number()
    ),
    product_id: v.optional(
        v.nullable(
            v.number()
        )
    )
});

export const OrderSchema = v.object({
    buyer_name: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nama kamu')
    ),
    whatsapp_number: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nomor whatsapp kamu')
    ),
    address: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan alamat kamu')
    ),
    courier_notes: v.optional(
        v.pipe(
            v.string()
        )
    ),
    status: v.pipe(
        v.string()
    ),
    tracking_number: v.pipe(
        v.string()
    ),
    shipping: v.object({
        id: v.pipe(
            v.number(),
            v.minValue(1, "Mohon pilih pengiriman")
        ),
        name: v.pipe(
            v.string()
        ),
        cost: v.pipe(
            v.number()
        )
    }),
    payment_method: v.pipe(
        v.string()
    ),
    purchasedProduct: v.array(
        PurchasedProductSchema
    )
});

export const CreateOrderSchema = v.omit(OrderSchema, [
    'status',
    'tracking_number',
    'payment_method'
]);

// export type OrderForm = v.InferInput<typeof OrderSchema>;
export type CreateOrderForm = v.InferInput<typeof CreateOrderSchema>;