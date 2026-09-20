import { NextResponse } from 'next/server';
import { getSession } from '@/modules/auth/session';
import { removeFinishedGame } from '@/modules/finishedGames/repository';

export const runtime = 'nodejs';

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { id } = await params;
    const removed = await removeFinishedGame(session.userId, id);

    if (!removed) {
        return NextResponse.json({ error: 'Jogo não encontrado' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
}