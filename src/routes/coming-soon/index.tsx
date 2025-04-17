import { component$ } from "@builder.io/qwik";

import Background from "~/assets/Background Coming Soon.png"

export default component$(() => {
	return (
		<>
			<div class="h-screen w-screen px-4 sm:px-12 lg:px-16 flex items-center justify-center *:flex *:flex-col *:md:flex-row *:gap-y-6 *:lg:gap-x-12 *:items-start *:md:items-end relative">
				<div class="absolute">
					
					<h1 class="font-playfair-display text-display-small sm:text-display-large font-medium text-primary-800">
						Something <br />Brew-tiful <br />is Coming <br />Soon!
					</h1>

					<p class="font-work-sans text-body-small sm:text-body-medium text-neutral-custom-700 max-w-[600px]">
						Percikan aroma kopi spesialti segera hadir! Kami sedang melakukan final touch untuk memberikan pengalaman ngopi level tertinggi.
					</p>

				</div>
				<img src={Background} alt="Background Coming Soon.png" class="h-[360px] w-[360px] md:h-[600px] md:w-[600px] object-cover" width={360} height={360} />
			</div>
		</>
	);
});