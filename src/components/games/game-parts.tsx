"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Clock, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { CatalogGame } from "@/modules/catalog/types";
import {
    formatHours,
    formatRating,
    formatRatingCount,
    ratingTone,
    timeToBeatEntries,
} from "@/components/games/format";

interface GameCoverProps {
    game: Pick<CatalogGame, "id" | "title" | "cover">;
    className?: string;
    imgClassName?: string;
}

export function GameCover({ game, className, imgClassName }: GameCoverProps) {
    if (!game.cover) {
        return <div className={cn("bg-muted", className)} />;
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={game.cover}
            alt={game.title}
            loading="lazy"
            className={cn("bg-muted object-cover", className, imgClassName)}
        />
    );
}

export function GameRatingPill({
    rating,
    ratingCount,
    className,
}: {
    rating?: number;
    ratingCount?: number;
    className?: string;
}) {
    const locale = useLocale();
    const t = useTranslations("GameDetails");

    if (rating == null) {
        return null;
    }

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums shadow-sm backdrop-blur",
                ratingTone(rating),
                className
            )}
        >
            <Star className="h-3 w-3 fill-current" />
            {formatRating(rating, locale)}
            {ratingCount != null && ratingCount > 0 && (
                <span className="font-normal opacity-80">
                    ({formatRatingCount(ratingCount, locale)})
                </span>
            )}
            <span className="sr-only">{t("ratingSr")}</span>
        </span>
    );
}

export function GameGenreBadges({
    genres,
    max = 3,
    className,
}: {
    genres?: string[];
    max?: number;
    className?: string;
}) {
    const t = useTranslations("GameDetails");
    const list = genres ?? [];

    if (list.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
            {list.slice(0, max).map((genre) => (
                <Badge key={genre} variant="secondary" className="font-normal">
                    {genre}
                </Badge>
            ))}
            {list.length > max && (
                <Badge variant="outline" className="font-normal text-muted-foreground">
                    {t("moreGenres", { count: list.length - max })}
                </Badge>
            )}
        </div>
    );
}

export function GameTimeToBeatChips({
    game,
    className,
}: {
    game: CatalogGame;
    className?: string;
}) {
    const locale = useLocale();
    const t = useTranslations("GameDetails");
    const entries = timeToBeatEntries(game);

    if (entries.length === 0) {
        return null;
    }

    return (
        <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
            {entries.map((entry) => (
                <span
                    key={entry.key}
                    className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur"
                >
                    <Clock className="h-3 w-3" />
                    <span className="font-medium text-foreground">
                        {formatHours(entry.hours, locale)}
                    </span>
                    {t(`timeToBeat.${entry.key}`)}
                </span>
            ))}
        </div>
    );
}

export function GameTimeToBeatBars({ game }: { game: CatalogGame }) {
    const locale = useLocale();
    const t = useTranslations("GameDetails");
    const entries = timeToBeatEntries(game);

    if (entries.length === 0) {
        return null;
    }

    const max = Math.max(...entries.map((entry) => entry.hours));

    return (
        <ul className="space-y-2.5">
            {entries.map((entry) => (
                <li
                    key={entry.key}
                    className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3"
                >
                    <span className="text-xs text-muted-foreground">
                        {t(`timeToBeat.${entry.key}`)}
                    </span>
                    <span className="h-2 overflow-hidden rounded-full bg-muted">
                        <span
                            className="block h-full rounded-full bg-primary transition-all"
                            style={{ width: `${Math.round((entry.hours / max) * 100)}%` }}
                        />
                    </span>
                    <span className="text-right text-xs font-medium tabular-nums">
                        {formatHours(entry.hours, locale)}
                    </span>
                </li>
            ))}
        </ul>
    );
}

export function GameTimeToBeatSkeleton() {
    return (
        <div className="space-y-2.5">
            {[0, 1, 2].map((index) => (
                <div key={index} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-3 w-10" />
                </div>
            ))}
        </div>
    );
}

export function GameDetailRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value?: string | null;
}) {
    if (!value) {
        return null;
    }

    return (
        <div className="flex gap-2.5">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0 text-sm">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="break-words">{value}</p>
            </div>
        </div>
    );
}
