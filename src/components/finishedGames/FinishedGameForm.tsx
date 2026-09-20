'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    finishedGameSchema,
    type FinishedGameFormData,
} from '@/modules/finishedGames';
import { useCreateFinishedGame } from '@/modules/finishedGames/useCases/useFinishedGames.useCase';
import type { CatalogGame } from '@/modules/catalog/types';
import { GameSearchCombobox } from '@/components/finishedGames/GameSearchCombobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const COMMON_PLATFORMS = [
    'PC (Steam)',
    'PC',
    'PlayStation 5',
    'PlayStation 4',
    'Xbox Series X|S',
    'Xbox One',
    'Nintendo Switch',
    '3DS',
    'Mobile',
];

export function FinishedGameForm() {
    const [selectedGame, setSelectedGame] = useState<CatalogGame | null>(null);
    const { mutate, isPending, error } = useCreateFinishedGame();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<FinishedGameFormData>({
        resolver: zodResolver(finishedGameSchema),
        defaultValues: {
            title: '',
            platform: '',
            finishedDate: '',
            totalHours: undefined,
            rating: undefined,
        },
    });

    const platform = watch('platform');

    const platformOptions = useMemo(() => {
        const gamePlatforms = selectedGame?.platforms ?? [];
        return Array.from(new Set([...gamePlatforms, ...COMMON_PLATFORMS]));
    }, [selectedGame]);

    const handleGameSelect = (game: CatalogGame) => {
        setSelectedGame(game);
        setValue('title', game.title, { shouldValidate: true });
        setValue('platform', game.platforms[0] ?? '', { shouldValidate: true });
        setValue('totalHours', game.suggestedHours, { shouldValidate: true });
    };

    const onSubmit = (data: FinishedGameFormData) => {
        mutate(
            {
                title: data.title,
                cover: selectedGame?.cover ?? null,
                platform: data.platform,
                finishedDate: data.finishedDate,
                totalHours: data.totalHours,
                rating: data.rating,
            },
            {
                onSuccess: () => {
                    setSelectedGame(null);
                    reset();
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cadastrar jogo zerado</CardTitle>
                <CardDescription>
                    Busque o jogo para preencher título, capa e plataforma
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="game-search">Jogo</Label>
                        <GameSearchCombobox onSelect={handleGameSelect} disabled={isPending} />

                        {selectedGame && (
                            <div className="mt-3 flex items-center gap-3 rounded-md border p-3">
                                {selectedGame.cover ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={selectedGame.cover}
                                        alt={`Capa de ${selectedGame.title}`}
                                        className="h-20 w-14 shrink-0 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="h-20 w-14 shrink-0 rounded-md bg-muted" />
                                )}
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{selectedGame.title}</p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {selectedGame.platforms.join(', ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            placeholder="Selecione um jogo na busca ou digite manualmente"
                            {...register('title')}
                            disabled={isPending}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="platform">Plataforma</Label>
                        <Select
                            value={platform || undefined}
                            onValueChange={(value) =>
                                setValue('platform', value, { shouldValidate: true })
                            }
                        >
                            <SelectTrigger id="platform">
                                <SelectValue placeholder="Selecione a plataforma" />
                            </SelectTrigger>
                            <SelectContent>
                                {platformOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.platform && (
                            <p className="text-sm text-destructive">{errors.platform.message}</p>
                        )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="finishedDate">Data em que zerou</Label>
                            <Input
                                id="finishedDate"
                                type="date"
                                {...register('finishedDate')}
                                disabled={isPending}
                            />
                            {errors.finishedDate && (
                                <p className="text-sm text-destructive">
                                    {errors.finishedDate.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="totalHours">Horas total (opcional)</Label>
                            <Input
                                id="totalHours"
                                type="number"
                                min="0"
                                step="0.5"
                                placeholder="Ex.: 40"
                                {...register('totalHours')}
                                disabled={isPending}
                            />
                            {errors.totalHours && (
                                <p className="text-sm text-destructive">
                                    {errors.totalHours.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rating">Nota (opcional)</Label>
                            <Input
                                id="rating"
                                type="number"
                                min="1"
                                max="10"
                                step="0.1"
                                placeholder="1 a 10"
                                {...register('rating')}
                                disabled={isPending}
                            />
                            {errors.rating && (
                                <p className="text-sm text-destructive">
                                    {errors.rating.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}