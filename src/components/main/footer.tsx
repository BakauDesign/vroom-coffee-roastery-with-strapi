import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

import Logo from "~/assets/logo/Logo Primary Dark.avif";

export const Footer = component$(() => { 
    return (
        <footer class="w-full py-20 px-4 sm:px-12 lg:px-[60px] flex flex-col gap-y-[60px] bg-primary-base border-t-[3px] border-solid border-primary-300 font-work-sans">

            <div class="flex flex-col lg:flex-row lg:justify-between gap-[60px]">

                <figure class="flex flex-col gap-y-6 max-w-[400px]">
                    <img alt="Logo" src={Logo} class="h-[100px] max-w-[120px] flex items-center justify-center bg-primary-50 rounded-[4px] object-cover" height={150} width={150} />

                    <figcaption class="flex flex-col gap-y-3 text-neutral-custom-900">
                        <h1 class="font-medium text-label-small sm:text-label-medium">
                            Vroom Coffee Roastery
                        </h1>

                        <h2 class="text-body-small sm:text-body-medium">
                            Vroom Coffee Roastery - Menghubungkan Anda dengan Cita Rasa Kopi Nusantara yang Autentik.
                        </h2>
                    </figcaption>
                </figure>

                <ul class="grid min-[400px]:grid-cols-2 xl:grid-cols-3 gap-y-8 sm:gap-8 *:max-w-[400px] *:text-label-small *:sm:text-label-medium *:flex *:flex-col *:gap-y-4 *:*:flex *:*:flex-col *:*:gap-y-4">
                    <li>
                        <p class="font-medium text-primary-500">Jelajahi Vroom Coffee</p>

                        <ul class="*:text-neutral-700">
                            <li><Link href='/' class="py-1">Beranda</Link></li>
                            <li><Link href='/products/roasted-coffee-beans' class="py-1">Roasted Coffee Beans</Link></li>
                            <li><Link href='/products/green-coffee-beans' class="py-1">Green Coffee Beans</Link></li>
                            <li><Link href='/products/coffee-tools' class="py-1">Coffee Tools</Link></li>
                            <li><Link href='/about-us' class="py-1">Tentang Kami</Link></li>
                            <li><Link href='/contact-us' class="py-1">Hubungi Kami</Link></li>
                        </ul>
                    </li>

                    <li>
                        <p class="font-medium text-primary-500">Kontak & Alamat</p>

                        <ul class="*:text-neutral-700">
                            <li><Link href='/' class="py-1">📍 Jl. Kisamaun No.77, Tangerang</Link></li>
                            <li><Link href='/products/roasted-coffee-beans' class="py-1">📞 +62 123 4567 890</Link></li>
                            <li><Link href='/about-us' class="py-1">✉️ hello@vroomcoffee.id</Link></li>
                        </ul>
                    </li>

                    <li>
                        <p class="font-medium text-primary-500">Sosial Media & Pembayaran</p>

                        <ul class="*:text-neutral-700">
                            <li><Link href='/' class="py-1">Instagram</Link></li>
                            <li><Link href='/products/roasted-coffee-beans' class="py-1">WhatsApp</Link></li>
                            <li><Link href='/about-us' class="py-1">Tokopedia</Link></li>
                            <li><Link href='/contact-us' class="py-1">Shopee</Link></li>
                        </ul>
                    </li>

                </ul>
            </div>

            <p class="font-semibold text-primary-400 font-open-sans text-small-text-large">
                © 2025 Vroom Coffee Roastery.&nbsp;
                <span 
                    onClick$={() => window.open('https://bakaudesign.com', '_blank', 'noopener,noreferrer')}
                    class="cursor-pointer underline"
                >
                    Crafted with ❤️ in Banten.
                </span>
            </p>
        </footer>
    );
});