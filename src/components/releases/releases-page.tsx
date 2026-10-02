"use client";

import { useMemo, useState } from "react";

import { Bell, CalendarDays, ChevronDown, Loader2 } from "lucide-react";

import { ReleaseCard } from "@/components/releases/release-card";
import { PlatformIcon } from "@/components/platform-icon";
import { Button } from "@/components/ui/button";

import { loadUpcomingReleases } from "@/modules/catalog/releases.action";

import type { UpcomingRelease } from "@/modules/catalog/types";

interface ReleasesPageProps {
    initialGames: UpcomingRelease[];
    initialEndDate: string;
}

type ReleaseFilter = "all" | "following";

interface ReleaseMonth {
    key: string;
    label: string;
    games: UpcomingRelease[];
}

function addDays(dateString: string, days: number) {
    const date = new Date(`${dateString}T00:00:00Z`);

    date.setUTCDate(date.getUTCDate() + days);

    return date.toISOString().slice(0, 10);
}

function formatSectionDate(start: string, end: string) {
    const startDate = new Date(`${start}T00:00:00Z`);
    const endDate = new Date(`${end}T00:00:00Z`);

    const startDay = startDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "UTC",
    });

    const endDay = endDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "UTC",
    });

    return `${startDay} – ${endDay}`;
}

function getTodayDate() {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

function getGameDateInBrazil(releaseDate: string) {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(releaseDate));
}

function getReleaseStatus(releaseDate: string): "previous" | "today" | "upcoming" {
    if (!releaseDate) {
        return "upcoming";
    }

    const today = getTodayDate();
    const gameDate = getGameDateInBrazil(releaseDate);

    if (gameDate < today) {
        return "previous";
    }

    if (gameDate === today) {
        return "today";
    }

    return "upcoming";
}

function getMonthInfo(releaseDate: string) {
    const date = new Date(releaseDate);

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();

    const label = date.toLocaleDateString("pt-BR", {
        month: "long",
        timeZone: "UTC",
    });

    return {
        key: `${year}-${String(month + 1).padStart(2, "0")}`,
        label: label.charAt(0).toUpperCase() + label.slice(1),
    };
}

function mergeGames(currentGames: UpcomingRelease[], newGames: UpcomingRelease[]) {
    const gamesMap = new Map<number, UpcomingRelease>();

    for (const game of currentGames) {
        gamesMap.set(game.id, game);
    }

    for (const game of newGames) {
        gamesMap.set(game.id, game);
    }

    return Array.from(gamesMap.values()).sort((a, b) => {
        return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    });
}

