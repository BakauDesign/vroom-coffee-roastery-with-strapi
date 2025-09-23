import {
	component$,
	// isDev
} from "@builder.io/qwik";
import type {
	DocumentHead,
	// RequestHandler
} from "@builder.io/qwik-city";
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';

import { Button } from "~/components/main/button";
import { Gradient } from "~/components/main/gradient";
import { Separator } from "~/components/main/separator";
import { Testimony } from "~/components/main/testimony";

import HeroImage_1 from "~/assets/main/home/Hero image 1.avif";
import ShortDescriptionImage_1 from "~/assets/main/home/Short Description image 1.avif";
import MockupSocialMedia_Small from "~/assets/main/home/Mockup social media Small.avif"
import MockupSocialMedia_Large from "~/assets/main/home/Mockup social media Large.avif"
import { getGreenBeansProducts, getRoastedBeansProducts, getToolsProducts } from "~/server/services/products";
import { Product } from "~/components/main/product";

// export const onGet: RequestHandler = async ({ redirect }) => {
// 	if (!isDev) {
// 		throw redirect(302, "/coming-soon");		
// 	}
// };

export const useTestimonial = routeLoader$(async () => {
	return [
		{
			id: 1,
			name: "Andi Wijaya",
			avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Andrea",
			location: "Jakarta",
			review: "Produknya sangat berkualitas, pengiriman cepat!",
			purchasedProducts: [
				{ id: 101, name: "Kopi Arabika Gayo" },
				{ id: 102, name: "French Press" }
			]
		},
		{
			id: 2,
			name: "Budi Santoso",
			avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Alexander",
			location: "Bandung",
			review: "Pelayanannya ramah, packing aman sampai tujuan.",
			purchasedProducts: [
				{ id: 103, name: "Kopi Robusta Lampung" },
				{ id: 104, name: "Manual Grinder" }
			]
		},
		{
			id: 3,
			name: "Citra Dewi",
			avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Kingston",
			location: "Surabaya",
			review: "Aromanya sangat harum, rasa kopinya smooth banget!",
			purchasedProducts: [
				{ id: 105, name: "Kopi Liberika" },
				{ id: 106, name: "Aeropress" },
				{ id: 107, name: "Paper Filter" }
			]
		},
		{
			id: 4,
			name: "Dian Permata",
			avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aidan",
			location: "Yogyakarta",
			review: "Ini kopi terenak yang pernah saya beli online!",
			purchasedProducts: [
				{ id: 108, name: "Kopi Java Ijen" }
			]
		},
		{
			id: 5,
			name: "Eko Prasetyo",
			avatar: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jude",
			location: "Bali",
			review: "Worth the price! Akan beli lagi next time.",
			purchasedProducts: [
				{ id: 109, name: "Cold Brew Kit" },
				{ id: 110, name: "Biji Kopi Blend" }
			]
		}
	];
});

export const useProduct = routeLoader$(
	async (event) => {
		const greenBeansProducts = await getGreenBeansProducts({
			is_active: true,
			highlighted: true,
			event
		});

		const roastedBeansProducts = await getRoastedBeansProducts({
			is_active: true,
			highlighted: true,
			event
		});

		const toolsProducts = await getToolsProducts({
			is_active: true,
			highlighted: true,
			event
		});

		return { greenBeansProducts, roastedBeansProducts, toolsProducts };
	}
)

