"use client";

import { useState } from "react";
import { useRemoveFinishedGame } from "@/modules/finishedGames/useCases/useFinishedGames.useCase";
import { FinishedGameCard } from "@/components/finishedGames/FinishedGameCard";
import { FinishedGameListItem } from "@/components/finishedGames/FinishedGameListItem";
import { FinishedGameEditDialog } from "@/components/finishedGames/FinishedGameEditDialog";
import { Trophy } from "lucide-react";
import type { FinishedGame } from "@/modules/finishedGames/types";
import type { FinishedGameView } from "@/components/finishedGames/utils";

interface FinishedGameListProps {
    games: FinishedGame[];
    view: FinishedGameView;
}

export function FinishedGameList({ games, view }: FinishedGameListProps) {
    const { mutate, isPending } = useRemoveFinishedGame();
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [editingGame, setEditingGame] = useState<FinishedGame | null>(null);

    const handleRemove = (id: string) => {
        setRemovingId(id);
        mutate(id, {
            onSettled: () => setRemovingId(null),
        });
    };

    if (games.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-16 text-center">
                <Trophy className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">Nenhum jogo zerado ainda</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                    Cadastre seu primeiro jogo zerado para montar sua coleção de troféus.
                </p>
            </div>
        );
    }

    if (view === "grid") {
        return (
            <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {games.map((game) => (
                        <FinishedGameCard
                            key={game.id}
                            game={game}
                            isDeleting={isPending && removingId === game.id}
                            onRemove={handleRemove}
                            onEdit={setEditingGame}
                        />
                    ))}
                </div>
                <FinishedGameEditDialog game={editingGame} onClose={() => setEditingGame(null)} />
            </>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {games.map((game) => (
                    <FinishedGameListItem
                        key={game.id}
                        game={game}
                        isDeleting={isPending && removingId === game.id}
                        onRemove={handleRemove}
                        onEdit={setEditingGame}
                    />
                ))}
            </div>
            <FinishedGameEditDialog game={editingGame} onClose={() => setEditingGame(null)} />
        </>
    );
}
