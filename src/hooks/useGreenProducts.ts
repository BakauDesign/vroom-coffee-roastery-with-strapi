import { useSignal, useVisibleTask$, useTask$, $, type Signal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { GreenBeansProduct } from "~/interfaces";
import type { Meta } from "~/server/services/products";

const SCROLL_POSITION_KEY = 'qwik_scroll_pos';

export function useGreenProducts(initialProducts: Readonly<Signal<{
    response: {
        data: Array<GreenBeansProduct>;
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

    const asalParams = loc.url.searchParams.get('asal') || 'Semua Daerah';
    const prosesParams = loc.url.searchParams.get('proses') || 'Semua Proses';
    const searchKeywordParams = loc.url.searchParams.get('search') || '';
    const pageParams = Number(loc.url.searchParams.get('page')) || 1;

    const productsData = useSignal<Array<GreenBeansProduct>>([]);
    const meta = useSignal(initialProducts.value.response?.meta);
    const page = useSignal(pageParams);

    const asal = useSignal(asalParams);
    const proses = useSignal(prosesParams);
    const searchKeyword = useSignal(searchKeywordParams);

    const loadMore = $(function loadMore() {
        if (
            meta.value && 
            meta.value.pagination.page >= meta.value.pagination.pageCount
        ) {
            return;
        }
        const currentSearchParams = new URLSearchParams(loc.url.searchParams);
        currentSearchParams.set('page', (page.value + 1).toString());

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;

        if (loc.url.toString() !== newUrl) {
            // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
            if (typeof window !== 'undefined' && window.scrollY > 0) {
                sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
            }
            nav(newUrl, { replaceState: true });
        }
        page.value = page.value + 1;
    });

    // useTask$(({ track }) => {
    //     track(() => page.value);
    //     track(() => initialProducts.value.response?.data);

    //     console.info(page.value)

    //     if (initialProducts.value.response?.data) {
    //         if (page.value === 1) {
    //             productsData.value = initialProducts.value.response.data;

    //             const currentSearchParams = new URLSearchParams(loc.url.searchParams);
    //             currentSearchParams.set('page', page.value.toString());

    //             const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;

    //             if (loc.url.toString() !== newUrl) {
    //                 // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
    //                 if (typeof window !== 'undefined' && window.scrollY > 0) {
    //                     sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    //                 }
    //                 nav(newUrl, { replaceState: true });
    //             }
    //         } else {
    //             const newProducts = initialProducts.value.response.data.filter(
    //                 (newProduct) => !productsData.value.some(
    //                     (existingProduct) => existingProduct.documentId === newProduct.documentId
    //                 )
    //             );

    //             productsData.value.push(...newProducts);
    //         }
    //         meta.value = initialProducts.value.response.meta;
    //     }
    // })
    
    // eslint-disable-next-line qwik/no-use-visible-task
    useTask$(({ track }) => {
        track(() => asal.value);
        track(() => proses.value);
        track(() => searchKeyword.value);
        track(() => page.value);
        track(() => initialProducts.value.response?.data);

        const currentSearchParams = new URLSearchParams(loc.url.searchParams);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
            currentSearchParams.set('page', '1');
            page.value = 1;
        } else {
            currentSearchParams.delete('search');
        }

        if (asal.value !== "Semua Daerah") {
            currentSearchParams.set('asal', asal.value);
            currentSearchParams.set('page', '1');
            page.value = 1;
        } else {
            currentSearchParams.delete('asal');
        }

        if (proses.value !== "Semua Proses") {
            currentSearchParams.set('proses', proses.value);
            currentSearchParams.set('page', '1');
            page.value = 1;
        } else {
            currentSearchParams.delete('proses');
        }

        if (initialProducts.value.response?.data) {
            if (page.value === 1) {
                productsData.value = initialProducts.value.response.data;

                const currentSearchParams = new URLSearchParams(loc.url.searchParams);
                currentSearchParams.set('page', page.value.toString());

                const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;

                if (loc.url.toString() !== newUrl) {
                    // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
                    if (typeof window !== 'undefined' && window.scrollY > 0) {
                        sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
                    }
                    nav(newUrl, { replaceState: true });
                }
            } else {
                const newProducts = initialProducts.value.response.data.filter(
                    (newProduct) => !productsData.value.some(
                        (existingProduct) => existingProduct.documentId === newProduct.documentId
                    )
                );

                productsData.value.push(...newProducts);
            }
            meta.value = initialProducts.value.response.meta;
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;

        if (loc.url.toString() !== newUrl) {
            // Simpan posisi scroll sebelum navigasi (akan dipulihkan oleh useTask$ lain)
            if (typeof window !== 'undefined' && window.scrollY > 0) {
                sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
            }
            nav(newUrl, { replaceState: true });
        }
    });

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
        asal,
        proses,
        searchKeyword,
        loadMore,
        productsData
    };
}