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
): Promise<{ success: boolean; message: string }> {
    try {
        const object = await bucket.head(filePath);

        if (!object) {
            return { success: true, message: `File not found at ${filePath}.` };
        }

        await bucket.delete(filePath);
        return { success: true, message: `File ${filePath} deleted successfully.` };

    } catch (error) {
        return { success: false, message: `Failed to delete file ${filePath}: ${error instanceof Error ? error.message : String(error)}` };
    }
}