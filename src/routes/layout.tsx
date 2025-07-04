import { component$, Slot, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/main/footer";
import { Header } from "~/components/main/header";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { OrderContext } from "~/context/order-context";

import type { OrderCartItems } from "~/context/order-context";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
	const loc = useLocation();
	// const orderCartSignal = useOrderCartState();
	const orderCartSignal = useSignal<OrderCartItems>([]);

    useContextProvider(OrderContext, orderCartSignal);

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		track(() => orderCartSignal.value);

		const cartExist = localStorage.getItem('vroom-cart');

		if (!cartExist) {
			localStorage.setItem('vroom-cart', "[]");
		}

		const cart = localStorage.getItem('vroom-cart') as string;

		try {
			const parsedCart: OrderCartItems = JSON.parse(cart);

			if (
				parsedCart.length > 0 &&
				orderCartSignal.value.length < parsedCart.length
			) {
				orderCartSignal.value = parsedCart;
			}

			if (
				orderCartSignal.value.length > parsedCart.length
			) {
				localStorage.setItem('vroom-cart', JSON.stringify(orderCartSignal.value))
			}
		} catch (error) {
			console.info("Error cart")
		}
    });

	if (loc.url.pathname.startsWith('/cms')) {
		return <Slot />;
	}

	return (
		<main class="w-full bg-neutral-custom-base flex flex-col items-center gap-y-20">
			<Header />
			<Slot />
			<Footer />
		</main>
	);
});
