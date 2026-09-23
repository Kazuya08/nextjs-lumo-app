"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCatalogSearch } from "@/modules/catalog/useCases/useCatalogSearch.useCase";
import type { CatalogGame } from "@/modules/catalog/types";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameSearchComboboxProps {
    onSelect: (game: CatalogGame) => void;
    disabled?: boolean;
}

const DEBOUNCE_MS = 300;

export function GameSearchCombobox({ onSelect, disabled }: GameSearchComboboxProps) {
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(term.trim()), DEBOUNCE_MS);
        return () => clearTimeout(handler);
    }, [term]);

    const { data, isLoading, isFetching } = useCatalogSearch(debouncedTerm);

    const results = data ?? [];
    const loading = isLoading || isFetching;

    useEffect(() => {
        setHighlightedIndex(-1);
    }, [debouncedTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const pick = (game: CatalogGame) => {
        onSelect(game);
        setTerm("");
        setDebouncedTerm("");
        setOpen(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((index) => Math.min(index + 1, results.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === "Enter") {
            const highlighted = results[highlightedIndex];
            if (highlighted) {
                event.preventDefault();
                pick(highlighted);
            }
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    const showDropdown = open && debouncedTerm.length > 0;

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={term}
                    onChange={(event) => {
                        setTerm(event.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar jogo na IGDB (Steam, PS, Xbox, Switch…)"
                    className="pl-9"
                    disabled={disabled}
                    aria-expanded={showDropdown}
                />
                {loading && (
                    <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
            </div>

            {showDropdown && (
                <Card className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto p-1">
                    {loading ? (
                        <div className="px-4 py-3 text-sm text-muted-foreground">Buscando…</div>
                    ) : results.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-muted-foreground">
                            Nenhum jogo encontrado
                        </div>
                    ) : (
                        results.map((game, index) => (
                            <button
                                key={game.id}
                                type="button"
                                onClick={() => pick(game)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-accent",
                                    highlightedIndex === index && "bg-accent"
                                )}
                            >
                                {game.cover ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={game.cover}
                                        alt=""
                                        className="h-12 w-9 shrink-0 rounded-sm object-cover"
                                    />
                                ) : (
                                    <div className="h-12 w-9 shrink-0 rounded-sm bg-muted" />
                                )}
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{game.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {game.platforms.join(", ")}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </Card>
            )}
        </div>
    );
}
