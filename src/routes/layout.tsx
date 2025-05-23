import { component$, Slot, isDev } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/main/footer";
import { Header } from "~/components/main/header";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
	const loc = useLocation();

	if (loc.url.pathname.startsWith('/cms')) {
		return <Slot />;
	}

	return (
		<main class="w-full bg-neutral-custom-base flex flex-col items-center gap-y-20">
			{isDev && <Header />}
			<Slot />
			{isDev && <Footer />}
		</main>
	);
});
