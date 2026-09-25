import { NextResponse } from "next/server";
import { requireSession, SessionError } from "@/modules/auth/avatar";
import { updateProfileSchema } from "@/modules/auth/validations";
import { updateUserProfile } from "@/modules/auth/repository";
import { getCurrentAvatarUrl, isBlobUrl } from "@/modules/auth/avatar";
import { del } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request) {
    let userId: string;

    try {
        userId = await requireSession();
    } catch (err) {
        if (err instanceof SessionError) {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }

        throw err;
    }

    const body = await req.json().catch(() => null);
    const parsed = updateProfileSchema.safeParse(body ?? {});

    if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
        return NextResponse.json({ error: message }, { status: 400 });
    }

    try {
        const { displayName, country, socials, avatarUrl } = parsed.data;

        if (avatarUrl !== undefined) {
            const current = await getCurrentAvatarUrl(userId);

            if (current && current !== avatarUrl && isBlobUrl(current)) {
                await del(current).catch(() => {});
            }
        }

        const user = await updateUserProfile(userId, {
            ...(displayName !== undefined ? { displayName } : {}),
            ...(country !== undefined ? { country } : {}),
            ...(socials !== undefined ? { socials } : {}),
            ...(avatarUrl !== undefined ? { avatarUrl } : {}),
        });

        return NextResponse.json({ user });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao atualizar perfil";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
