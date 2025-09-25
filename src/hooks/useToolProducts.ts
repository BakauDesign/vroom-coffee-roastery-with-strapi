import { useSignal, useVisibleTask$, useTask$, $, type Signal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { ToolsProduct } from "~/interfaces";
import type { Meta } from "~/server/services/products";

const SCROLL_POSITION_KEY = 'qwik_scroll_pos';

export function useToolProducts(initialProducts: Readonly<Signal<{
    response: {
        data: Array<ToolsProduct>;
        meta: Meta;
    };
    success: boolean;
    message: string;
}>> | Readonly<Signal<{
    success: boolean;
    message: string;
    response: null;
}>>) {
    const nav = useNavigate();
    const loc = useLocation();

    const searchKeywordParams = loc.url.searchParams.get('search') || '';
    const materialParams = loc.url.searchParams.get('material') || 'Semua Material';
    const pageParams = Number(loc.url.searchParams.get('page')) || 1;

    const productsData = useSignal<Array<ToolsProduct>>(initialProducts.value.response?.data || []);
    const meta = useSignal(initialProducts.value.response?.meta);
    const totalResult = useSignal(0);
    const page = useSignal(pageParams);

    // const typeFilter = useSignal("Semua Jenis Alat");
    const material = useSignal(materialParams);
    // const compatibilityFilter = useSignal("Semua Kompatibilitas");
    const searchKeyword = useSignal(searchKeywordParams);

    const loadMore = $(() => {
        if (
            meta.value && 
            meta.value.pagination.page >= meta.value.pagination.pageCount
        ) {
            return;
        }
        page.value++;
    });
    
    // eslint-disable-next-line qwik/no-use-visible-task
    useTask$(({ track }) => {
        // track(() => typeFilter.value);
        track(() => material.value);
        // track(() => compatibilityFilter.value);
        track(() => searchKeyword.value);
        track(() => page.value);
        track(() => initialProducts.value);

        const currentSearchParams = new URLSearchParams(loc.url.searchParams);

        if (searchKeyword.value) {
            productsData.value = [];
            currentSearchParams.set('search', searchKeyword.value);
            currentSearchParams.set('page', '1');
            page.value = 1;
        } else {
            productsData.value = [];
            currentSearchParams.delete('search');
        }

        // if (typeFilter.value && typeFilter.value !== "Semua Jenis Alat") {
        //     currentSearchParams.set('type', typeFilter.value);
        // } else {
        //     currentSearchParams.delete('type');
        // }

        if (material.value !== "Semua Material") {
            productsData.value = [];
            currentSearchParams.set('material', material.value);
            currentSearchParams.set('page', '1');
            page.value = 1;
        } else {
            productsData.value = [];
            currentSearchParams.delete('material');
        }

        // if (compatibilityFilter.value && compatibilityFilter.value !== "Semua Kompatibilitas") {
        //     currentSearchParams.set('compatibility', compatibilityFilter.value);
        // } else {
        //     currentSearchParams.delete('compatibility');
        // }

        currentSearchParams.set('page', page.value.toString());

        if (initialProducts.value.response?.data) {
            const newProducts = initialProducts.value.response?.data.filter(
                (newProduct) => !productsData.value.some(
                    (existingProduct) => existingProduct.documentId === newProduct.documentId
                )
            );

            productsData.value.push(...newProducts);
            meta.value = initialProducts.value.response?.meta;
        }
        
        // console.info(material.value, initialProducts.value.response?.data[0]);
        // console.info(material.value, productsData.value[0]);

        totalResult.value = productsData.value.length;

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;

        if (loc.url.toString() !== newUrl) {
            // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
            if (typeof window !== 'undefined' && window.scrollY > 0) {
                sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
            }
            nav(newUrl, { replaceState: true });
        }
    });

    // useTask$(({ track }) => {
    //     const trackedProductsData = track(() => initialProducts.value.response);

    //     const newProducts = trackedProductsData?.data.filter(
    //         (newProduct) => !productsData.value.some(
    //             (existingProduct) => existingProduct.documentId === newProduct.documentId
    //         )
    //     );

        
    //     console.info(material.value, trackedProductsData?.data?.[0]);
    //     console.info(material.value, newProducts);

    //     productsData.value.push(...newProducts || []);
    //     meta.value = trackedProductsData?.meta;

    //     const newUrl = `${loc.url}`;

    //     // if (loc.url.toString() !== newUrl) {
    //     //     // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
    //     //     if (typeof window !== 'undefined' && window.scrollY > 0) {
    //     //         sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    //     //     }
    //         nav(loc.url, { replaceState: true });
    //     // }
    // })

    useVisibleTask$(({ track }) => {
        // Track perubahan URL secara keseluruhan atau filter, untuk memastikan ini berjalan
        track(() => loc.url.searchParams.toString());

        // Pastikan ini hanya berjalan di browser
        if (typeof window !== 'undefined') {
            const storedScrollY = sessionStorage.getItem(SCROLL_POSITION_KEY);
            if (storedScrollY) {
                const scrollY = parseInt(storedScrollY, 10);
                // Gunakan setTimeout kecil untuk memberi waktu DOM diperbarui
                // atau tunggu sampai Qwik selesai me-render
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: scrollY,
                        behavior: 'instant' // Hindari animasi scroll yang terlihat
                    });
                    sessionStorage.removeItem(SCROLL_POSITION_KEY); // Hapus setelah digunakan
                });
            }
        }
    });

    return {
        material,
        searchKeyword,
        loadMore,
        productsData,
        totalResult
    };
}