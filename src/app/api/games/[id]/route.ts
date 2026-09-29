import { NextResponse } from "next/server";
import { getCatalogGameDetails } from "@/modules/catalog/igdb.service";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const gameId = Number(id);

    if (!Number.isInteger(gameId) || gameId <= 0) {
        return NextResponse.json({ error: "ID de jogo inválido" }, { status: 400 });
    }

    try {
        const game = await getCatalogGameDetails(gameId);

        if (!game) {
            return NextResponse.json({ error: "Jogo não encontrado" }, { status: 404 });
        }

        return NextResponse.json(game);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao buscar detalhes do jogo";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
