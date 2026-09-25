import { NextResponse } from "next/server";
import { clearAvatar, requireSession, SessionError, setAvatar } from "@/modules/auth/avatar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    let userId: string;

    try {
        userId = await requireSession();
    } catch (err) {
        if (err instanceof SessionError) {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }

        throw err;
    }

    const form = await req.formData().catch(() => null);
    const file = form?.get("file");

    if (!file || typeof file === "string" || file.size === 0) {
        return NextResponse.json({ error: "Nenhuma imagem enviada" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: "Arquivo deve ser uma imagem" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: "Imagem deve ter no máximo 2MB" }, { status: 400 });
    }

    try {
        const user = await setAvatar(userId, file);
        return NextResponse.json({ user });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao enviar imagem";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE() {
    let userId: string;

    try {
        userId = await requireSession();
    } catch (err) {
        if (err instanceof SessionError) {
            return NextResponse.json({ error: err.message }, { status: 401 });
        }

        throw err;
    }

    try {
        const user = await clearAvatar(userId);
        return NextResponse.json({ user });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Erro ao remover imagem";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
