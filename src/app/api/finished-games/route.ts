import { NextResponse } from 'next/server';
import { getSession } from '@/modules/auth/session';
import { finishedGameSchema } from '@/modules/finishedGames/validations';
import { createFinishedGame, listFinishedGamesByUser } from '@/modules/finishedGames/repository';

export const runtime = 'nodejs';

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const games = await listFinishedGamesByUser(session.userId);
    return NextResponse.json(games);
}

export async function POST(req: Request) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as
        | (Record<string, unknown> & { cover?: string | null })
        | null;

    const parsed = finishedGameSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: 'Dados inválidos', issues: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const game = await createFinishedGame(session.userId, {
        title: parsed.data.title,
        cover: body?.cover ?? null,
        platform: parsed.data.platform,
        finishedDate: parsed.data.finishedDate,
        totalHours: parsed.data.totalHours,
        rating: parsed.data.rating,
    });

    return NextResponse.json(game, { status: 201 });
}