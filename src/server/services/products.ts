import { getDB } from '~/lib/db';

import { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";
import { isDev } from '@builder.io/qwik';
import { GreenBeansProduct, GreenBeansProductWithReviews, Products, RoastedBeansProduct, RoastedBeansProductWithReviews, ToolsProduct, ToolsProductWithReviews } from '~/interfaces';

const API = `${isDev ? "http://localhost:1337/api/" : "https://joyful-rainbow-219376c196.strapiapp.com/api/"}`;

export interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>;
}

export interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

type ProductsQuery = {
    type?: string;
    is_active?: boolean;
    highlighted?: boolean;
    event: RequestEventLoader<QwikCityPlatform>;
}

type Meta = {
    pagination: {
        page: number,
        pageSize: number,
        pageCount: number,
        total: number
    }
}

// type ProductsResponse<T> = {
//     data: T;
//     meta: Meta;
// }

export async function getHighlightedProduct ({
    event
}: LoaderParams) {
    const { platform } = event;
    
    try {
        const db = await getDB(platform.env);
        
        const products = await db.product.findMany({
            where: {
                is_highlight: true,
                is_active: true
            }
        });

        return {
            data: products,
            success: true,
            message: "Success retrieved product" 
        };

    } catch (error) {
        return {
            data: [],
            success: false,
            message: "Error in product" 
        };   
    }
}

// export async function getProducts({
//     is_active = true,
//     highlighted = false,
//     type,
//     // event
// }: ProductsQuery) {
//     // const productType = extractType(event.url.pathname);

//     // const keyword = event.url.searchParams.get("search");
//     // const brewingMethod = event.url.searchParams.get("brewingMethod");

//     try {
//         // const type_filter = `${type ? `&filters[jenis][$eq]=${type}` : ``}`;
//         const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
//         const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;

//         const request = await fetch(`${API}${type || 'produk-green-beans'}?populate=all${is_active_filter}${highlighted_filter}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         const response: {
//             data: Array<Products>;
//         } = await request.json();

//         return {
//             ...response,
//             success: false,
//             message: "Success fetching products"
//         };
//     } catch (e) {
//         if (isDev) {
//             console.info(e);
//         }
//         return {
//             success: false,
//             message: "Error fetching products",
//             data: []
//         };
//     }
// }

export async function getRoastedBeansProducts({
    is_active = true,
    highlighted = false,
    event: { query }
}: ProductsQuery) {
    try {
        const brewingMethod = query.get("brewingMethod");
        const search = query.get("search");

        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;
        const brewing_method_filter = `${brewingMethod ? `&filters[daftar_rekomendasi_penyajian][nama][$eqi]=${brewingMethod}` : ``}`;
        const search_filter = `${search ? `&filters[informasi_produk][nama][$containsi]=${search}` : ``}`;

        const populate_field = `
            &populate[0]=informasi_produk.foto
            &populate[1]=daftar_varian_kemasan
            &populate[3]=daftar_rekomendasi_penyajian
        `.replace(/\s/g, '');

        const request = await fetch(`${API}produk-roasted-beans?${populate_field}${is_active_filter}${highlighted_filter}${brewing_method_filter}${search_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Array<RoastedBeansProduct>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getGreenBeansProducts({
    is_active = true,
    highlighted = false,
    // event
}: ProductsQuery) {
    // const productType = extractType(event.url.pathname);

    // const keyword = event.url.searchParams.get("search");
    // const brewingMethod = event.url.searchParams.get("brewingMethod");

    try {
        // const type_filter = `${type ? `&filters[jenis][$eq]=${type}` : ``}`;
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;

        const request = await fetch(`${API}produk-green-beans?populate=all${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Array<GreenBeansProduct>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getToolsProducts({
    is_active = true,
    highlighted = false
}: ProductsQuery) {
    try {
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;
        const populate_field = `
            &populate[0]=informasi_produk.foto
            &populate[1]=daftar_fitur_utama
        `.replace(/\s/g, '');

        const request = await fetch(`${API}produk-tools?${populate_field}${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Array<ToolsProduct>;
            meta: Meta;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getProductById({
    type,
    is_active = true,
    highlighted = false,
    event
}: ProductsQuery) {

    try {
        // const type_filter = `${type ? `&filters[jenis][$eq]=${type}` : ``}`;
        const id_filter = `${event.params.id ? `&filters[id][$eq]=${event.params.id}`: ``}`;
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;

        const request = await fetch(`${API}${type || 'produk-green-beans'}?populate=all${id_filter}${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const response: {
            data: Array<Products>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getGreenBeansProductById({
    is_active = true,
    highlighted = false,
    event
}: ProductsQuery) {

    try {
        const slug_filter = `${event.params.id ? `&filters[slug][$eq]=${event.params.id}`: ``}`;
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;
        const populate_field = `
            &populate[0]=informasi_produk.foto
            &populate[1]=ulasan_produk_green_beans.informasi_ulasan
        `.replace(/\s/g, '');

        const request = await fetch(`${API}produk-green-beans?${populate_field}${slug_filter}${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        
        const response: {
            data: Array<GreenBeansProductWithReviews>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getRoastedBeansProductById({
    is_active = true,
    highlighted = false,
    event
}: ProductsQuery) {

    try {
        const slug_filter = `${event.params.id ? `&filters[slug][$eq]=${event.params.id}`: ``}`;
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;
        const populate_field = `
            &populate[0]=informasi_produk.foto
            &populate[1]=daftar_varian_kemasan
            &populate[3]=daftar_rekomendasi_penyajian
            &populate[4]=ulasan_produk_roasted_beans.informasi_ulasan
        `.replace(/\s/g, '');

        const request = await fetch(`${API}produk-roasted-beans?${populate_field}${slug_filter}${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const response: {
            data: Array<RoastedBeansProductWithReviews>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export async function getToolsProductById({
    is_active = true,
    highlighted = false,
    event
}: ProductsQuery) {
    try {
        const slug_filter = `${event.params.id ? `&filters[slug][$eq]=${event.params.id}`: ``}`;
        const is_active_filter = `${is_active ? `&filters[informasi_produk][aktif][$eq]=${is_active || true}` : ``}`;
        const highlighted_filter = `${highlighted ? `&filters[informasi_produk][highlighted][$eq]=${highlighted}`: ``}`;
        const populate_field = `
            &populate[0]=informasi_produk.foto
            &populate[1]=daftar_fitur_utama
        `.replace(/\s/g, '');

        const request = await fetch(`${API}produk-tools?${populate_field}${slug_filter}${is_active_filter}${highlighted_filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const response: {
            data: Array<ToolsProductWithReviews>;
        } = await request.json();

        return {
            ...response,
            success: false,
            message: "Success fetching products"
        };
    } catch (e) {
        if (isDev) {
            console.info(e);
        }
        return {
            success: false,
            message: "Error fetching products",
            data: []
        };
    }
}

export function extractType(pathname: string) {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const productTypeSlug = pathSegments[2] || pathSegments[1];

    const spacedType = productTypeSlug.replace(/-/g, ' ');

    const formattedType = spacedType.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return formattedType;
}