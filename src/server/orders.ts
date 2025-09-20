import { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import { isDev } from '@builder.io/qwik';
import { CreateRoastedBeanOrderForm, CreateToolOrderForm } from '~/schema/order';

const API = `${isDev ? "http://localhost:1337/api/" : "https://joyful-rainbow-219376c196.strapiapp.com/api/"}`;

export interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>;
}

export interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

export async function createRoastedBeansOrder({
    values,
    event: { redirect }
}: ActionParams<CreateRoastedBeanOrderForm>) {
    try {
        const cleanedValues = {
            ...values,
            produk_yang_dibeli: values.produk_yang_dibeli.map((item) => {
                const { documentId, ...rest } = item;
                return rest;
            }),
        };

        const request = await fetch(`${API}pesanan-produk-roasted-beans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: cleanedValues })
        });

        if (isDev) {
            const response = await request.json();
            console.info(response);
        }

        if (request.ok) {
            return redirect(301, '/products/roasted-coffee-beans/orders/success',);
        } else {
            return redirect(301, '/products/roasted-coffee-beans/orders/error',);
        }
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        throw redirect(301, '/products/roasted-coffee-beans/orders/error',);
    }
}


export async function createToolsOrder({
    values,
    event: { redirect }
}: ActionParams<CreateToolOrderForm>) {
    try {
        const cleanedValues = {
            ...values,
            produk_yang_dibeli: values.produk_yang_dibeli.map((item) => {
                const { documentId, ...rest } = item;
                return rest;
            }),
        };

        const request = await fetch(`${API}pesanan-produk-tools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: cleanedValues })
        });

        if (isDev) {
            const response = await request.json();
            console.info(response);
        }

        if (request.ok) {
            return redirect(301, '/products/coffee-tools/orders/success',);
        } else {
            return redirect(301, '/products/coffee-tools/orders/error',);
        }
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        throw redirect(301, '/products/coffee-tools/orders/error',);
    }
}