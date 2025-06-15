import { $, useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

import {
    useLocation,
    useNavigate
} from '@builder.io/qwik-city';

type Users = {
    totalItems: number;
    initialPerPage?: Signal<number>;
}

export function useUsers({
    totalItems,
    initialPerPage
}: Users) {
    const loc = useLocation();
    const nav = useNavigate();
    const currentSearchParams = new URLSearchParams(loc.url.searchParams);

        
    const CURRENT_PAGE = useSignal(parseInt(currentSearchParams.get('currentPage') || '1') || 1);
    const TOTAL_ITEMS = useSignal(totalItems);
    const PER_PAGE = useSignal(initialPerPage?.value || 10);
    const TOTAL_PAGE = useSignal(Math.ceil(TOTAL_ITEMS.value / PER_PAGE.value));

    const handleSearchValueChange = $((value: string) => {
        currentSearchParams.set('search', value);
        currentSearchParams.set('currentPage', '1');
        CURRENT_PAGE.value = 1;
    
        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
    
        nav(newUrl, { replaceState: true });
    });

    const handlePageChange = $((value: string) => {
        CURRENT_PAGE.value = parseInt(value);
        currentSearchParams.set('currentPage', value);
        currentSearchParams.set('search', '');
    
        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
    
        nav(newUrl, { replaceState: true });
    });

    const handlePerPageChange = $((value: string) => {
        CURRENT_PAGE.value = parseInt(value);
        currentSearchParams.set('currentPage', '1');
        currentSearchParams.set('perPage', value);
        currentSearchParams.set('search', '');
    
        const newUrl = `${loc.url.pathname}?${currentSearchParams.toString()}`;
    
        nav(newUrl);
    });

    return {
        handleSearchValueChange,
        handlePageChange,
        handlePerPageChange,
        PER_PAGE,
        CURRENT_PAGE,
        TOTAL_ITEMS,
        TOTAL_PAGE,
    };
}