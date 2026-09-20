import { NextResponse } from 'next/server';
import { searchCatalogGames } from '@/modules/catalog/igdb.service';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') ?? '';

    if (!query.trim()) {
        return NextResponse.json([]);
    }

    try {
        const results = await searchCatalogGames(query.trim());
        return NextResponse.json(results);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Erro ao buscar jogos';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}