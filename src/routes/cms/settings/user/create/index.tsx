import * as v from 'valibot';

import {
    // $,
    component$,
    useSignal,
    // useSignal
} from "@builder.io/qwik";
 
import {
    routeLoader$,
    // useLocation,
    useNavigate
} from '@builder.io/qwik-city';
 
import { Breadcrumb } from "~/components/cms/breadcrumb";
import { Button } from "~/components/main/button";
import { Separator } from "~/components/cms/separator";
 
import { HeaderBlock as Header } from "~/components/blocks/cms/header-block";
 
// import { useUsers } from "~/hooks/useUsers";
 
// import { getDB } from "~/lib/db";
// import { formatDateTime } from "~/lib/utils";
// import { Complete } from "~/assets/cms/icons/Complete";
 
import { useForm, formAction$, valiForm$ } from "@modular-forms/qwik";
import type {
    InitialValues
} from "@modular-forms/qwik";
 
import { UserAvatarSchema, UserSchema, type UserForm } from "~/schema/user";
import { Input } from "~/components/cms/input";
import { FormBlock } from "~/components/blocks/cms/form-block";
import { UploadPhoto } from "~/components/cms/upload-photo";
import { Chips } from "~/components/cms/chips";
import { uploadFileToBucket } from '~/lib/r2';
 
export const useUserFormLoader = routeLoader$<InitialValues<UserForm>>(() => ({
    name: '',
    username: '',
    avatar: null,
    role: 'Super Admin',
    password: ''
}));
 
export const useUserFromAction = formAction$<UserForm>(
    async (values, { platform }) => {
        const validAvatar = v.safeParse(UserAvatarSchema, values.avatar);

        if (!validAvatar.success) {
            return {
                errors: { avatar: validAvatar.issues[0].message }
            }
        }
        uploadFileToBucket(values.avatar, platform.env.BUCKET);
    },
    {
        validate: valiForm$(UserSchema),
        files: ["avatar"]
    }
);
 
