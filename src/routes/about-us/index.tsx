import { 
    component$, 
    // isDev 
} from "@builder.io/qwik";
// import type { RequestHandler } from "@builder.io/qwik-city";

import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";

import HeroImage_1 from "~/assets/main/about-us/Hero image 1.avif";
import HeroImage_2 from "~/assets/main/about-us/Hero image 2.avif";
import HeroImage_3 from "~/assets/main/about-us/Hero image 3.avif";
import HeroImage_4 from "~/assets/main/about-us/Hero image 4.avif";

import ProcessImage_1 from "~/assets/main/about-us/Process image 1.avif";
import ProcessImage_2 from "~/assets/main/about-us/Process image 2.avif";
import ProcessImage_3 from "~/assets/main/about-us/Process image 3.avif";

import SustainabilityFirst from "~/assets/main/about-us/icons/Sustainability First.avif";
import ConsistencyIsKey from "~/assets/main/about-us/icons/Consistency is Key.avif";
import CommunityDriven from "~/assets/main/about-us/icons/Community Driven.avif";
import { routeLoader$ } from "@builder.io/qwik-city";
// import { getMedia } from "~/lib/media";

// export const onGet: RequestHandler = async ({ redirect }) => {
//     if (!isDev) {
//         throw redirect(302, "/coming-soon");		
//     }
// };


// export const useBucketLoader = routeLoader$(async ({ platform }) => {
//     if (!platform?.env?.BUCKET) {
//         console.error("R2 Bucket binding BUCKET not found on platform.env");
//         return null;
//     }

//     // const object = await platform.env.BUCKET.get("vroom-coffee-roastery/25253917747321e3a120cea41140ecc7.jpg");
//     const object = await platform.env.BUCKET.get("25253917747321e3a120cea41140ecc7.jpg");

//     if (!object) {
//         console.warn("Object not found");
//     } else {
//         console.info("Object found:", object);
//     }
// });

export const useMediaUrl = routeLoader$(({ platform }) => {
    return platform.env.PUBLIC_MEDIA_URL;
});

