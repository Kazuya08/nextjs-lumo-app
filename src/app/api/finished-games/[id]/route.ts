import { NextResponse } from "next/server";
import { getSession } from "@/modules/auth/session";
import { finishedGameSchema } from "@/modules/finishedGames/validations";
import { removeFinishedGame, updateFinishedGame } from "@/modules/finishedGames/repository";

export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;
    const removed = await removeFinishedGame(session.userId, id);

    if (!removed) {
        return NextResponse.json({ error: "Jogo não encontrado" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { id } = await params;

    const body = (await req.json().catch(() => null)) as
        (Record<string, unknown> & { cover?: string | null }) | null;

    const parsed = finishedGameSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Dados inválidos", issues: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const game = await updateFinishedGame(session.userId, id, {
        title: parsed.data.title,
        cover: body?.cover ?? null,
        platform: parsed.data.platform,
        finishedDate: parsed.data.finishedDate,
        finishedTime: parsed.data.finishedTime,
        totalHours: parsed.data.totalHours,
        rating: parsed.data.rating,
    });

    if (!game) {
        return NextResponse.json({ error: "Jogo não encontrado" }, { status: 404 });
    }

    return NextResponse.json(game);
}