export default component$(() => {
    const role = useSignal("Super Admin");
    const action = useUserFromAction();
    const loader = useUserFormLoader();
 
    const [, { Form, Field }] = useForm<UserForm>({
        loader: loader,
        action: action,
        validateOn: 'submit'
    });
 
    // const loc = useLocation();
    const navigate = useNavigate();
    // const users = useUserLoader();

    return (
        <>
            <Form
                encType="multipart/form-data"
                class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative"
            >
            {/* <section class="shrink-0 h-full min-h-full w-full flex flex-col gap-6 lg:flex-row relative"> */}
                {/* <section class="h-full w-full *:h-full *:w-full overflow-hidden *:overflow-y-scroll *:overflow-x-hidden bg-neutral-custom-base pt-[124px] px-4 sm:px-6 lg:px-9 pb-6 sm:pb-9 lg:pb-12 lg:pt-12 *:flex *:flex-col *:gap-9 relative"> */}
                {/* <section> */}
                <section class="no-scrollbar">
                    <Breadcrumb.Root>
                        <Breadcrumb.Item href="/cms/settings/user">
                            User management
                        </Breadcrumb.Item>
 
                        <Breadcrumb.Item visited>
                            User list
                        </Breadcrumb.Item>
                    </Breadcrumb.Root>
 
                    <Header.Root>
                        <Header.Content>
                            <Header.Detail>
                                <Header.Headline>
                                    Manajemen User
                                </Header.Headline>
 
                                <Header.SupportingHeadline>
                                    Kelola akses tim Anda. Tambahkan, edit, atau nonaktifkan user berdasarkan peran (role) mereka.
                                </Header.SupportingHeadline>
                            </Header.Detail>
 
                            <Header.Actions>
                                <Button
                                    variant="secondary"
                                    size="large"
                                    onClick$={() => navigate("/cms/settings/user")}
                                    type="button"
                                >
                                    Batal
                                </Button>
 
                                <Button
                                    variant="primary"
                                    size="large"
                                    type="submit"
                                >
                                    Tambahkan User
                                </Button>
                            </Header.Actions>
                        </Header.Content>
                    </Header.Root>
 
                    <Separator />
 
                    <FormBlock.Root isOpened>
                        <FormBlock.Header>
                            <FormBlock.Headline>
                                Informasi dasar
                            </FormBlock.Headline>
 
                            <FormBlock.SupportingHeadline>
                                Belum lengkap: Nama, username, foto profil, peran, password.
                            </FormBlock.SupportingHeadline>
                        </FormBlock.Header>
 
                        <FormBlock.Content>
                            <section>
                                <Field name="name">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Masukkan nama lengkap user (contoh: 'Aulia Azahra'). Hindari singkatan atau simbol khusus.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Name</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Aulia Azahra"
                                                    maxLength={50}
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
 
                                <Field name="username">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Gunakan format: nama depan + inisial (contoh: 'budisantoso_01'). Tidak boleh ada spasi atau simbol (@, #, dll).
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Username</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: Aulia771Azahra"
                                                    maxLength={50}
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
 
                                <Field name="avatar">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Upload foto wajah jelas (rasio 1:1). Format .jpg/.png, resolusi minimal 200x200px.
                                                </p>
                                            </article>
 
                                            <UploadPhoto.Root>
                                                <UploadPhoto.Header>
                                                    <UploadPhoto.Label>Foto Profil</UploadPhoto.Label>
                                                    <UploadPhoto.Option>Wajib</UploadPhoto.Option>
                                                </UploadPhoto.Header>
 
                                                <UploadPhoto.FieldFile
                                                    {...props}
                                                    name={field.name}
                                                />
 
                                                <UploadPhoto.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </UploadPhoto.Message>
                                            </UploadPhoto.Root>
                                        </section>
                                    )}
                                </Field>
 
                                <Field name="role">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Pilih hak akses user: Super Admin punya akses penuh ke semua fitur CMS. Dan Admin tidak bisa akses pengaturan sistem.
                                                </p>
                                            </article>

                                            <Chips.Root
                                                name={field.name}
                                                currentValue={role.value}
                                                onClick$={(value) => {
                                                    role.value = value;
                                                }}
                                            >
                                                <Chips.Header>
                                                    <Chips.Label>Peran</Chips.Label>
                                                    <Chips.Option>Wajib</Chips.Option>
                                                </Chips.Header>
 
                                                <Chips.Items>
                                                    <Chips.Item {...props} selected value={"Super Admin"} />
                                                    <Chips.Item {...props} value={"Admin"} />
                                                </Chips.Items>
                                                
                                                <p class="text-red-500">
                                                    { field.error }
                                                </p>
                                            </Chips.Root>

                                            {/* <p class="text-red-500">
                                                { field.error }
                                            </p> */}
                                        </section>
                                    )}
                                </Field>

                                <Field name="password">
                                    {(field: any, props: any) => (
                                        <section class="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-between">
                                            <article class="font-inter flex flex-col gap-2 max-w-[400px]">
                                                <h1 class="font-medium text-cms-label-small sm:text-cms-label-medium text-neutral-custom-900">
                                                    Panduan:
                                                </h1>
 
                                                <p class="text-cms-body-small sm:text-cms-body-medium text-neutral-custom-600">
                                                    Masukkan nama lengkap user (contoh: 'Aulia Azahra'). Hindari singkatan atau simbol khusus.
                                                </p>
                                            </article>
 
                                            <Input.Root>
                                                <Input.Header>
                                                    <Input.Label>Password</Input.Label>
                                                    <Input.Option>Wajib</Input.Option>
                                                </Input.Header>
 
                                                <Input.FieldText
                                                    {...props}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="cth: mysecretpassword123213"
                                                    minLength={8}
                                                />
 
                                                <Input.Message>
                                                    <p class="text-red-500">
                                                        { field.error }
                                                    </p>
                                                </Input.Message>
                                            </Input.Root>
                                        </section>
                                    )}
                                </Field>
                            </section>
                        </FormBlock.Content>
                    </FormBlock.Root>
                </section>
                {/* </section> */}
            {/* </section> */}
            </Form>
        </>
    );
});