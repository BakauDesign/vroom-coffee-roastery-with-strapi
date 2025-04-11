import { component$ } from "@builder.io/qwik";

import Background from "~/assets/Background Coming Soon.png"

export default component$(() => {
	return (
		<>
			<div class="h-screen w-screen px-4 sm:px-12 lg:px-16 flex items-center justify-center *:flex *:flex-col *:md:flex-row *:gap-y-6 *:lg:gap-x-12 *:items-start *:md:items-end relative">
				<div class="absolute">
					
					<h1 class="text-[#67471D] heading">
						Something <br />Brew-tiful <br />is Coming <br />Soon!
					</h1>

					<p class="text-[#3E3A37] subheading max-w-[600px]">
						Percikan aroma kopi spesialti segera hadir! Kami sedang melakukan final touch untuk memberikan pengalaman ngopi level tertinggi.
					</p>

				</div>
				<img src={Background} alt="Background Coming Soon.png" class="h-[360px] w-[360px] md:h-[600px] md:w-[600px] object-cover" width={360} height={360} />
			</div>
		</>
	);
});