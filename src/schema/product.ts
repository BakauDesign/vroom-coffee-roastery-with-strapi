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
    process: v.pipe(
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
    serving_recomendation: 
        v.array(
            ServingRecomendationSchema
        )
});

export const ProductSchema = v.object({
    name: v.pipe(
        v.string(),
        v.maxLength(28, 'Panjang maksimal 28 karakter'),
        v.nonEmpty('Mohon masukan nama produk')
    ),
    description: v.pipe(
        v.string(),
        v.maxLength(1000, 'Panjang maksimal 1000 karakter'),
        v.nonEmpty('Mohon masukan deskripsi produk')
    ),
    photo: v.any(),
    highlight: v.optional(
        v.nullable(
            v.pipe(
                v.string('Mohon masukan'),
                v.maxLength(45, 'Panjang maksimal 45 karakter')
            )
        )
    ),
    stock: v.pipe(
        v.number('Mohon masukan stok produk'),
        v.minValue(1, 'Stok produk minimal 1')
    ),
    discount: v.optional(
        v.nullable(
            v.pipe(
                v.number('Mohon masukan persentase diskon'),
                v.minValue(1, 'Persetase diskon minimal 1%')
            )
        )
    ),
    price: v.pipe(
        v.number('Mohon masukan harga produk'),
        v.minValue(1, 'Harga produk minimal 1')
    ),
    weight: v.pipe(
        v.number('Mohon masukan berat produk'),
        v.minValue(1, 'Berat produk minimal 1')
    )    
});

export const ProductPhotoSchema = v.pipe(
    v.nullable(
        v.pipe(
            v.file(),
            v.mimeType(['image/jpeg', 'image/jpg', 'image/png', 'image/avif'], 'Mohon pilih gambar dengan format JPEG atau PNG.'),
            v.maxSize(1024 * 1024 * 10, 'Mohon pilih gambar berukuran kurang dari 5 MB.')
        )
    )
);

export const RoastedBeansProductSchema = v.object({
    ...ProductSchema.entries,
    roasted_beans_data: RoastedBeansSchema
});
    

export type ProductForm = v.InferInput<typeof ProductSchema>;
export type RoastedBeansProductForm = v.InferInput<typeof RoastedBeansProductSchema>;