export default component$(() => {
	const testimonial = useTestimonial();
	const { value: products } = useProduct();
	const navigate = useNavigate();

	return (
		<>			
			<figure class="hero-section lg:grid-cols-2">
				<figcaption class="content">
					<article class="headline-and-supporting-headline">
						<h1>
							'Dari Biji Pilihan <br />hingga Cita Rasa Tak <br />Tertandingi'
						</h1>

						<p>
							Temukan seni roasting kopi spesialti di setiap tegukan. Vroom Coffee  Roastery menghadirkan biji kopi terbaik dari petani lokal, disangrai  dengan presisi untuk pengalaman kopi yang autentik.
						</p>
					</article>
					
					<section class="actions">
						<Button
							variant="primary"
						>
							Jelajahi Produk Kami
						</Button>
					</section>
				</figcaption>

				<section class="hero-image grid-cols-1 max-h-[500px]">
					<img src={HeroImage_1} alt="Hero image" height={500} width={500} />
				</section>
			</figure>

			<Separator />

			<div class="container">
				<Gradient position="top" />
				<Gradient position="bottom" />

				<figure class="general-section gap-[60px] lg:grid-cols-2 items-center">
					<section class="general-image max-h-[400px]">
						<img src={ShortDescriptionImage_1} alt="Hero image" height={500} width={500} />
					</section>

					<figcaption class="content">
						<article class="headline-and-supporting-headline">
							<h1>
								Vroom Coffee Roastery - Supply Your Coffee Needs
							</h1>

							<p>
								Selamat datang di VROOM Coffee Roastery - supplier terpercaya roast bean dan green bean asal Tangerang yang telah melayani pecinta kopi selama 8 tahun. Kami hadir dengan komitmen untuk menyediakan kopi berkualitas premium dengan harga terjangkau.
							</p>
						</article>
						
						<section class="actions">
							<Button
								variant="primary"
								onClick$={() => navigate('/about-us')}
							>
								Kenali Kami Lebih Dalam
							</Button>
						</section>
					</figcaption>
				</figure>

				<section class="general-section">
					<section class="content">
						<article class="headline-and-supporting-headline flex-col lg:justify-between lg:flex-row lg:items-center gap-y-4">
							<h1>
								Produk<br />Unggulan Kami
							</h1>

							<p class="text-right lg:max-w-[500px] max-md:self-end">
								Kami bangga mempersembahkan hampir 30 varian roast bean dengan produk unggulan
							</p>
						</article>

						<section class="grid gap-9 overflow-scroll grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
							{products.roastedBeansProducts.success ? products.roastedBeansProducts.response?.data.map((product) => {
								return (
									<Product
										key={product.documentId}
										type="Roasted Coffee Beans"
										slug={product.slug}
										documentId={product.documentId}
										nama={product.informasi_produk.nama}
										deskripsi={product.informasi_produk.deskripsi}
										foto={product.informasi_produk.foto}
										harga={product.daftar_varian_kemasan[0].harga}
										diskon={product.daftar_varian_kemasan[0].diskon}
										harga_diskon={product.daftar_varian_kemasan[0].harga_diskon}
										berat={product.daftar_varian_kemasan[0].berat}
									/>
								)
							}) : null}
							
							{products.greenBeansProducts.response ? products.greenBeansProducts.response.data.map((product) => {
								return (
									<Product
										key={product.documentId}
										slug={product.slug}
										type="Green Coffee Beans"
										documentId={product.documentId}
										nama={product.informasi_produk.nama}
										deskripsi={product.informasi_produk.deskripsi}
										foto={product.informasi_produk.foto}
									/>
								)
							}) : null}
							
							{products.toolsProducts.data ? products.toolsProducts.data.map((product) => {
								return (
									<Product
										key={product.documentId}
										slug={product.slug}
										type="Coffee Tools"
										documentId={product.documentId}
										nama={product.informasi_produk.nama}
										deskripsi={product.informasi_produk.deskripsi}
										foto={product.informasi_produk.foto}
										harga={product.harga}
										diskon={product.diskon}
										harga_diskon={product.harga_diskon}
										berat={product.berat}
									/>
								)
							}) : null}
						</section>
					</section>
				</section>

				<section class="general-section gap-12">
					<section class="content">
						<article class="headline-and-supporting-headline flex-col gap-y-4 horizontal">
							<h1>
								Testimoni Pelanggan
							</h1>

							<p class="max-md:self-end">
								Dibuat dengan Cinta, Dihargai oleh Pelanggan
							</p>
						</article>
					</section>

					<section class="flex gap-x-9 overflow-scroll *:min-w-[328px] *:sm:min-w-[400px]">
						{testimonial.value.map((data) => {
							return (
								<Testimony data={data} key={data.id} />
							);
						})}
					</section>
				</section>

				<section class="general-section gap-12">
					<section class="content">
						<article class="headline-and-supporting-headline lg:flex-row lg:items-center lg:justify-between lg:gap-x-8">
							<h1>
								Ikuti <br />Perjalanan <br />Kami
							</h1>

							<p class="text-right sm:max-w-[360px] max-md:self-end">
								Mulai perjalanan kopi spesialti Anda hari ini - karena setiap biji layak mendapat sangrai terbaik.
							</p>
						</article>
					</section>

					<section class="general-image *:max-w-[1000px] justify-items-center">
						<picture>
							<source
								srcset={MockupSocialMedia_Large}
								media="(min-width: 648px)"
							/>

							<source
								srcset={MockupSocialMedia_Small}
								media="(max-width: 648px)"
							/>
							<img src={MockupSocialMedia_Small} alt="Mockup Social Media" />
						</picture>
					</section>
				</section>
			</div>

			<Separator />
		</>
	);
});

export const head: DocumentHead = {
	title: "Vroom Coffee Roastery",
	meta: [
		{
			name: "description",
			content: "Vroom Coffee Roastery berkomitmen untuk mengolah biji kopi dengan passion dan keahlian. Setiap batch roasting kami adalah perpaduan sains, seni, dan dedikasi untuk menghadirkan rasa yang konsisten dan memukau.",
		},
	],
};
