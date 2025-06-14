import * as v from 'valibot';

export const LoginSchema = v.object({
    username: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan username kamu')
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan password kamu'),
        v.minLength(8, 'Panjang password harus 8 karakter atau lebih'),
    ),
});

export const CreateUserSchema = v.object({
    name: v.pipe(
        v.string()
    ),
    username: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan username kamu')
    ),
    password: v.pipe(
        v.string(),
        v.nonEmpty('Mohon masukan password kamu'),
        v.minLength(8, 'Panjang password harus 8 karakter atau lebih'),
    ),
});
   
export type LoginForm = v.InferInput<typeof LoginSchema>;