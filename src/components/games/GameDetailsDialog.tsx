"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
    Building2,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Eye,
    Gamepad2,
    Images,
    Library,
    PlayCircle,
    Users,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import type { CatalogGame, CatalogGameDetails } from "@/modules/catalog/types";
import { useCatalogGameDetails } from "@/modules/catalog/useCases/useCatalogGameDetails.useCase";
import { formatReleaseDate, toHugeScreenshot, youtubeUrl } from "@/components/games/format";
import {
    GameCover,
    GameDetailRow,
    GameGenreBadges,
    GameRatingPill,
    GameTimeToBeatBars,
    GameTimeToBeatChips,
    GameTimeToBeatSkeleton,
} from "@/components/games/game-parts";

interface GameDetailsDialogProps {
    game: CatalogGame | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GameDetailsDialog({ game, open, onOpenChange }: GameDetailsDialogProps) {
    const locale = useLocale();
    const t = useTranslations("GameDetails");
    const [screenshotIndex, setScreenshotIndex] = useState<number | null>(null);

    const { data, isPending, isError } = useCatalogGameDetails(open ? (game?.id ?? null) : null);
    const details: CatalogGameDetails | null =
        data ?? (game ? { ...game, artwork: null, screenshots: [], trailerId: null } : null);

    useEffect(() => {
        setScreenshotIndex(null);
    }, [game?.id]);

    useEffect(() => {
        if (screenshotIndex == null) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const total = details?.screenshots.length ?? 0;

            if (total === 0) {
                return;
            }

            if (event.key === "ArrowRight") {
                setScreenshotIndex((index) => ((index ?? 0) + 1) % total);
            } else if (event.key === "ArrowLeft") {
                setScreenshotIndex((index) => ((index ?? 0) - 1 + total) % total);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [details?.screenshots.length, screenshotIndex]);

    if (!game || !details) {
        return null;
    }

    const releaseDate = formatReleaseDate(details.releaseDate, locale);
    const screenshots = details.screenshots;
    const lightboxOpen = screenshotIndex != null;

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[92vh] max-w-3xl gap-0 overflow-y-auto p-0 [&>button]:hidden">
                    <div className="relative isolate">
                        {details.artwork && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={details.artwork}
                                alt=""
                                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
                            />
                        )}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/85 to-background/40" />

                        <div className="flex gap-5 p-6">
                            <GameCover
                                game={details}
                                className="h-48 w-32 shrink-0 rounded-lg shadow-2xl"
                            />

                            <div className="min-w-0 flex-1 space-y-3 pt-1">
                                <div className="space-y-1 pr-8">
                                    <DialogTitle className="text-2xl leading-tight">
                                        {details.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-sm">
                                        {[releaseDate, details.franchise, details.gameModes?.[0]]
                                            .filter(Boolean)
                                            .join(" · ")}
                                    </DialogDescription>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <GameRatingPill
                                        rating={details.rating}
                                        ratingCount={details.ratingCount}
                                    />
                                    <GameTimeToBeatChips game={details} />
                                </div>

                                <GameGenreBadges genres={details.genres} max={5} />
                            </div>
                        </div>

                        <DialogClose className="absolute right-4 top-4 rounded-full bg-background/70 p-2 text-foreground opacity-80 backdrop-blur transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
                            <X className="h-4 w-4" />
                            <span className="sr-only">{t("close")}</span>
                        </DialogClose>
                    </div>

                    <div className="space-y-6 p-6">
                        {details.summary && (
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {details.summary}
                            </p>
                        )}

                        <div className="grid gap-4 sm:grid-cols-2">
                            <GameDetailRow
                                icon={Gamepad2}
                                label={t("platforms")}
                                value={details.platforms.join(", ")}
                            />
                            <GameDetailRow
                                icon={Users}
                                label={t("gameModes")}
                                value={details.gameModes?.join(", ")}
                            />
                            <GameDetailRow
                                icon={Eye}
                                label={t("perspectives")}
                                value={details.playerPerspectives?.join(", ")}
                            />
                            <GameDetailRow
                                icon={Building2}
                                label={t("companies")}
                                value={details.companies?.join(", ")}
                            />
                            <GameDetailRow
                                icon={Library}
                                label={t("franchise")}
                                value={details.franchise}
                            />
                            <GameDetailRow
                                icon={CalendarDays}
                                label={t("release")}
                                value={releaseDate}
                            />
                        </div>

                        <section className="space-y-3">
                            <h3 className="text-sm font-semibold">{t("timeToBeatTitle")}</h3>
                            {isPending && !details.suggestedHours ? (
                                <GameTimeToBeatSkeleton />
                            ) : (
                                <GameTimeToBeatBars game={details} />
                            )}
                        </section>

                        {details.trailerId && (
                            <Button asChild variant="secondary" className="w-full sm:w-auto">
                                <a
                                    href={youtubeUrl(details.trailerId)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <PlayCircle className="h-4 w-4" />
                                    {t("watchTrailer")}
                                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                                </a>
                            </Button>
                        )}

                        <section className="space-y-3">
                            <h3 className="flex items-center gap-2 text-sm font-semibold">
                                <Images className="h-4 w-4 text-muted-foreground" />
                                {t("screenshots")}
                            </h3>

                            {screenshots.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {screenshots.map((screenshot, index) => (
                                        <button
                                            key={screenshot}
                                            type="button"
                                            onClick={() => setScreenshotIndex(index)}
                                            className="group overflow-hidden rounded-md border focus:outline-none focus:ring-2 focus:ring-ring"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={screenshot}
                                                alt={t("screenshotAlt", {
                                                    title: details.title,
                                                    index: index + 1,
                                                })}
                                                loading="lazy"
                                                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {[0, 1, 2].map((index) => (
                                        <Skeleton key={index} className="aspect-video w-full" />
                                    ))}
                                </div>
                            )}

                            {isError && (
                                <p className="text-xs text-destructive">{t("detailsError")}</p>
                            )}
                        </section>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={lightboxOpen}
                onOpenChange={(value) => !value && setScreenshotIndex(null)}
            >
                <DialogContent className="max-w-5xl gap-3 bg-background/95 p-4 backdrop-blur">
                    <DialogTitle className="sr-only">{details.title}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {t("screenshotAlt", {
                            title: details.title,
                            index: (screenshotIndex ?? 0) + 1,
                        })}
                    </DialogDescription>

                    {screenshotIndex != null && screenshots[screenshotIndex] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={toHugeScreenshot(screenshots[screenshotIndex])}
                            alt={t("screenshotAlt", {
                                title: details.title,
                                index: screenshotIndex + 1,
                            })}
                            className="max-h-[75vh] w-full rounded-md object-contain"
                        />
                    )}

                    {screenshots.length > 1 && (
                        <div className="flex items-center justify-between">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    setScreenshotIndex(
                                        ((screenshotIndex ?? 0) - 1 + screenshots.length) %
                                            screenshots.length
                                    )
                                }
                            >
                                <ChevronLeft className="h-4 w-4" />
                                {t("previous")}
                            </Button>
                            <span className="text-xs tabular-nums text-muted-foreground">
                                {(screenshotIndex ?? 0) + 1} / {screenshots.length}
                            </span>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                    setScreenshotIndex(
                                        ((screenshotIndex ?? 0) + 1) % screenshots.length
                                    )
                                }
                            >
                                {t("next")}
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
