import * as v from 'valibot';
import { $, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import type { RoastedBeansProduct } from "~/interfaces";
import { ServingRecomendationSchema } from "~/schema/product";

type roastedProducts = {
    totalItems: number;
    initialPerPage: number;
    products: Array<RoastedBeansProduct>;
}

const SCROLL_POSITION_KEY = 'qwik_scroll_pos';

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
    const nav = useNavigate();
    const loc = useLocation();

    const brewingMethod = useSignal(loc.url.searchParams.get('brewingMethod') || 'Semua Metode');
    const searchKeyword = useSignal("");
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

    // eslint-disable-next-line qwik/no-use-visible-task
    useTask$(({ track }) => {
        track(() => brewingMethod.value);
        track(() => searchKeyword.value);

        if (searchKeyword.value) {
            currentSearchParams.set('search', searchKeyword.value);
        } else {
            currentSearchParams.delete('search');
        }

        if (brewingMethod.value !== "Semua Metode") {
            currentSearchParams.set('brewingMethod', brewingMethod.value);
        } else {
            currentSearchParams.delete('brewingMethod');
        }

        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
        // nav(newUrl, { replaceState: true });

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
        brewingMethod,
        searchKeyword
    };
}

export type ServingRecommendation = v.InferInput<typeof ServingRecomendationSchema>;

/**
 * @typedef {Object} UseServingRecommendationsReturn
 * @property {Signal<ServingRecommendation[]>} recommendations - A Qwik Signal holding the array of serving recommendations.
 * @property {QRL<(recommendation: ServingRecommendation) => void>} addRecommendation$ - QRL function to add a new serving recommendation to the list.
 * @property {QRL<(index: number) => void>} removeRecommendation$ - QRL function to remove a serving recommendation by its index.
 * @property {QRL<(index: number, newName: string, newDescription: string) => void>} updateRecommendation$ - QRL function to update an existing serving recommendation by its index.
 * @property {QRL<(newRecommendations: ServingRecommendation[]) => void>} setRecommendations$ - QRL function to replace the entire list of recommendations.
 */

/**
 * `useServingRecommendations` is a Qwik hook for managing a list of serving recommendations.
 * It provides reactive state and utility functions to add, remove, and update recommendations.
 *
 * @returns {UseServingRecommendationsReturn} An object containing the list of recommendations as a Signal,
 * and QRL functions to manipulate the list.
 */
export function useServingRecommendations() {
    /**
     * @type {Signal<ServingRecommendation[]>}
     * A Qwik Signal that holds the array of serving recommendations.
     * This array is reactive and will trigger updates in components that track it.
     */
    const recommendations = useSignal<ServingRecommendation[]>([]);

    /**
     * Adds a new serving recommendation to the list.
     * @param {ServingRecommendation} recommendation - The new recommendation object to add.
     * @returns {void}
     */
    const addRecommendation$ = $((recommendation: ServingRecommendation) => {
        // Validasi input sebelum menambahkan (opsional, bisa juga ditangani oleh form yang memanggil hook ini)
        const result = v.safeParse(ServingRecomendationSchema, recommendation);
        if (result.success) {
            recommendations.value = [...recommendations.value, result.output];
            // form.
        } else {
            console.error('Invalid serving recommendation:', result.issues);
            // Anda bisa melemparkan error atau mengembalikan boolean untuk indikasi kegagalan
        }
    });

    /**
     * Removes a serving recommendation from the list by its index.
     * @param {number} index - The index of the recommendation to remove.
     * @returns {void}
     */
    const removeRecommendation$ = $((index: number) => {
        recommendations.value = recommendations.value.filter((_, i) => i !== index);
    });

    /**
     * Updates an existing serving recommendation at a specific index.
     * @param {number} index - The index of the recommendation to update.
     * @param {string} newName - The new name for the recommendation.
     * @param {string} newDescription - The new description for the recommendation.
     * @returns {void}
     */
    const updateRecommendation$ = $((index: number, newName: string, newDescription: string) => {
        const updatedRecs = [...recommendations.value];
        if (updatedRecs[index]) {
            const updatedItem: ServingRecommendation = {
                name: newName,
                description: newDescription
            };
            const result = v.safeParse(ServingRecomendationSchema, updatedItem);
            if (result.success) {
                updatedRecs[index] = result.output;
                recommendations.value = updatedRecs;
            } else {
                console.error('Invalid update for serving recommendation:', result.issues);
            }
        }
    });

    /**
     * Replaces the entire list of serving recommendations.
     * This is useful for initializing the list from an external source (e.g., loaded form data).
     * @param {ServingRecommendation[]} newRecommendations - The new array of recommendations.
     * @returns {void}
     */
    const setRecommendations$ = $((newRecommendations: ServingRecommendation[]) => {
        // Optional: Validasi semua item dalam array baru jika diperlukan
        const allValid = newRecommendations.every(rec => v.safeParse(ServingRecomendationSchema, rec).success);
        if (allValid) {
            recommendations.value = newRecommendations;
        } else {
            console.error('One or more new recommendations are invalid.');
        }
    });

    return {
        recommendations,
        addRecommendation$,
        removeRecommendation$,
        updateRecommendation$,
        setRecommendations$
    };
}