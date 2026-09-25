"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, Loader2, Trash2 } from "lucide-react";

const AVATAR_SIZE = 256;

async function compressAvatar(file: File): Promise<File> {
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

export function ProfileAvatar() {
    const { user, updateAvatar, removeAvatar } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [nonce, setNonce] = useState(Date.now());

    const avatarUrl = preview ?? user?.avatarUrl ?? null;
    const initial = user?.name?.trim().charAt(0).toUpperCase() ?? "?";

    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";

        if (!file) {
            return;
        }

        setError(null);
        setPreview(URL.createObjectURL(file));
        setUploading(true);

        try {
            const compressed = await compressAvatar(file);
            await updateAvatar(compressed);
            setNonce(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao enviar imagem");
        } finally {
            setPreview(null);
            setUploading(false);
        }
    };

    const handleRemove = async () => {
        setError(null);

        try {
            await removeAvatar();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao remover imagem");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-muted text-4xl font-bold text-muted-foreground">
                    {avatarUrl ? (
                        <Image
                            src={`${avatarUrl}?v=${nonce}`}
                            alt={`Avatar de ${user?.name ?? "usuário"}`}
                            width={AVATAR_SIZE}
                            height={AVATAR_SIZE}
                            priority
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        initial
                    )}
                </div>

                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                    </div>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
            />

            <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                >
                    <Camera className="mr-2 h-4 w-4" />
                    {avatarUrl ? "Trocar foto" : "Enviar foto"}
                </Button>

                {avatarUrl && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        disabled={uploading}
                        onClick={handleRemove}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                    </Button>
                )}
            </div>

            {error && (
                <Alert variant="destructive" className="max-w-sm">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