export default component$(() => {
    // const mediaUrl = useMediaUrl();
    
    return (
        <>
            <figure class="hero-section  bg-primary-base border-[1.5px] border-neutral-custom-100">
                <figcaption class="content">
                    <article class="headline-and-supporting-headline grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-6">
                        <h1>
                            Lebih dari Sekadar Kopi <br class="hidden md:block lg:hidden" />- Ini adalah Perjalanan Rasa
                        </h1>

                        <p>
                            Sejak 2015, Vroom Coffee Roastery berdedikasi untuk menghadirkan biji kopi spesialti terbaik dari kebun lokal Indonesia, disangrai dengan  presisi untuk cita rasa yang konsisten dan memukau.
                        </p>
                    </article>
                </figcaption>

                <section class="hero-image grid-cols-2 lg:grid-cols-4 max-h-[500px] *:aspect-square *:object-cover">
                    <img src={HeroImage_1} alt="Hero image" height={800} width={800} />
                    <img src={HeroImage_2} alt="Hero image" height={800} width={800} />
                    <img src={HeroImage_3} alt="Hero image" height={800} width={800} />
                    <img src={HeroImage_4} alt="Hero image" height={800} width={800} />
                </section>
            </figure>

            <Separator />

            <div class="container">
                <Gradient position="top" />
                <Gradient position="bottom" />
                
                <img
                    class="h-[300px] w-[300px] object-cover aspect-square"
                    src="media/25253917747321e3a120cea41140ecc7.jpg"
                    alt="media/25253917747321e3a120cea41140ecc7.jpg"
                />

                <img
                    class="h-[300px] w-[300px] object-cover aspect-square"
                    src="media/25253917747321e3a120cea41140ecc7.jpg"
                    alt="media/25253917747321e3a120cea41140ecc7.jpg"
                />

                {/* <img
                    class="h-[300px] w-[300px] object-cover aspect-square"
                    src={getMedia(mediaUrl.value, "25253917747321e3a120cea41140ecc7.jpg")}
                    alt="get Media from lib"
                /> */}

                {/* <img src="/api/r2-image/25253917747321e3a120cea41140ecc7.jpg" alt="Preview api/r2-image" /> */}


                <section class="general-section gap-y-[60px] items-center">
                    <section class="content">
                        <article class="headline-and-supporting-headline grid lg:grid-cols-2 lg:items-center gap-y-8 lg:gap-x-12">
                            <h1>
                                Seni Mengolah Biji Kopi Menjadi Pengalaman Rasa Tak Terlupakan
                            </h1>

                            <p>
                                Di balik setiap cangkir Vroom Coffee, ada proses panjang dengan presisi ilmiah dan sentuhan seni. Kami memadukan teknologi modern dengan keahlian roastmaster berpengalaman untuk mengekstrak karakter terbaik dari setiap biji.
                            </p>
                        </article>
                    </section>

                    <ul class="flex flex-col gap-y-8 *:grid *:grid-cols-1 *:sm:grid-cols-2 *:sm:items-center *:gap-6 *:*:flex *:*:flex-col *:*:gap-y-4">
                        <li>
                            <img 
                                src={ProcessImage_1}
                                alt="Hero image" 
                                height={500}
                                width={500}
                                class="rounded-[12px] w-full max-h-[400px] max-w-[300px] min-[400px]:max-w-none object-cover"
                            />
                            
                            <article>
                                <h1 class="font-lora font-medium text-primary-700 text-h2-small sm:text-h2-medium lg:text-h2-large">
                                    Hanya 1 dari 5 Biji Lolos Seleksi Ketat Kami
                                </h1>

                                <p class="font-work-sans text-neutral-custom-800 text-body-small sm:text-body-medium">
                                    Kami bekerja langsung dengan petani lokal di 5 provinsi Indonesia (Aceh, Jawa, Flores, Toraja, Bali)  untuk memastikan traceability dan kualitas biji dari sumbernya.
                                </p>
                            </article>
                        </li>

                        <li class="h-[2px] w-full max-w-[250px] bg-primary-200"><br /></li>

                        <li>
                            <article>
                                <h1 class="font-lora font-medium text-primary-700 text-h2-small sm:text-h2-medium lg:text-h2-large">
                                    Setiap Asal Biji Memiliki 'Jalur Roasting' Khusus
                                </h1>

                                <p class="font-work-sans text-neutral-custom-800 text-body-small sm:text-body-medium">
                                    Roastmaster kami menganalisis karakteristik biji (ukuran, densitas, kadar air) untuk menentukan profil roasting yang tepat.
                                </p>
                            </article>

                            <img 
                                src={ProcessImage_2}
                                alt="Hero image"
                                height={500}
                                width={500}
                                class="rounded-[12px] w-full max-h-[400px] max-w-[300px] min-[400px]:max-w-none object-cover place-self-end"
                            />
                        </li>

                        <li class="h-[2px] w-full max-w-[250px] bg-primary-200 self-end"><br /></li>

                        <li>
                            <img 
                                src={ProcessImage_3}
                                alt="Hero image"
                                height={500}
                                width={500}
                                class="rounded-[12px] w-full max-h-[400px] max-w-[300px] min-[400px]:max-w-none object-cover" 
                            />
                            
                            <article>
                                <h1 class="font-lora font-medium text-primary-700 text-h2-small sm:text-h2-medium lg:text-h2-large">
                                    Quality Control Sebelum Biji Siap Dikirim
                                </h1>

                                <p class="font-work-sans text-neutral-custom-800 text-body-small sm:text-body-medium">
                                    Biji disimpan 24-48 jam untuk melepaskan CO2 berlebih sebelum dikemas.
                                </p>
                            </article>
                        </li>
                    </ul>
                </section>

                <section class="general-section grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                    <section class="content">
                        <article class="headline-and-supporting-headline flex-col gap-y-4 vertical">
                            <h1>
                                Lebih dari Bisnis, Ini <br />adalah Filosofi Kami
                            </h1>

                            <p>
                                Tiga pilar yang menjadi fondasi setiap keputusan kami
                            </p>
                        </article>
                    </section>

                    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4 *:items-center *:text-center *:p-6 *:bg-primary-base *:border-[3px] *:border-solid *:border-primary-50 *:rounded-[12px] *:flex *:flex-col *:gap-y-6 *:*:flex *:*:flex-col *:*:gap-y-4">
                        <li>
                            <img src={SustainabilityFirst} alt="Keberlanjutan" class="h-[60px] w-[60px] bg-primary-50 rounded-[6px]" height={60} width={60} />

                            <article>
                                <h1 class="font-lora font-semibold text-h3-medium sm:text-h3-large text-primary-700">
                                    Sustainability First
                                </h1>

                                <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                                    Kemasan biodegradable & sistem bagi hasil yang adil untuk petani
                                </p>
                            </article>
                        </li>

                        <li>
                            <img src={ConsistencyIsKey} alt="Transparansi" class="h-[60px] w-[60px] rounded-[6px]" height={60} width={60}  />

                            <article>
                                <h1 class="font-lora font-semibold text-h3-medium sm:text-h3-large text-primary-700">
                                    Consistency is Key
                                </h1>

                                <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                                    Logbook roasting detail untuk memastikan cita rasa sama setiap batch
                                </p>
                            </article>
                        </li>

                        <li>
                            <img src={CommunityDriven} alt="Inovasi" class="h-[60px] w-[60px] rounded-[6px]" height={60} width={60}  />

                            <article>
                                <h1 class="font-lora font-semibold text-h3-medium sm:text-h3-large text-primary-700">
                                    Community Driven
                                </h1>

                                <p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700">
                                    Workshop bulanan untuk berbagi ilmu dengan komunitas pecinta kopi
                                </p>
                            </article>
                        </li>
                    </ul>
                </section>

                <section class="general-section w-full py-12 px-6 border-[3px] border-solid border-primary-100 rounded-3xl">
                    <section class="content">
                        <article class="headline-and-supporting-headline flex-col gap-y-4 *:text-center">
                            <h1 class="text-primary-700">
                                Yuk Berkenalan Lebih Dekat!
                            </h1>

                            <p class="max-md:self-end text-neutral-custom-700">
                                Ada pertanyaan tentang kopi atau ingin kolaborasi? Tim kami siap membantu.
                            </p>
                        </article>

                        <section class="actions flex-col sm:flex-row justify-center items-center">
                            <Button
                                variant="secondary"
                                size="large"
                            >
                                Kunjungi Workshop
                            </Button>

                            <Button
                                variant="primary"
                                size="large"
                            >
                                WhatsApp Kami
                            </Button>
                        </section>
                    </section>

                    <section class="item-list item-list-horizontal *:min-w-[328px] *:sm:min-w-[400px]">
                        
                    </section>
                </section>
            </div>

            <Separator />
        </>
    );
});