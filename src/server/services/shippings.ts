
import { Shipping } from '~/interfaces';


import { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import { isDev } from '@builder.io/qwik';

const API = `${isDev ? "http://localhost:1337/api/" : "https://joyful-rainbow-219376c196.strapiapp.com/api/"}`;

export interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>;
}

export interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

type ShippingsQuery = {
    is_active?: boolean;
    event: RequestEventLoader<QwikCityPlatform>;
}

// type Meta = {
//     pagination: {
//         page: number,
//         pageSize: number,
//         pageCount: number,
//         total: number
//     }
// }

export async function getShipping({
    is_active = true,
}: ShippingsQuery) {
    try {
        const is_active_filter = `${is_active ? `&filters[aktif][$eq]=${is_active || true}` : ``}`;
        const populate_field = `
            &populate[0]=logo
        `.replace(/\s/g, '');

        const request = await fetch(`${API}layanan-pengirimans?${populate_field}${is_active_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Array<Shipping>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching shippings"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching shippings",
            data: []
        };
    }
}