export function ReleasesPage({ initialGames, initialEndDate }: ReleasesPageProps) {
    const [games, setGames] = useState<UpcomingRelease[]>(initialGames);

    const [currentEndDate, setCurrentEndDate] = useState(initialEndDate);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [following, setFollowing] = useState<Set<number>>(new Set());

    const [filter, setFilter] = useState<ReleaseFilter>("all");

    const allLoadedGames = useMemo(() => {
        const uniqueGames = new Map<number, UpcomingRelease>();

        for (const game of games) {
            uniqueGames.set(game.id, game);
        }

        return Array.from(uniqueGames.values()).sort((a, b) => {
            return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
        });
    }, [games]);

    /**
     * Jogos lançados hoje.
     *
     * Exemplo:
     * Se hoje for 02/10:
     * 02/10 -> aparece aqui.
     */
    const releasedTodayGames = useMemo(() => {
        return allLoadedGames.filter((game) => getReleaseStatus(game.releaseDate) === "today");
    }, [allLoadedGames]);

    /**
     * Apenas lançamentos futuros.
     *
     * Exemplo:
     * Se hoje for 02/10:
     * 01/10 -> não aparece
     * 02/10 -> fica em "Lançados hoje"
     * 03/10 -> aparece nos próximos lançamentos
     */
    const futureGames = useMemo(() => {
        return allLoadedGames.filter((game) => getReleaseStatus(game.releaseDate) === "upcoming");
    }, [allLoadedGames]);

    const filteredGames = useMemo(() => {
        return futureGames.filter((game) => {
            if (filter === "following") {
                return following.has(game.id);
            }

            return true;
        });
    }, [futureGames, filter, following]);

    const monthGroups = useMemo<ReleaseMonth[]>(() => {
        const groups = new Map<string, ReleaseMonth>();

        for (const game of filteredGames) {
            const { key, label } = getMonthInfo(game.releaseDate);

            const existing = groups.get(key);

            if (existing) {
                existing.games.push(game);
            } else {
                groups.set(key, {
                    key,
                    label,
                    games: [game],
                });
            }
        }

        return Array.from(groups.values());
    }, [filteredGames]);

    async function handleLoadMore() {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        setError(null);

        const nextStart = addDays(currentEndDate, 1);
        const nextEnd = addDays(nextStart, 6);

        try {
            console.log("[Releases] Buscando próxima janela:", nextStart, "até", nextEnd);

            const result = await loadUpcomingReleases(nextStart, nextEnd);

            if (!result.success) {
                throw new Error(
                    result.error ?? "Não foi possível carregar os próximos lançamentos."
                );
            }

            setGames((currentGames) => mergeGames(currentGames, result.games));

            setCurrentEndDate(nextEnd);
        } catch (error) {
            console.error("Erro ao carregar mais lançamentos:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Não foi possível carregar os próximos lançamentos."
            );
        } finally {
            setIsLoading(false);
        }
    }

    function handleToggleFollow(gameId: number) {
        setFollowing((current) => {
            const next = new Set(current);

            if (next.has(gameId)) {
                next.delete(gameId);
            } else {
                next.add(gameId);
            }

            return next;
        });
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <header className="mb-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />

                            <span>Próximos lançamentos</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Lançamentos
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                            Acompanhe os próximos jogos que estão chegando e fique de olho nos
                            lançamentos que você não quer perder.
                        </p>
                    </div>

                    <div className="w-full shrink-0 rounded-xl border border-border bg-card p-3 lg:max-w-sm">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    Plataformas
                                </p>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                    <div className="flex items-center gap-1">
                                        <PlatformIcon platform="PC" className="h-3.5 w-3.5" />

                                        <span className="text-[11px] text-muted-foreground">
                                            PC
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <PlatformIcon
                                            platform="PlayStation 5"
                                            className="h-3.5 w-3.5"
                                        />

                                        <span className="text-[11px] text-muted-foreground">
                                            PS5
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <PlatformIcon
                                            platform="Xbox Series X"
                                            className="h-3.5 w-3.5"
                                        />

                                        <span className="text-[11px] text-muted-foreground">
                                            Xbox
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <PlatformIcon
                                            platform="Nintendo Switch"
                                            className="h-3.5 w-3.5"
                                        />

                                        <span className="text-[11px] text-muted-foreground">
                                            Switch
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px w-full bg-border" />

                            <div className="flex items-center gap-1.5">
                                <Button
                                    type="button"
                                    size="sm"
                                    variant={filter === "all" ? "secondary" : "ghost"}
                                    onClick={() => setFilter("all")}
                                    className="h-7 px-3 text-xs"
                                >
                                    Todos
                                </Button>

                                <Button
                                    type="button"
                                    size="sm"
                                    variant={filter === "following" ? "secondary" : "ghost"}
                                    onClick={() => setFilter("following")}
                                    className="h-7 gap-1 px-3 text-xs"
                                >
                                    <Bell className="h-3 w-3" />
                                    Acompanhando
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-10">
                {releasedTodayGames.length > 0 && filter === "all" && (
                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">Lançados hoje</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                            {releasedTodayGames.map((game) => (
                                <ReleaseCard key={game.id} game={game} isReleasedToday />
                            ))}
                        </div>
                    </section>
                )}

                {monthGroups.map((month) => (
                    <section key={month.key} className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">{month.label}</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-7 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                            {month.games.map((game) => (
                                <ReleaseCard
                                    key={game.id}
                                    game={game}
                                    isFollowing={following.has(game.id)}
                                    onToggleFollow={handleToggleFollow}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {filter === "following" && filteredGames.length === 0 && (
                    <div className="rounded-xl border border-border bg-card px-6 py-12 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <Bell className="h-5 w-5 text-muted-foreground" />
                        </div>

                        <p className="mt-4 text-sm font-medium">Nenhum lançamento acompanhado</p>

                        <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">
                            Aperte o sino em um jogo para adicioná-lo à sua lista de
                            acompanhamentos.
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-center">
                    <p className="text-sm font-medium text-destructive">
                        Não foi possível carregar os próximos lançamentos.
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">{error}</p>
                </div>
            )}

            <div className="mt-12 flex justify-center">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    disabled={isLoading}
                    onClick={handleLoadMore}
                    className="min-w-44 gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando...
                        </>
                    ) : (
                        <>
                            Ver mais
                            <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </Button>
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground">
                Próxima janela:{" "}
                {formatSectionDate(addDays(currentEndDate, 1), addDays(currentEndDate, 7))}
            </p>
        </main>
    );
}
