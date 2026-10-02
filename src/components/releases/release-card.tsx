"use client";

import Image from "next/image";

import { Bell, BellRing, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlatformIcon } from "@/components/platform-icon";

import type { UpcomingRelease } from "@/modules/catalog/types";

interface ReleaseCardProps {
    game: UpcomingRelease;
    compact?: boolean;
    onToggleFollow?: (gameId: number) => void;
    isFollowing?: boolean;
    isReleasedToday?: boolean;
}

function getPlatformFamily(platform: string) {
    const normalized = platform.toLowerCase();

    if (
        normalized.includes("pc") ||
        normalized.includes("windows") ||
        normalized.includes("mac") ||
        normalized.includes("linux")
    ) {
        return "pc";
    }

    if (
        normalized.includes("playstation") ||
        normalized.includes("ps4") ||
        normalized.includes("ps5")
    ) {
        return "playstation";
    }

    if (
        normalized.includes("xbox") ||
        normalized.includes("series x") ||
        normalized.includes("series s")
    ) {
        return "xbox";
    }

    if (normalized.includes("switch") || normalized.includes("nintendo")) {
        return "nintendo";
    }

    return platform;
}

function getCountdownText(releaseDate: string) {
    if (!releaseDate) {
        return null;
    }

    const now = new Date();
    const release = new Date(releaseDate);

    const difference = release.getTime() - now.getTime();

    if (difference <= 0) {
        return "Lançado";
    }

    const totalMinutes = Math.floor(difference / (1000 * 60));

    const totalHours = Math.floor(difference / (1000 * 60 * 60));

    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (totalDays === 0) {
        if (totalHours > 0) {
            return `${totalHours}h`;
        }

        return `${Math.max(totalMinutes, 1)}min`;
    }

    if (totalDays === 1) {
        return "1 dia";
    }

    if (totalDays < 30) {
        return `${totalDays} dias`;
    }

    const months = Math.floor(totalDays / 30);
    const remainingDays = totalDays % 30;

    if (remainingDays === 0) {
        return months === 1 ? "1 mês" : `${months} meses`;
    }

    return `${months}m ${remainingDays}d`;
}

function formatReleaseDate(releaseDate: string) {
    if (!releaseDate) {
        return "--/--";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "America/Sao_Paulo",
    }).format(new Date(releaseDate));
}

export function ReleaseCard({
    game,
    compact = true,
    onToggleFollow,
    isFollowing = false,
    isReleasedToday = false,
}: ReleaseCardProps) {
    const formattedDate = formatReleaseDate(game.releaseDate);

    const uniquePlatforms = Array.from(
        new Map(game.platforms.map((platform) => [getPlatformFamily(platform), platform])).entries()
    ).map(([family, platform]) => ({
        family,
        platform,
    }));

    const visiblePlatforms = uniquePlatforms.slice(0, 2);

    const remainingPlatforms = Math.max(uniquePlatforms.length - 2, 0);

    const countdown = getCountdownText(game.releaseDate);

    const canFollow = Boolean(onToggleFollow) && !isReleasedToday;

    return (
        <article className={`group min-w-0 ${compact ? "w-full" : "w-full"}`}>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-none border border-border bg-card">
                {game.cover ? (
                    <Image
                        src={game.cover}
                        alt={`Capa de ${game.title}`}
                        fill
                        sizes="(max-width: 640px) 44vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 16vw, 14vw"
                        className="object-cover transition-all duration-300 group-hover:scale-[1.03] group-hover:brightness-[0.4]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted px-4 text-center text-xs text-muted-foreground">
                        Sem capa
                    </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/10" />

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h3 className="line-clamp-4 text-sm font-semibold leading-snug text-white drop-shadow-lg sm:text-base">
                            {game.title}
                        </h3>

                        {isFollowing && countdown && (
                            <span className="text-xs font-medium text-white/90 drop-shadow-lg">
                                {countdown === "Lançado" ? "Lançado" : `Lançamento em ${countdown}`}
                            </span>
                        )}
                    </div>
                </div>

                {canFollow && (
                    <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
                        {isFollowing && countdown && (
                            <span className="rounded-full bg-background/80 px-2 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                                {countdown}
                            </span>
                        )}

                        <Button
                            type="button"
                            size="icon"
                            variant="secondary"
                            className={`h-8 w-8 rounded-full shadow-md transition-opacity duration-200 ${
                                isFollowing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                            onClick={() => onToggleFollow?.(game.id)}
                            title={isFollowing ? "Deixar de acompanhar" : "Acompanhar lançamento"}
                        >
                            {isFollowing ? (
                                <BellRing className="h-4 w-4" />
                            ) : (
                                <Bell className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <div className="mt-2 flex min-h-5 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                    {visiblePlatforms.map(({ family, platform }) => (
                        <PlatformIcon
                            key={family}
                            platform={platform}
                            className="h-3.5 w-3.5 shrink-0"
                        />
                    ))}

                    {remainingPlatforms > 0 && (
                        <span className="shrink-0 text-[11px] font-medium">
                            +{remainingPlatforms}
                        </span>
                    )}
                </div>

                <div className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />

                    <span>{formattedDate}</span>
                </div>
            </div>
        </article>
    );
}
