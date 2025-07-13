import * as v from 'valibot';

export const ReviewSchema = v.object({
    name: v.pipe(
        v.string(),
        v.nonEmpty('Nama tidak boleh kosong')
    ),
    location: v.pipe(
        v.string(),
        v.nonEmpty('Lokasi tidak boleh kosong')
    ),
    rating: v.pipe(
        v.number(),
        v.minValue(1, 'Rating minimal 1 bintang'),
        v.maxValue(5, 'Rating maksimal 5 bintang')
    ),
    content: v.pipe(
        v.string(),
        v.nonEmpty('Isi review tidak boleh kosong')
    )
});

export type CreateReviewForm = v.InferInput<typeof ReviewSchema>;