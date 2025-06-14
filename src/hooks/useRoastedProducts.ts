import { $, useSignal, useTask$ } from "@builder.io/qwik";
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