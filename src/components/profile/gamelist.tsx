"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCatalogSearch } from "@/modules/catalog/useCases/useCatalogSearch.useCase";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

const DEBOUNCE_MS = 300;

export function GameList() {
    const t = useTranslations("GameList");
    const [term, setTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(term.trim()), DEBOUNCE_MS);
        return () => clearTimeout(handler);
    }, [term]);

    const { data, isLoading, isFetching } = useCatalogSearch(debouncedTerm);
    const results = data ?? [];
    const loading = isLoading || isFetching;

    return (
        <div className="mx-auto w-full max-w-xl space-y-4">
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    placeholder={t("placeholder")}
                    className="pl-9"
                />
                {loading && (
                    <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
            </div>

            {!debouncedTerm ? (
                <p className="text-sm text-muted-foreground">{t("emptyQuery")}</p>
            ) : loading ? (
                <p className="text-sm text-muted-foreground">{t("loading")}</p>
            ) : results.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t("emptyResults")}</p>
            ) : (
                <ul className="space-y-3">
                    {results.map((game) => (
                        <li
                            key={game.id}
                            className="flex items-center gap-3 rounded-md border bg-card p-3"
                        >
                            {game.cover ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={game.cover}
                                    alt={t("coverAlt", { title: game.title })}
                                    className="h-16 w-11 shrink-0 rounded-md object-cover"
                                />
                            ) : (
                                <div className="h-16 w-11 shrink-0 rounded-md bg-muted" />
                            )}
                            <div className="min-w-0">
                                <p className="truncate font-medium">{game.title}</p>
                                <p className="truncate text-sm text-muted-foreground">
                                    {game.platforms.join(", ") || t("noPlatforms")}
                                </p>
                                {game.suggestedHours != null && (
                                    <p className="text-sm text-muted-foreground">
                                        {t("hours", { hours: game.suggestedHours })}
                                    </p>
                                )}
                                {game.suggestedHoursHastily != null && (
                                    <p className="text-sm text-muted-foreground">
                                        {t("hoursHastily", { hours: game.suggestedHoursHastily })}
                                    </p>
                                )}
                                {game.suggestedHoursCompletely != null && (
                                    <p className="text-sm text-muted-foreground">
                                        {t("hoursComplete", {
                                            hours: game.suggestedHoursCompletely,
                                        })}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GameList;
