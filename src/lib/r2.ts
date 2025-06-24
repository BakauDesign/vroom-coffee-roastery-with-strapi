export async function uploadFileToBucket(
    file: File,
    bucket: R2Bucket
): Promise<{ path: string }> {
    if (!(file instanceof File)) {
        throw new Error("Invalid file object");
    }

    const timestamp = Date.now();
    const safeFileName = file.name.replace(/\s+/g, "_");
    const filePath = `${timestamp}-${safeFileName}`;

    const fileBuffer = await file.arrayBuffer();

    await bucket.put(filePath, fileBuffer, {
        httpMetadata: {
            contentType: file.type,
        },
    });

    return { path: filePath };
}

export async function deleteFileFromBucket(
    filePath: string,
    bucket: R2Bucket
) {
    await bucket.delete(filePath);
}