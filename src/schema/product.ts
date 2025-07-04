import * as v from 'valibot';

export const GreenBeansSchema = v.object({
    elevation: v.pipe(
        v.number('Mohon masukan ketinggian perkebunan'),
        v.minValue(1)
    ),
    variety: v.nullable(
        v.pipe(
            v.string('Mohon masukan varietas biji')
        )
    ),
    origin: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan asal geografis biji')
    ),
    process: v.nullable(
        v.pipe(
            v.string('Mohon masukan proses biji')
        )
    ),
    moisture_content: v.nullable(
        v.pipe(
            v.number('Mohon masukan moisture content biji')
        )
    ),
    density: v.nullable(
        v.pipe(
            v.number('Mohon masukan densitas biji')
        )
    ),
    defect: v.nullable(
        v.pipe(
            v.string('Mohon masukan defect biji'),
        )
    ),
    screen_size: v.nullable(
        v.pipe(
            v.number('Mohon masukan ukuran saringan biji')
        )
    ),
    
    roast_level: v.nullable(
        v.pipe(
            v.string('Mohon masukan potensi roast')
        )
    ),
    flavor_description: v.nullable(
        v.pipe(
            v.string('Mohon masukan deskripsi rasa')
        )
    ),

    water_activity: v.nullable(
        v.pipe(
            v.number('Mohon masukan water activity')
        )
    ),
    quakers: v.nullable(
        v.pipe(
            v.number('Mohon masukan quaker per sample')
        )
    ),
    cupping_potential: v.nullable(
        v.pipe(
            v.number('Mohon masukan potensi skor cupping')
        )
    )
});

export const ServingRecomendationSchema = v.object({
    id: v.optional(
        v.nullable(
            v.number()
        )
    ),
    name: v.pipe(
        v.string(),
        v.maxLength(20, 'Nama penyajian maksimal 20 karakter'),
        v.nonEmpty('Mohon masukan nama rekomendasi penyajian')
    ),
    description: v.pipe(
        v.string(),
        v.maxLength(100, 'Nama penyajian maksimal 50 karakter'),
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
    testNotes: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan metode test notes')
    ),
    packaging: v.pipe(
        v.string(),
        v.nonEmpty('Mohon jenis kemasan')
    ),
    serving_recomendation: v.array(
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
    photoFile: v.any(),
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
            v.file('Mohon pilih gambar dengan format JPEG atau PNG.'),
            v.mimeType(['image/jpeg', 'image/jpg', 'image/png', 'image/avif'], 'Mohon pilih gambar dengan format JPEG atau PNG.'),
            v.maxSize(1024 * 1024 * 10, 'Mohon pilih gambar berukuran kurang dari 5 MB.')
        )
    )
);

export const RoastedBeansProductSchema = v.object({
    ...ProductSchema.entries,
    roasted_beans_data: RoastedBeansSchema
});

export const RoastedBeansProductEditSchema = v.object({
     ...ProductSchema.entries,
    roasted_beans_data: RoastedBeansSchema
});

export const GreenBeansProductSchema = v.object({
    ...ProductSchema.entries,
    green_beans_data: GreenBeansSchema
});

export type ProductForm = v.InferInput<typeof ProductSchema>;

export type RoastedBeansProductForm = v.InferInput<typeof RoastedBeansProductSchema>;
export type RoastedBeansProductEditForm = v.InferInput<typeof RoastedBeansProductSchema>

export type GreenBeansProductForm = v.InferInput<typeof GreenBeansProductSchema>;