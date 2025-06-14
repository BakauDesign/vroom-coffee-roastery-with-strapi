import { component$ } from "@builder.io/qwik";

import { Input } from "~/components/cms/input";
import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";

import { useForm, formAction$, valiForm$ } from "@modular-forms/qwik";
import type {
    InitialValues
} from "@modular-forms/qwik";

import { LoginSchema, type LoginForm } from "~/schema/auth";

import { routeLoader$ } from '@builder.io/qwik-city';

import { login } from "~/lib/auth";
import { createToken } from "~/lib/cookie";

export const useFormLoginLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
    username: '',
    password: ''
}));

export const useFormLoginAction = formAction$<LoginForm>(
    async (values, { request, cookie, platform, redirect }) => {
        const { username, password } = values;
        const user = await login(username, password, platform.env);

        if ('message' in user) {
            return { errors: {
                password: user.message
            }}
        }

        await createToken({ user, request, cookie, platform });

        throw redirect(302, "/cms/dashboard");
    }, 
    valiForm$(LoginSchema)
);

export default component$(() => {
    const [, { Form, Field }] = useForm<LoginForm>({
		loader: useFormLoginLoader(),
		action: useFormLoginAction(),
        validateOn: 'submit'
	});

    return (
        <>
            <section class="h-full w-full flex flex-col gap-6 lg:flex-row">
                <img 
                    src="https://i.pinimg.com/736x/6b/60/3b/6b603b993b5415704b5458695b932708.jpg" 
                    alt="Coffee Background"
                    class="lg:h-auto w-full object-cover rounded-2xl h-[300px]"
                    height={300}
                    width={300}
                     
                />
                <section class="font-inter bg-neutral-custom-base w-full max-w-[500px] px-6 py-9 flex flex-col gap-y-9 justify-center rounded-2xl">
                    <figure class="flex items-center gap-x-4">
                        <img 
                            src="https://i.pinimg.com/736x/53/46/0e/53460efe10e3b243a46612ec69becce0.jpg" 
                            alt="Coffee Logo"
                            class="h-[32px] w-[32px] object-cover rounded-[4px]"
                            height={32}
                            width={32}
                        />

                        <figcaption class="text-cms-label-extra-small sm:text-cms-label-medium font-medium text-neutral-custom-700">
                            Crafting the Perfect Roast
                        </figcaption>
                    </figure>

                    <article class="flex flex-col gap-y-6">
                        <h1 class="text-neutral-custom-900 text-cms-h2-small sm:text-cms-h2-medium lg:text-cms-h2-large font-semibold">
                            Selamat Datang Kembali,<br />Roast Enthusiast!
                        </h1>

                        <p class="text-neutral-custom-700 text-cms-body-small sm:text-body-medium">
                            Masuk untuk mengelola pesanan, track roast batch terbaru, atau lanjutkan petualangan kopi spesialti Anda.
                        </p>
                    </article>

                    <Form class="flex flex-col gap-y-6">
                        <Field name="username">
							{(field: any, props: any) => (
                                
                                <Input.Root>
                                    <Input.Header>
                                        <Input.Label>Username</Input.Label>
                                    </Input.Header>
                                                    
                                    <Input.FieldText
                                        {...props}
                                        id={field.name}
                                        name={field.name}
                                        value={field.value}
                                        placeholder="Masukan username"
                                    />

                                    <Input.Message>
                                        <p class="text-red-500">
                                            { field.error }
                                        </p>
                                    </Input.Message>
                                </Input.Root>
                            )}
						</Field>

                        <Field name="password">
							{(field: any, props: any) => (
                                <Input.Root>
                                    <Input.Header>
                                        <Input.Label>Password</Input.Label>
                                    </Input.Header>
                                                    
                                    <Input.FieldPassword
                                        {...props}
                                        id={field.name}
                                        name={field.name}
                                        value={field.value}
                                        placeholder="Masukan password"
                                    />

                                    <Input.Message>
                                        <p class="text-red-500">
                                            { field.error }
                                        </p>
                                    </Input.Message>
                                </Input.Root>
                        )}
						</Field>

                        <Separator />

                        <Button
                            variant="primary"
                            size="large"
                            fillContainer
                            type="submit"
                        >
                            <p>Masuk</p>
                        </Button>
                    </Form>
                </section>
            </section> 
        </>
    );
});