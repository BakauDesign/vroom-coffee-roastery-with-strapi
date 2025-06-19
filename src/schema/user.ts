import * as v from 'valibot';

export const UserSchema = v.object({
    name: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan nama kamu')
    ),
    username: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan username kamu')
    ),
    avatar: v.any(),
    role: v.pipe(
        v.string(),
        v.nonEmpty('Mohon pilih role kamu')
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan password kamu'),
        v.minLength(18, 'Panjang password harus 18 karakter atau lebih'),
    ),
});

export const UserAvatarSchema = v.pipe(
    v.nullable(
        v.pipe(
            v.file(),
            v.mimeType(['image/jpeg', 'image/jpg', 'image/png', 'image/avif'], 'Mohon pilih gambar dengan format JPEG atau PNG.'),
            v.maxSize(1024 * 1024 * 10, 'Mohon pilih gambar berukuran kurang dari 10 MB.')
        )
    )
);

export type UserForm = v.InferInput<typeof UserSchema>;