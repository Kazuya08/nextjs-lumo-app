"use server";
import { getUpcomingReleases } from "@/modules/catalog/igdb.service";
export async function loadUpcomingReleases(startDate: string, endDate: string) {
    try {
        const games = await getUpcomingReleases(startDate, endDate, 50);
        return { success: true as const, games, error: null };
    } catch (error) {
        console.error("[Releases Action] Erro ao buscar lançamentos:", error);
        return {
            success: false as const,
            games: [],
            error:
                error instanceof Error
                    ? error.message
                    : "Não foi possível buscar os próximos lançamentos.",
        };
    }
}
