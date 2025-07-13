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