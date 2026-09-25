const AVATAR_SIZE = 256;

export { AVATAR_SIZE };

export async function compressAvatar(file: File): Promise<File> {
    const bitmap = await createImageBitmap(file);

    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Falha ao processar a imagem");
    }

    const side = Math.min(bitmap.width, bitmap.height);
    const sx = (bitmap.width - side) / 2;
    const sy = (bitmap.height - side) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE);

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.8)
    );

    if (!blob) {
        throw new Error("Falha ao processar a imagem");
    }

    return new File([blob], "avatar.webp", { type: "image/webp" });
}

export async function dataUrlToFile(dataUrl: string): Promise<File> {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const ext = blob.type.split("/")[1] ?? "webp";
    return new File([blob], `avatar.${ext}`, { type: blob.type });
}
