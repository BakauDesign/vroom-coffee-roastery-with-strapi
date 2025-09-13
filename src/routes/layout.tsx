import { component$, Slot, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Footer } from "~/components/main/footer";
import { Header } from "~/components/main/header";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
	OrderContext,
	OrderRoastedBeanContext,
	OrderToolContext
} from "~/context/order-context";

import type {
	OrderCartItems,
	OrderRoastedBeanCartItems,
	OrderToolCartItems
} from "~/context/order-context";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
	const loc = useLocation();
	// const orderCartSignal = useOrderCartState();
	const orderCartSignal = useSignal<OrderCartItems>([]);
	const orderRoastedBeanCartSignal = useSignal<OrderRoastedBeanCartItems>([])
	const orderToolCartSignal = useSignal<OrderToolCartItems>([])

    useContextProvider(OrderContext, orderCartSignal);
    useContextProvider(OrderRoastedBeanContext, orderRoastedBeanCartSignal);
    useContextProvider(OrderToolContext, orderToolCartSignal);

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

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		track(() => orderRoastedBeanCartSignal.value);

		const roastedBeanCartExist = localStorage.getItem('vroom-roasted-bean-cart');

		if (!roastedBeanCartExist) {
			localStorage.setItem('vroom-roasted-bean-cart', "[]");
		}

		const roastedBeanCart = localStorage.getItem('vroom-roasted-bean-cart') as string;

		try {
			const parsedRoastedBeanCart: OrderRoastedBeanCartItems = JSON.parse(roastedBeanCart);

			if (
				parsedRoastedBeanCart.length > 0 &&
				orderRoastedBeanCartSignal.value.length < parsedRoastedBeanCart.length
			) {
				orderRoastedBeanCartSignal.value = parsedRoastedBeanCart;
			}

			if (
				orderRoastedBeanCartSignal.value.length > parsedRoastedBeanCart.length
			) {
				localStorage.setItem('vroom-roasted-bean-cart', JSON.stringify(orderRoastedBeanCartSignal.value))
			}
		} catch (error) {
			console.info("Error roasted bean cart")
		}
    });

	
	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ track }) => {
		track(() => orderToolCartSignal.value);

		const toolCartExist = localStorage.getItem('vroom-tool-cart');

		if (!toolCartExist) {
			localStorage.setItem('vroom-tool-cart', "[]");
		}

		const toolCart = localStorage.getItem('vroom-tool-cart') as string;

		try {
			const parsedToolCart: OrderToolCartItems = JSON.parse(toolCart);

			if (
				parsedToolCart.length > 0 &&
				orderToolCartSignal.value.length < parsedToolCart.length
			) {
				orderToolCartSignal.value = parsedToolCart;
			}

			if (
				orderToolCartSignal.value.length > parsedToolCart.length
			) {
				localStorage.setItem('vroom-tool-cart', JSON.stringify(orderToolCartSignal.value))
			}
		} catch (error) {
			console.info("Error tool cart")
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
