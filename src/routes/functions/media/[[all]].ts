/// <reference types="@cloudflare/workers-types" />

interface Env {
    BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const path = new URL(context.request.url).pathname.replace("/media", "");

    const file = await context.env.BUCKET.get(path);

    if (!file || !file.body) {
        return new Response("Not Found", { status: 404 });
    }

    return new Response(file.body, {
        headers: {
            "Content-Type": file.httpMetadata?.contentType || "application/octet-stream",
            "Cache-Control": "public, max-age=86400",
        },
    });
};
