import type { CatalogGame } from "@/modules/catalog/types";

export type TimeToBeatKey = "hastily" | "normally" | "completely";

export interface TimeToBeatEntry {
    key: TimeToBeatKey;
    hours: number;
}

export function timeToBeatEntries(game: CatalogGame): TimeToBeatEntry[] {
    const entries: { key: TimeToBeatKey; hours?: number }[] = [
        { key: "hastily", hours: game.suggestedHoursHastily },
        { key: "normally", hours: game.suggestedHours },
        { key: "completely", hours: game.suggestedHoursCompletely },
    ];

    return entries.filter(
        (entry): entry is TimeToBeatEntry => entry.hours != null && entry.hours > 0
    );
}

export function formatHours(hours: number, locale: string): string {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(hours)}h`;
}

export function formatRating(rating: number, locale: string): string {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(rating / 10);
}

export function formatRatingCount(count: number, locale: string): string {
    return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(
        count
    );
}

export function formatReleaseDate(iso: string | undefined, locale: string): string | null {
    if (!iso) {
        return null;
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(iso));
}

export function ratingTone(rating: number): string {
    if (rating >= 85) {
        return "bg-emerald-500/90 text-white";
    }

    if (rating >= 70) {
        return "bg-amber-500/90 text-black";
    }

    if (rating >= 55) {
        return "bg-sky-500/90 text-white";
    }

    return "bg-slate-600/90 text-white";
}

export function toHugeScreenshot(url: string): string {
    return url.replace("/t_screenshot_big/", "/t_screenshot_huge/");
}

export function youtubeUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
}
