'use client';

import { Card } from '@/components/ui/card';
import { CalendarDays, Clock, Gamepad2 } from 'lucide-react';
import { StarRating } from '@/components/finishedGames/StarRating';
import { GameCardMenu } from '@/components/finishedGames/GameCardMenu';
import { formatDate } from '@/components/finishedGames/utils';
import type { FinishedGame } from '@/modules/finishedGames/types';

interface FinishedGameCardProps {
    game: FinishedGame;
    isDeleting: boolean;
    onRemove: (id: string) => void;
    onEdit: (game: FinishedGame) => void;
}

export function FinishedGameCard({ game, isDeleting, onRemove, onEdit }: FinishedGameCardProps) {
    return (
        <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
                {game.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={game.cover}
                        alt={`Capa de ${game.title}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Gamepad2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}

                {game.rating != null && (
                    <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 backdrop-blur">
                        <StarRating value={game.rating} showValue={false} className="text-white" />
                    </div>
                )}

                <div className="absolute right-2 top-2 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                    <GameCardMenu
                        title={game.title}
                        isDeleting={isDeleting}
                        onEdit={() => onEdit(game)}
                        onRemove={() => onRemove(game.id)}
                    />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-t from-black/85 to-transparent p-2 pt-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex items-center gap-2 rounded-md bg-black/40 px-2 py-1.5 text-xs font-medium text-white backdrop-blur">
                        <span className="flex shrink-0 items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(game.finishedDate)}
                        </span>
                        {game.finishedTime && (
                            <span className="flex shrink-0 items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {game.finishedTime}
                            </span>
                        )}
                        {game.totalHours != null && (
                            <span className="flex shrink-0 items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {game.totalHours}h
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-1 p-4">
                <h3 className="truncate font-semibold" title={game.title}>
                    {game.title}
                </h3>
                <p className="truncate text-sm text-muted-foreground" title={game.platform}>
                    {game.platform}
                </p>
            </div>
        </Card>
    );
}