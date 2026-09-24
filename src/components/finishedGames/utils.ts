import type { FinishedGame } from "@/modules/finishedGames/types";

export type FinishedGameView = "grid" | "list";

export type FinishedGameSort = "recent" | "rating" | "hours" | "title";

export function formatDate(iso: string): string {
    const [year, month, day] = iso.split("-");
    if (!year || !month || !day) return iso;
    return `${day}/${month}/${year}`;
}

export function sortGames(games: FinishedGame[], sort: FinishedGameSort): FinishedGame[] {
    const list = [...games];

    switch (sort) {
        case "rating":
            return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        case "hours":
            return list.sort((a, b) => (b.totalHours ?? 0) - (a.totalHours ?? 0));
        case "title":
            return list.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
        case "recent":
        default:
            return list.sort(
                (a, b) => new Date(b.finishedDate).getTime() - new Date(a.finishedDate).getTime()
            );
    }
}
