import { del, put } from "@vercel/blob";
import { getSession } from "./session";
import { findUserById, updateUserAvatar } from "./repository";
import type { User } from "./types";

export async function uploadAvatar(file: File): Promise<string> {
    const pathname = `avatars/${crypto.randomUUID()}.${file.name.split(".").pop() ?? "webp"}`;

    const blob = await put(pathname, file, {
        access: "public",
        addRandomSuffix: true,
    });

    return blob.url;
}

export async function getCurrentAvatarUrl(userId: string): Promise<string | null> {
    const user = await findUserById(userId);
    return user?.avatarUrl ?? null;
}

export async function setAvatar(userId: string, file: File): Promise<User> {
    const oldAvatar = await getCurrentAvatarUrl(userId);
    const newAvatar = await uploadAvatar(file);

    const user = await updateUserAvatar(userId, newAvatar);

    if (oldAvatar) {
        await deleteAvatarBlob(oldAvatar);
    }

    return user;
}

export async function clearAvatar(userId: string): Promise<User> {
    const oldAvatar = await getCurrentAvatarUrl(userId);

    if (!oldAvatar) {
        const current = await findUserById(userId);
        return current as User;
    }

    const user = await updateUserAvatar(userId, null);

    if (isBlobUrl(oldAvatar)) {
        await deleteAvatarBlob(oldAvatar);
    }

    return user;
}

function isBlobUrl(url: string): boolean {
    return url.includes(".public.blob.vercel-storage.com");
}

async function deleteAvatarBlob(url: string): Promise<void> {
    try {
        await del(url);
    } catch {
        // Falha ao remover o blob antigo não deve impedir a troca de avatar.
    }
}

export async function requireSession(): Promise<string> {
    const session = await getSession();

    if (!session) {
        throw new SessionError();
    }

    return session.userId;
}

export class SessionError extends Error {
    constructor() {
        super("Não autenticado");
    }
}
