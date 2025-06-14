import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ params, send, platform, headers }) => {
    const filePath = params.path;

    if (!filePath) {
        send(400, { message: "Bad Request: File path is missing in the request." });
        return;
    }
    
    try {
        const file = await platform.env.BUCKET.get(filePath);
    
        if (!file) {
            send(404, { message: `Not Found: File '${filePath}' not found.` });
            return;
        }
    
        if (file.size === 0) {
            send(404, { message: `Not Found: File '${filePath}' is empty.` });
            return;
        }

        const contentType = file.httpMetadata?.contentType || 'application/octet-stream';
        const buffer = await file.arrayBuffer();

        headers.set('Content-Type', contentType);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        if (file.etag) {
            headers.set('ETag', file.etag);
        }

        if (file.uploaded) {
            headers.set('Last-Modified', file.uploaded.toUTCString());
        }

        send(200, buffer);
    } catch (err: any) {
        send(500, { message: `Internal Server Error: Failed to retrieve file '${filePath}'.` });
    }
};

export const onPost: RequestHandler = async ({ request, send, platform }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file || !(file instanceof File)) {
            send(400, { message: "No file provided or invalid file type." });
            return;
        }

        const fileName = file.name;
        const filePath = `uploads/${Date.now()}-${fileName.replace(/\s+/g, '_')}`;

        await platform.env.BUCKET.put(filePath, file.stream(), {
            httpMetadata: { contentType: file.type },
        });

        send(201, {
            message: "File uploaded successfully!", 
            path: filePath,
            url: `/api/files/${filePath}`
        });

    } catch (error) {
        send(500, { message: "Failed to upload file." });
    }
};


export const onPut: RequestHandler = async ({ request, params, send, platform }) => {
    const filePath = params.path;

    if (!filePath) {
        send(400, { message: "File path is missing in the request." });
        return;
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file || !(file instanceof File)) {
            send(400, { message: "No file provided or invalid file type." });
            return;
        }

        await platform.env.BUCKET.put(filePath, file.stream(), {
            httpMetadata: { contentType: file.type },
        });

        console.log(`File updated: ${filePath}`);

        send(200, {
            message: "File updated successfully!", 
            path: filePath,
            url: `/api/files/${filePath}`
        });

    } catch (error) {
        console.error("Error updating file:", error);
        send(500, { message: "Failed to update file." });
    }
};

export const onDelete: RequestHandler = async ({ params, send, platform }) => {
    const filePath = params.path;

    if (!filePath) {
        send(400, { message: "File path is missing in the request." });
        return;
    }

    try {
        await platform.env.BUCKET.delete(filePath);

        console.log(`File deleted: ${filePath}`);

        send(200, { message: `File '${filePath}' deleted successfully.` });

    } catch (error) {
        console.error("Error deleting file:", error);
        send(500, { message: "Failed to delete file." });
    }
};