"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Loader2, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCatalogSearch } from "@/modules/catalog/useCases/useCatalogSearch.useCase";
import type { CatalogGame } from "@/modules/catalog/types";
import { GameResultCard } from "@/components/games/GameResultCard";
import { GameDetailsDialog } from "@/components/games/GameDetailsDialog";

const DEBOUNCE_MS = 300;

function GameListSkeleton() {
    return (
        <ul className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
                <li key={index} className="flex items-start gap-4 rounded-lg border bg-card p-3">
                    <Skeleton className="h-24 w-16 rounded-md" />
                    <div className="flex-1 space-y-2 pt-1">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function GameList() {
    const t = useTranslations("GameList");
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedGame, setSelectedGame] = useState<CatalogGame | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [shortcutLabel, setShortcutLabel] = useState("Ctrl K");

    const inputRef = useRef<HTMLInputElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(term.trim()), DEBOUNCE_MS);
        return () => clearTimeout(handler);
    }, [term]);

    const { data, isLoading, isFetching, isError, error } = useCatalogSearch(debouncedTerm);
    const results = data ?? [];
    const loading = isLoading || isFetching;
    const hasQuery = debouncedTerm.length > 0;

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [debouncedTerm]);

    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;

            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.select();
                return;
            }

            if (event.key === "Escape" && inputRef.current === target) {
                setTerm("");
                inputRef.current?.blur();
            }
        };

        document.addEventListener("keydown", handleShortcut);
        return () => document.removeEventListener("keydown", handleShortcut);
    }, []);

    useEffect(() => {
        setShortcutLabel(/mac|iphone|ipad/i.test(navigator.userAgent) ? "⌘K" : "Ctrl K");
    }, []);

    const focusItem = (index: number) => {
        const clamped = Math.min(Math.max(index, 0), results.length - 1);

        if (clamped < 0) {
            return;
        }

        setHighlightedIndex(clamped);
        itemRefs.current[clamped]?.focus();
    };

    const selectGame = (game: CatalogGame, index?: number) => {
        if (index != null) {
            setSelectedIndex(index);
        }

        setSelectedGame(game);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusItem(highlightedIndex + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusItem(highlightedIndex - 1);
        } else if (event.key === "Enter") {
            const highlighted = results[highlightedIndex];
            if (highlighted) {
                event.preventDefault();
                selectGame(highlighted, highlightedIndex);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-2xl space-y-4">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t("placeholder")}
                    aria-label={t("placeholder")}
                    className="h-12 pl-9 pr-20"
                    autoComplete="off"
                    spellCheck={false}
                />
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                    {term && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                                setTerm("");
                                inputRef.current?.focus();
                            }}
                        >
                            <X className="h-3.5 w-3.5" />
                            <span className="sr-only">{t("clear")}</span>
                        </Button>
                    )}
                    {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    {!loading && !term && (
                        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                            {shortcutLabel}
                        </kbd>
                    )}
                </div>
            </div>

            {isError ? (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        {error instanceof Error ? error.message : t("error")}
                    </AlertDescription>
                </Alert>
            ) : !hasQuery ? (
                <p className="text-sm text-muted-foreground">{t("emptyQuery")}</p>
            ) : loading ? (
                <GameListSkeleton />
            ) : results.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("emptyResults")}</p>
            ) : (
                <>
                    <p className="text-xs text-muted-foreground" aria-live="polite">
                        {t("resultsCount", { count: results.length })}
                        <span className="hidden sm:inline"> · {t("keyboardHint")}</span>
                    </p>

                    <ul className="space-y-3">
                        {results.map((game, index) => (
                            <GameResultCard
                                key={game.id}
                                game={game}
                                active={highlightedIndex === index}
                                itemRef={(element) => {
                                    itemRefs.current[index] = element;
                                }}
                                onOpen={(game) => selectGame(game, index)}
                                onActive={() => setHighlightedIndex(index)}
                                onInactive={() =>
                                    setHighlightedIndex((current) =>
                                        current === index ? -1 : current
                                    )
                                }
                            />
                        ))}
                    </ul>
                </>
            )}

            <GameDetailsDialog
                game={selectedGame}
                open={selectedGame !== null}
                onOpenChange={(open) => {
                    if (open) {
                        return;
                    }

                    setSelectedGame(null);
                    setTimeout(() => itemRefs.current[selectedIndex]?.focus(), 0);
                }}
            />
        </div>
    );
}

export default GameList;
