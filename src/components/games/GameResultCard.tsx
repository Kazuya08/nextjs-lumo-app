"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight, MousePointerClick } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CatalogGame } from "@/modules/catalog/types";
import { formatHours, formatReleaseDate } from "@/components/games/format";
import {
    GameCover,
    GameGenreBadges,
    GameRatingPill,
    GameTimeToBeatBars,
} from "@/components/games/game-parts";

interface GameResultCardProps {
    game: CatalogGame;
    active?: boolean;
    itemRef?: (element: HTMLButtonElement | null) => void;
    onOpen: (game: CatalogGame) => void;
    onActive?: () => void;
    onInactive?: () => void;
}

export function GameResultCard({
    game,
    active = false,
    itemRef,
    onOpen,
    onActive,
    onInactive,
}: GameResultCardProps) {
    const locale = useLocale();
    const t = useTranslations("GameDetails");
    const [interacting, setInteracting] = useState(false);

    const expanded = interacting || active;
    const releaseDate = formatReleaseDate(game.releaseDate, locale);
    const platforms = game.platforms.slice(0, 3).join(" · ");
    const extraPlatforms = Math.max(game.platforms.length - 3, 0);

    return (
        <li className="list-none">
            <button
                ref={itemRef}
                type="button"
                data-active={active ? "true" : undefined}
                onMouseEnter={() => {
                    setInteracting(true);
                    onActive?.();
                }}
                onMouseLeave={() => {
                    setInteracting(false);
                    onInactive?.();
                }}
                onFocus={() => {
                    setInteracting(true);
                    onActive?.();
                }}
                onBlur={() => {
                    setInteracting(false);
                    onInactive?.();
                }}
                onClick={() => onOpen(game)}
                className={cn(
                    "group block w-full rounded-lg border bg-card p-3 text-left transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active && "border-primary/50 bg-accent/40 shadow-md"
                )}
            >
                <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                        <GameCover
                            game={game}
                            className="h-24 w-16 rounded-md ring-1 ring-border"
                            imgClassName="transition-transform duration-300 group-hover:scale-[1.06]"
                        />
                        <GameRatingPill
                            rating={game.rating}
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate pr-6 font-semibold leading-snug" title={game.title}>
                            {game.title}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                            {[releaseDate, platforms].filter(Boolean).join(" · ")}
                            {extraPlatforms > 0 && ` +${extraPlatforms}`}
                        </p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            {game.suggestedHours != null && (
                                <span>
                                    {t("timeToBeat.normally")}:{" "}
                                    <span className="font-medium text-foreground">
                                        {formatHours(game.suggestedHours, locale)}
                                    </span>
                                </span>
                            )}
                            {game.ratingCount != null && game.ratingCount > 0 && (
                                <span>{t("ratingCount", { count: game.ratingCount })}</span>
                            )}
                        </div>
                    </div>

                    <ChevronRight
                        className={cn(
                            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                            expanded
                                ? "translate-x-0.5 text-foreground"
                                : "group-hover:translate-x-0.5 group-hover:text-foreground"
                        )}
                    />
                </div>

                <div
                    className={cn(
                        "grid min-h-0 transition-[grid-template-rows,opacity] duration-300 ease-out",
                        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                >
                    <div className="overflow-hidden">
                        <div className="space-y-2.5 pt-3">
                            {game.summary && (
                                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                    {game.summary}
                                </p>
                            )}

                            <GameGenreBadges genres={game.genres} max={4} />

                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <div className="min-w-[15rem] flex-1">
                                    <GameTimeToBeatBars game={game} />
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground">
                                    <MousePointerClick className="h-3 w-3" />
                                    {t("openDetails")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </li>
    );
}
