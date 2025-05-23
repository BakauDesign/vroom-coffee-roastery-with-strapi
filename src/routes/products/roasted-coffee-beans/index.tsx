import { component$, isDev } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

// import Keberlanjutan from "~/assets/Icons/Keberlanjutan.png";
// import Transparansi from "~/assets/Icons/Transparansi.png";
// import Inovasi from "~/assets/Icons/Inovasi.png";
import { Input } from "~/components/main/input";
import { TextField } from "~/components/main/text-field";
import { Shipping } from "~/components/main/shipping";

export const onGet: RequestHandler = async ({ redirect }) => {
	if (!isDev) {
		throw redirect(302, "/coming-soon");		
	}
};

export default component$(() => {
    return (
        <>
            <figure class="hero-section ">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1 items-center gap-4 lg:gap-6">
                        <h1>
                            Kopi Spesialti Siap Seduh, <br />Dipanggang dengan Presisi
                        </h1>

                        <p>
                            Biji kopi matang premium hasil roasting terkontrol, siap memberikan pengalaman ngopi terbaik di rumah Anda.
                        </p>
                    </article>
                </figcaption>

                <section class="hero-image grid-cols-2 lg:grid-cols-4 max-h-[500px]">
                    <div class="hidden lg:block" />
                    <img src="https://i.pinimg.com/736x/a1/cd/44/a1cd44f6617beebb9794877ef59082a1.jpg" alt="Hero image 1" height={500} width={500} />
                    <img src="https://i.pinimg.com/736x/a1/cd/44/a1cd44f6617beebb9794877ef59082a1.jpg" alt="Hero image 2" height={500} width={500} />
                    <img src="https://i.pinimg.com/736x/a1/cd/44/a1cd44f6617beebb9794877ef59082a1.jpg" alt="Hero image 3" height={500} width={500} />
                </section>
            </figure>

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <section class="general-section gap-y-[60px] items-center">
                    <Input.Root>
                        <Input.Header>
                            <Input.Label>Nama Lengkap</Input.Label>
                            <Input.Option>(Wajib)</Input.Option>
                        </Input.Header>
                    
                        <Input.FieldText
                            placeholder="cth: Jokowi Nipunegoro"
                            onChange$={(event$) => console.info(event$.target)}
                        />

                        <Input.Message>
                            Failed
                        </Input.Message>
                    </Input.Root>

                    <Input.Root>
                        <Input.Header>
                            <Input.Label>Nama Lengkap</Input.Label>
                            <Input.Option>(Wajib)</Input.Option>
                        </Input.Header>
                    
                        <Input.FieldPassword
                            placeholder="cth: Jokowi Nipunegoro"
                            onChange$={(event$) => console.info(event$.target)}
                        />

                        <Input.Message>
                            Failed
                        </Input.Message>
                    </Input.Root>

                    <TextField.Root>
                        <TextField.Header>
                            <TextField.Label>Nama Lengkap</TextField.Label>
                            <TextField.Option>(Wajib)</TextField.Option>
                        </TextField.Header>
                    
                        <TextField.Field
                            placeholder="cth: Jokowi Nipunegoro"
                            onChange$={(event$) => console.info(event$.target)}
                        />

                        <TextField.Message>
                            Failed
                        </TextField.Message>
                    </TextField.Root>

                    <Shipping.Root onClick$={() => alert("JNE")}>
                        <Shipping.Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/New_Logo_JNE.png/1200px-New_Logo_JNE.png" />

                        <Shipping.Detail>
                            <Shipping.Name>JNE</Shipping.Name>
                            <Shipping.Cost>13000</Shipping.Cost>
                        </Shipping.Detail>
                    </Shipping.Root>
                </section>
            </div>

            <Separator />
        </>
    );
});