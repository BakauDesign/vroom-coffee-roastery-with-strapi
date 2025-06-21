import { $, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { RoastedBeansProduct } from "~/interfaces";

type roastedProducts = {
    totalItems: number;
    initialPerPage: number;
    products: Array<RoastedBeansProduct>;
}

export function useRoastedProducts({
    totalItems,
    initialPerPage,
    products
}: roastedProducts) {
    const displayedProducts = useSignal<Array<RoastedBeansProduct>>([]);

    const brewingMethod = useSignal("Pour Over");
    const searchKeyword = useSignal("");

    const currentPage = useSignal(1);
    const TOTALITEMS = useSignal(totalItems);
    const PERPAGE = useSignal(initialPerPage);

    const totalPages = Math.ceil(TOTALITEMS.value / PERPAGE.value);

    useTask$(() => {
        const start = 0;
        const end = PERPAGE.value;
        displayedProducts.value = products.slice(start, end);
    });

    const loadMore = $(() => {
        const nextPage = currentPage.value + 1;
        const start = (nextPage - 1) * PERPAGE.value;
        const end = nextPage * PERPAGE.value;

        const moreProducts = products.slice(start, end);
        displayedProducts.value = [...displayedProducts.value, ...moreProducts];
        currentPage.value = nextPage;
    });

    return {
        brewingMethod,
        searchKeyword,
        currentPage,
        totalItems,
        totalPages,
        loadMore,
        displayedProducts
    };
}

export function useRoastedProductsCMS() {
    const brewingMethod = useSignal("Semua Metode");
    const searchKeyword = useSignal("");

    const nav = useNavigate();
    const loc = useLocation();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => brewingMethod.value);
        track(() => searchKeyword.value);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
        } else {
            currentSearchParams.delete('search');
        }

        if (brewingMethod.value && brewingMethod.value !== "Semua Metode") {
            currentSearchParams.set('brewingMethod', brewingMethod.value);
        } else {
            currentSearchParams.delete('brewingMethod');
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
        nav(newUrl, { replaceState: true });
    });

    return {
        brewingMethod,
        searchKeyword
    };
}