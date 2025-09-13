import * as v from 'valibot';

export const PurchasedProductSchema = v.object({
    documentId: v.pipe(
        v.string()
    ),
    nama_produk: v.pipe(
        v.string()
    ),
    varian_kemasan: v.pipe(
        v.string()
    ),
    varian_harga: v.pipe(
        v.string()
    ),
    varian_berat: v.pipe(
        v.string()
    ),
    kuantitas: v.pipe(
        v.number()
    )
});

export const PurchasedRoastedBeanSchema = v.object({
    documentId: v.pipe(
        v.string()
    ),
    nama_produk: v.pipe(
        v.string()
    ),
    varian_kemasan: v.pipe(
        v.string()
    ),
    varian_harga: v.pipe(
        v.string()
    ),
    varian_berat: v.pipe(
        v.string()
    ),
    kuantitas: v.pipe(
        v.number()
    )
});


// export const PurchasedToolSchema = v.object({
//     documentId: v.pipe(
//         v.string()
//     ),
//     nama_produk: v.pipe(
//         v.string()
//     ),
//     harga: v.pipe(
//         v.string()
//     ),
//     kuantitas: v.pipe(
//         v.number()
//     )
// });

export const OrderSchema = v.object({
    nama_pembeli: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nama kamu')
    ),
    nomor_whatsapp: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nomor whatsapp kamu')
    ),
    alamat: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan alamat kamu')
    ),
    catatan_kurir: v.optional(
        v.pipe(
            v.string()
        )
    ),
    // nomor_resi: v.pipe(
    //     v.string()
    // ),
    // status_pesanan: v.pipe(
    //     v.string()
    // ),
    nama_layanan_pengiriman: v.pipe(
        v.string()
    ),
    biaya_pengiriman: v.pipe(
        v.string()
    ),
    // total_biaya: v.nullable(
    //     v.pipe(
    //         v.number()
    //     )
    // )
});

export const OrderRoastedBeanSchema = v.object({
    ...OrderSchema.entries,
    produk_yang_dibeli: v.array(
        PurchasedRoastedBeanSchema
    )
});

export const OrderToolSchema = v.object({
    ...OrderSchema.entries,
    produk_yang_dibeli: v.array(
        PurchasedProductSchema
    )
});

// export const CreateRoastedBeanOrderSchema = v.omit(OrderRoastedBeanSchema, [
//     'status_pesanan',
//     'nomor_resi',
//     'total_biaya'
// ]);

// export const CreateOrderSchema = v.omit(OrderRoastedBeanSchema, [
//     'status_pesanan',
//     'nomor_resi',
//     'total_biaya'
// ]);

export const ChangeOrderStatusSchema = v.object({
    id: v.pipe(
        v.number()
    ),
    status: v.pipe(
        v.string()
    )
});

export const ShippingSchema = v.object({
    id: v.pipe(v.number()),
    name: v.pipe(v.string()),
    cost: v.pipe(v.number())
});

// Schema for WhatsApp message data
export const SendOrderMessageSchema = v.object({
    id: v.pipe(v.number()),
    buyer_name: v.pipe(v.string()),
    whatsapp_number: v.pipe(v.number()), // Changed from number to string for formatting
    address: v.pipe(v.string()),
    courier_notes: v.nullable(v.string()),
    status: v.pipe(v.string()),
    tracking_number: v.pipe(v.string()),
    shipping_cost: v.pipe(v.number()),
    total_cost: v.nullable(v.number()),
    date: v.pipe(v.date()), // DateTime as string
    payment_method: v.pipe(v.string()),
    
    // Include purchased products
    purchasedProduct: v.array(PurchasedProductSchema),
    
    // Include shipping data (flattened from relation)
    shipping_data: ShippingSchema
});

// export type OrderForm = v.InferInput<typeof OrderSchema>;
// export type CreateOrderForm = v.InferInput<typeof CreateOrderSchema>;
// export type CreateOrderCustomerForm = v.InferInput<typeof CreateOrderSchema>;

export type ChangeOrderStatusForm = v.InferInput<typeof ChangeOrderStatusSchema>;

export type SendOrderMessageData = v.InferInput<typeof SendOrderMessageSchema>;

export type CreateRoastedBeanOrderForm = v.InferInput<typeof OrderRoastedBeanSchema>;
export type CreateToolOrderForm = v.InferInput<typeof OrderToolSchema>;