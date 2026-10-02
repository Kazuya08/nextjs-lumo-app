import { NextRequest, NextResponse } from "next/server";
import { getUpcomingReleases } from "@/modules/catalog/igdb.service";
function isValidDate(value: string | null): value is string {
    if (!value) {
        return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime());
}
export async function GET(request: NextRequest) {
    try {
        const start = request.nextUrl.searchParams.get("start");
        const end = request.nextUrl.searchParams.get("end");
        if (!isValidDate(start) || !isValidDate(end)) {
            return NextResponse.json(
                { error: "As datas start e end são obrigatórias no formato YYYY-MM-DD." },
                { status: 400 }
            );
        }
        const startDate = new Date(`${start}T00:00:00Z`);
        const endDate = new Date(`${end}T00:00:00Z`);
        if (startDate.getTime() > endDate.getTime()) {
            return NextResponse.json(
                { error: "A data inicial não pode ser maior que a data final." },
                { status: 400 }
            );
        }
        console.log(`[Releases API] Buscando lançamentos: ${start} até ${end}`);
        const games = await getUpcomingReleases(start, end, 50);
        console.log(`[Releases API] ${games.length} jogos encontrados`);
        return NextResponse.json(games, { status: 200 });
    } catch (error) {
        console.error("[Releases API] Erro:", error);
        const message =
            error instanceof Error ? error.message : "Erro desconhecido ao buscar lançamentos.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
