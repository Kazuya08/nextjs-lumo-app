"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Gamepad2, Pencil } from "lucide-react";
import { StarRating } from "@/components/finishedGames/StarRating";
import { ConfirmDeleteButton } from "@/components/finishedGames/ConfirmDeleteButton";
import { formatDate } from "@/components/finishedGames/utils";
import type { FinishedGame } from "@/modules/finishedGames/types";

interface FinishedGameListItemProps {
    game: FinishedGame;
    isDeleting: boolean;
    onRemove: (id: string) => void;
    onEdit: (game: FinishedGame) => void;
}

export function FinishedGameListItem({
    game,
    isDeleting,
    onRemove,
    onEdit,
}: FinishedGameListItemProps) {
    return (
        <Card className="flex gap-4 p-4 transition-shadow hover:shadow-md">
            {game.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={game.cover}
                    alt={`Capa de ${game.title}`}
                    className="h-28 w-20 shrink-0 rounded-md object-cover"
                />
            ) : (
                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md bg-muted">
                    <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="truncate font-semibold" title={game.title}>
                            {game.title}
                        </h3>
                        <p className="truncate text-sm text-muted-foreground" title={game.platform}>
                            {game.platform}
                        </p>
                    </div>
                    {game.rating != null && <StarRating value={game.rating} />}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(game.finishedDate)}
                        {game.finishedTime && <> · {game.finishedTime}</>}
                    </span>
                    {game.totalHours != null && (
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {game.totalHours}h
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={`Editar ${game.title}`}
                    onClick={() => onEdit(game)}
                >
                    <Pencil className="h-4 w-4" />
                </Button>
                <ConfirmDeleteButton isDeleting={isDeleting} onConfirm={() => onRemove(game.id)} />
            </div>
        </Card>
    );
}
