import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export function useToolProductsCMS() {
    const typeFilter = useSignal("Semua Jenis Alat");
    const materialFilter = useSignal("Semua Material");
    const compatibilityFilter = useSignal("Semua Kompatibilitas");
    const searchKeyword = useSignal("");

    const nav = useNavigate();
    const loc = useLocation();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => typeFilter.value);
        track(() => materialFilter.value);
        track(() => compatibilityFilter.value);
        track(() => searchKeyword.value);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
        } else {
            currentSearchParams.delete('search');
        }

        if (typeFilter.value && typeFilter.value !== "Semua Jenis Alat") {
            currentSearchParams.set('type', typeFilter.value);
        } else {
            currentSearchParams.delete('type');
        }

        if (materialFilter.value && materialFilter.value !== "Semua Material") {
            currentSearchParams.set('material', materialFilter.value);
        } else {
            currentSearchParams.delete('material');
        }

        if (compatibilityFilter.value && compatibilityFilter.value !== "Semua Kompatibilitas") {
            currentSearchParams.set('compatibility', compatibilityFilter.value);
        } else {
            currentSearchParams.delete('compatibility');
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
        nav(newUrl, { replaceState: true });
    });

    return {
        typeFilter,
        materialFilter,
        compatibilityFilter,
        searchKeyword
    };
}