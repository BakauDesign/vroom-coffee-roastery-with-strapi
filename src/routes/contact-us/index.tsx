import {
    component$,
    // isDev
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from '@builder.io/qwik-city';

import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import { Faq } from "~/components/main/faq";

import HeroImage_1 from "~/assets/main/contact-us/Hero image 1.avif";
import HeroImage_2 from "~/assets/main/contact-us/Hero image 2.avif";
import Satelite from "~/assets/main/contact-us/Satelite.avif";

import Whatsapp from "~/assets/main/contact-us/icons/Whatsapp.avif";
import Email from "~/assets/main/contact-us/icons/Email.avif";
import Phone from "~/assets/main/contact-us/icons/Phone.avif";
import Clock from "~/assets/main/contact-us/icons/Clock.avif";
import Maps from "~/assets/main/contact-us/icons/Maps.avif";

import { ChevronUp } from "~/assets/Icons/ChevronUp";

// export const onGet: RequestHandler = async ({ redirect }) => {
//     if (!isDev) {
//         throw redirect(302, "/coming-soon");		
//     }
// };

export const useFaq = routeLoader$(async () => {
    return [
        {
            id: 1,
            title: "Apa perbedaan kopi single origin dan blend?",
            answer: "Single origin berasal dari satu kebun/kawasan tertentu (contoh: Aceh Gayo), menonjolkan karakter unik daerahnya. Sedangkan blend adalah paduan beberapa biji untuk menciptakan rasa seimbang (misal: Java-Flores untuk espresso)."
        },
        {
            id: 2,
            title: "Bagaimana cara menyimpan kopi agar tetap segar?",
            answer: "Simpan dalam wadah kedap udara di suhu ruang, jauh dari panas/kelembaban. Hindari freezer! Biji matang kami tetap optimal dalam 3 minggu setelah roast date (lihat di kemasan)."
        },
        {
            id: 3,
            title: "Apa rekomendasi grind size untuk V60?",
            answer: "Gunakan grind size medium-coarse (seperti garam laut). Untuk 15gr kopi, seduh dengan 250ml air 92°C selama 2-2.5 menit. Bonus: Scan QR code di kemasan untuk video tutorial!"
        },
        {
            id: 4,
            title: "Apakah biji kopi mentah bisa langsung diseduh?",
            answer: "Tidak bisa ya! Biji mentah (green bean) harus melalui proses roasting dulu. Kami sarankan roast level light-medium untuk mengeksplor rasa aslinya. Butuh panduan? Tim kami siap bantu via WhatsApp."
        },
        {
            id: 5,
            title: "Kebijakan pengembalian untuk produk cacat?",
            answer: "Garansi 100% jika produk rusak saat pengiriman. Kirim foto bukti ke hello@vroomcoffee.id dalam 24 jam, kami ganti baru atau refund. Lihat detail kebijakan pengembalian."
        }
    ];
});

export default component$(() => {
    const faq = useFaq();
    return (
        <>
            <figure class="hero-section grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[60px] bg-primary-base border-[1.5px] border-neutral-custom-100">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1  gap-4">
                        <h1>
                            Yuk Ngobrol <br />soal Kopi!
                        </h1>

                        <p>
                            Tim kami siap membantu—baik untuk pertanyaan produk, kolaborasi, atau sekadar berbagi cerita kopi favorit Anda.
                        </p>
                    </article>
                </figcaption>

                <section class="hero-image grid-cols-2 max-h-[500px] *:aspect-square *:object-cover">
                    <img src={HeroImage_1} alt="Hero image 1" height={500} width={500} />
                    <img src={HeroImage_2} alt="Hero image 2" height={500} width={500} />
                </section>
            </figure>

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />

                <section class="general-section gap-y-[60px] items-center">
                    <section class="content">
                        <article class="headline-and-supporting-headline flex flex-row gap-x-4 items-center">
                            <h1>
                                Hubungi&nbsp;Kami&nbsp;Melalui
                            </h1>

                            <span class="bg-primary-200 w-full h-[1.5px]" />

                        </article>
                    </section>

                    <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-y-8">
                        <li class="contact-card">
                            <section class="icons">
                                <img 
                                    src={Whatsapp} 
                                    alt="Hero image" 
                                    class="main-icon"
                                    height={60}
                                    width={60}
                                />

                                <ChevronUp class="text-primary-700" />
                            </section>
                            
                            
                            <section class="content">
                                <article class="title-and-description">
                                    <h1>
                                        WhatsApp Business
                                    </h1>

                                    <p>
                                        Respon cepat, jam kerja (08.00-17.00 WIB)
                                    </p>
                                </article>

                                <a href="/">+62 812 3456 7890</a>
                            </section>
                        </li>

                        <li class="contact-card">
                            <section class="icons">
                                <img 
                                    src={Email} 
                                    alt="Hero image" 
                                    class="main-icon"
                                    height={60}
                                    width={60}
                                />

                                <ChevronUp class="text-primary-700" />
                            </section>
                            
                            
                            <section class="content">
                                <article class="title-and-description">
                                    <h1>
                                        Email
                                    </h1>

                                    <p>
                                        Untuk pertanyaan detail atau kerja sama
                                    </p>
                                </article>

                                <a href="/">hello@vroomcoffee.id</a>
                            </section>
                        </li>

                        <li class="contact-card">
                            <section class="icons">
                                <img 
                                    src={Phone} 
                                    alt="Hero image" 
                                    class="main-icon"
                                    height={60}
                                    width={60}
                                />

                                <ChevronUp class="text-primary-700" />
                            </section>
                            
                            
                            <section class="content">
                                <article class="title-and-description">
                                    <h1>
                                        Telepon
                                    </h1>

                                    <p>
                                        Lebih nyaman bicara langsung?
                                    </p>
                                </article>

                                <a href="/">+62 812 1234 5678 (Jam kerja saja)</a>
                            </section>
                        </li>

                        
                    </ul>
                </section>

                <section class="general-section gap-12 *:max-w-[1000px] justify-items-center">
                    <section class="content">
                        <article class="headline-and-supporting-headline grid md:grid-cols-2 md:gap-x-6 gap-y-4 items-center">
                            <h1>
                                Kunjungi <br />Roastery <br />Kami
                            </h1>

                            <p>
                                Anda bisa melihat proses roasting langsung, mencicipi sample kopi, atau sekadar bertukar cerita tentang kopi.
                            </p>
                        </article>
                    </section>

                    <section class="relative flex flex-col gap-12 w-full justify-self-center">
                        <img 
                            src={Satelite} 
                            alt=""
                            class="w-full object-cover rounded-[6px]"
                            height={1000}
                            width={1000}
                        />

                        <ul class="flex flex-col gap-8 items-center font-work-sans *:pt-5 *:px-4 *:pb-4 *:flex *:gap-x-4 *:bg-primary-base *:border-[1.5px] *:border-solid *:border-primary-100 *:rounded-[12px] *:max-w-[360px] *:min-[500px]:absolute">
                            <li class="rotate-[4deg] bottom-0 left-0">
                                <img 
                                    src={Clock} 
                                    alt=""
                                    class="h-[48px] w-[48px] object-cover"
                                    height={48}
                                    width={48}
                                />

                                <article class="flex flex-col gap-y-3">
                                    <h1 class="text-label-small sm:text-label-medium text-neutral-950 font-medium">Jam Operasional</h1>

                                    <ul class="flex flex-col gap-y-2 *:text-label-small *:sm:text-label-medium *:text-neutral-custom-700">
                                        <li>Senin-Kamis: 11.30-23.00 WIB</li>
                                        <li>Jumat-Sabtu: 12.00-22.00 WIB</li>
                                        <li>Minggu: 13.30-22.00 WIB</li>
                                    </ul>
                                </article>
                            </li>

                            <li class="rotate-[-4deg] bottom-48 right-0">
                                <img 
                                    src={Maps} 
                                    alt=""
                                    class="h-[48px] w-[48px] object-cover"
                                    height={48}
                                    width={48}
                                />

                                <article class="flex flex-col gap-y-3">
                                    <h1 class="text-label-small sm:text-label-medium text-neutral-950 font-medium">Vroom Coffee & Roastery</h1>

                                    <ul class="flex flex-col gap-y-2 *:text-label-small *:sm:text-label-medium *:text-neutral-custom-700">
                                        <li>Jl. Roasting No. 123, Bandung 40123</li>
                                    </ul>
                                </article>
                            </li>
                        </ul>
                    </section>                
                </section>

                <section class="general-section gap-12">
                    <section class="content">
                        <article class="headline-and-supporting-headline flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 horizontal">
                            <span class="bg-primary-200 w-full h-[1.5px]" />

                            <h1>
                                Pertanyaan&nbsp;yang&nbsp;Sering&nbsp;Diajukan
                            </h1>

                            <span class="bg-primary-200 w-full h-[1.5px]" />
                        </article>
                    </section>

                    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {faq.value.map((data) => {
                            return (
                                <Faq.Root key={data.id}>
                                    <Faq.Title>{data.title}</Faq.Title>
                                    <Faq.Content>{data.answer}</Faq.Content>
                                </Faq.Root>
                            );
                        })}
                    </section>
                </section>
            </div>

            <Separator />
        </>
    );
});