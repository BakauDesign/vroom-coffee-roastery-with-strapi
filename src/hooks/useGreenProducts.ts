import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export function useGreenProductsCMS() {
    const originFilter = useSignal("Semua Daerah");
    const processFilter = useSignal("Semua Proses");
    const gradeFilter = useSignal("Semua Grade");
    const searchKeyword = useSignal("");

    const nav = useNavigate();
    const loc = useLocation();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => originFilter.value);
        track(() => processFilter.value);
        track(() => gradeFilter.value);
        track(() => searchKeyword.value);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
        } else {
            currentSearchParams.delete('search');
        }

        if (originFilter.value && originFilter.value !== "Semua Daerah") {
            currentSearchParams.set('origin', originFilter.value);
        } else {
            currentSearchParams.delete('origin');
        }

        if (processFilter.value && processFilter.value !== "Semua Proses") {
            currentSearchParams.set('process', processFilter.value);
        } else {
            currentSearchParams.delete('process');
        }

        if (gradeFilter.value && gradeFilter.value !== "Semua Grade") {
            currentSearchParams.set('grade', gradeFilter.value);
        } else {
            currentSearchParams.delete('grade');
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
        nav(newUrl, { replaceState: true });
    });

    return {
        originFilter,
        processFilter,
        gradeFilter,
        searchKeyword
    };
}