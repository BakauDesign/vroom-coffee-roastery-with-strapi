import * as v from 'valibot';

export const ShippingSchema = v.object({
    name: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nama pengiriman')
    ),
    logo: v.any(),
    cost: v.pipe(
        v.number('Mohon masukan biaya pengiriman yang valid (harus angka).'),
        v.minValue(0, 'Biaya tidak boleh kurang dari 0.')
    ),
    status: v.pipe(
        v.boolean('Mohon pilih status pengiriman')
    )
});

export const ShippingLogoSchema = v.pipe(
    v.nullable(
        v.pipe(
            v.file(),
            v.mimeType(['image/jpeg', 'image/jpg', 'image/png', 'image/avif'], 'Mohon pilih gambar dengan format JPEG atau PNG.'),
            v.maxSize(1024 * 1024 * 5, 'Mohon pilih gambar berukuran kurang dari 5 MB.')
        )
    )
);

export type ShippingForm = v.InferInput<typeof ShippingSchema>;