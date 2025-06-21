import * as v from 'valibot';

export const ServingRecomendationSchema = v.object({
    name: v.pipe(
        v.string(),
        v.maxLength(20, 'Nama penyajian maksimal 20 karakter'),
        v.nonEmpty('Mohon masukan nama rekomendasi penyajian')
    ),
    description: v.pipe(
        v.string(),
        v.maxLength(50, 'Nama penyajian maksimal 50 karakter'),
        v.nonEmpty('Mohon masukan deskripsi rekomendasi penyajian')
    )
});

export const RoastedBeansSchema = v.object({
    origin: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan asal geografis biji')
    ),
    proess: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan metode pengolahan biji')
    ),
    testNotes: v.optional(
        v.pipe(
            v.string(),
            v.nonEmpty('Mohon masukan metode pengolahan biji')
        )
    ),
    packaging: v.pipe(
        v.string(),
        v.nonEmpty('Mohon jenis kemasan')
    ),
    serving_recomendation: v.optional(
        v.array(
            ServingRecomendationSchema
        )
    )
});

export const ProductSchema = v.object({
    name: v.pipe(
        v.string(),
        v.maxLength(28),
        v.nonEmpty('Mohon masukan nama produk')
    ),
    description: v.pipe(
        v.string(),
        v.maxLength(1000),
        v.nonEmpty('Mohon masukan deskripsi produk')
    ),
    photo: v.any(),
    highlight: v.optional(
        v.pipe(
            v.string(),
            v.maxLength(45)
        )
    ),
    stock: v.pipe(
        v.number(),
        v.minValue(1)
    ),
    discount: v.optional(
        v.pipe(
            v.number(),
            v.minValue(1)
        )
    ),
    discountPrice: v.optional(
        v.pipe(
            v.number(),
            v.minValue(1)
        )
    ),
    weight: v.pipe(
        v.number('Mohon masukan berat produk'),
        v.minValue(1)
    ),
    is_active: v.pipe(
        v.boolean()
    ),
    type: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan jenis produk'),
        v.union([
            v.literal('roasted-coffee-beans'),
            v.literal('green-coffee-beans'),
            v.literal('coffee-tools')
        ], 'Jenis produk tidak valid')
    ),
    roasted_beans_data: v.optional(RoastedBeansSchema),
});

export type ProductForm = v.InferInput<typeof ProductSchema>;