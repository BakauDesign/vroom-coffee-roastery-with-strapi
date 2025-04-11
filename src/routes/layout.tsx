import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl, redirect, url }) => {
	const pathname = url.pathname.replace(/\/+$/, '');

	if (pathname !== "/coming-soon") {
		throw redirect(302, "/coming-soon");
	}

	cacheControl({
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		maxAge: 5,
	});
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
	return (
		<>
			<main class="bg-[#FDFAF7]">
				<Slot />
			</main>
		</>
	);
});
