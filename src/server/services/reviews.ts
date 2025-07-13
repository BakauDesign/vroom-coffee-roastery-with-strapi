import { CreateReviewForm } from "~/schema/review";

import { getDB } from "~/lib/db";
import type { RequestEventAction, RequestEventLoader } from "@builder.io/qwik-city";

interface ActionParams<T extends any> {
    values: T;
    event: RequestEventAction<QwikCityPlatform>;
}

interface LoaderParams {
    event: RequestEventLoader<QwikCityPlatform>
}

export async function createReviewCustomer({
    values,
    event,
}: ActionParams<CreateReviewForm>) {
    const { platform, params } = event;
    const productId = parseInt(params.id);

    const db = await getDB(platform.env);

    try {
        const reviewData = {
            name: values.name,
            location: values.location,
            rating: values.rating,
            content: values.content,
            is_hidden: false,
            product_id: productId
        };

        await db.review.create({
            data: reviewData
        });

        return {
            success: true,
            message: "Review berhasil ditambahkan!"
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Gagal menambahkan review"
        };
    }
}

export async function getReviews({
    event,
}: LoaderParams) {
    const { platform, url } = event;
    
    const keyword = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const rating = url.searchParams.get('rating');

    const db = await getDB(platform.env);

    try {
        if (keyword || category || rating) {
            const reviews = await db.product.findMany({
                where: {
                    name: { contains: keyword || "" },
                    type: { contains: category || "" },
                    review: {
                        some: { rating: (rating && parseInt(rating)) || undefined }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    review: {
                        select: {
                            rating: true,
                            content: true
                        }
                    }
                }
            });

            return {
                success: true,
                data: reviews,
                message: "Review berhasil diambil!"
            };
        }
        const reviews = await db.product.findMany({
            select: {
                id: true,
                name: true,
                review: {
                    select: {
                        rating: true,
                        content: true
                    }
                }
            }
        });

        return {
            success: true,
            data: reviews,
            message: "Review berhasil diambil!"
        };
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error.message || "Gagal mengambil review"
        };
    }
}