'use client';

import { useState } from 'react';
import {
    useFinishedGames,
    useRemoveFinishedGame,
} from '@/modules/finishedGames/useCases/useFinishedGames.useCase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarDays, Clock, Gamepad2, Star, Trash2, Trophy } from 'lucide-react';

function formatDate(iso: string): string {
    const [year, month, day] = iso.split('-');
    if (!year || !month || !day) return iso;
    return `${day}/${month}/${year}`;
}

export function FinishedGameList() {
    const { data, isLoading, error } = useFinishedGames();
    const { mutate, isPending } = useRemoveFinishedGame();
    const [removingId, setRemovingId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index} className="flex gap-4 p-4">
                        <Skeleton className="h-28 w-20 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>Erro ao carregar jogos zerados.</AlertDescription>
            </Alert>
        );
    }

    if (!data || data.length === 0) {
        return (
            <Alert>
                <Trophy className="h-4 w-4" />
                <AlertDescription>Nenhum jogo zerado cadastrado ainda.</AlertDescription>
            </Alert>
        );
    }

    const handleRemove = (id: string) => {
        setRemovingId(id);
        mutate(id, {
            onSettled: () => setRemovingId(null),
        });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Meus jogos zerados</h2>

            {data.map((game) => (
                <Card key={game.id} className="flex gap-4 p-4">
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
                        <h3 className="truncate font-semibold">{game.title}</h3>
                        <p className="text-sm text-muted-foreground">{game.platform}</p>

                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                {formatDate(game.finishedDate)}
                            </span>
                            {game.totalHours != null && (
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {game.totalHours}h
                                </span>
                            )}
                            {game.rating != null && (
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4" />
                                    {game.rating}/10
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remover ${game.title}`}
                        disabled={isPending && removingId === game.id}
                        onClick={() => handleRemove(game.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </Card>
            ))}
        </div>
    );
}