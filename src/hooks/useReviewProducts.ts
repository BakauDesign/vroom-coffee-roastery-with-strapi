import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export function useReviewProductsCMS() {
    const categoryFilter = useSignal("Semua Kategori");
    const ratingFilter = useSignal("Semua Rating");
    const searchKeyword = useSignal("");

    const nav = useNavigate();
    const loc = useLocation();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => categoryFilter.value);
        track(() => ratingFilter.value);
        track(() => searchKeyword.value);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
        } else {
            currentSearchParams.delete('search');
        }

        if (categoryFilter.value && categoryFilter.value !== "Semua Kategori") {
            currentSearchParams.set('category', categoryFilter.value);
        } else {
            currentSearchParams.delete('category');
        }

        if (ratingFilter.value && ratingFilter.value !== "Semua Rating") {
            currentSearchParams.set('rating', ratingFilter.value);
        } else {
            currentSearchParams.delete('rating');
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
        nav(newUrl, { replaceState: true });
    });

    return {
        categoryFilter,
        ratingFilter,
        searchKeyword
    };
}