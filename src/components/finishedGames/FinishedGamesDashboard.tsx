'use client';

import { useMemo, useState } from 'react';
import { useFinishedGames } from '@/modules/finishedGames/useCases/useFinishedGames.useCase';
import { FinishedGamesStats } from '@/components/finishedGames/FinishedGamesStats';
import { FinishedGameList } from '@/components/finishedGames/FinishedGameList';
import { FinishedGameForm } from '@/components/finishedGames/FinishedGameForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { LayoutGrid, List, Plus, Search } from 'lucide-react';
import {
    sortGames,
    type FinishedGameSort,
    type FinishedGameView,
} from '@/components/finishedGames/utils';

export function FinishedGamesDashboard() {
    const { data, isLoading, error } = useFinishedGames();
    const [view, setView] = useState<FinishedGameView>('grid');
    const [sort, setSort] = useState<FinishedGameSort>('recent');
    const [search, setSearch] = useState('');
    const [platform, setPlatform] = useState('all');
    const [formOpen, setFormOpen] = useState(false);

    const total = data?.length ?? 0;

    const platformOptions = useMemo(() => {
        if (!data) return [];
        return Array.from(new Set(data.map((game) => game.platform).filter(Boolean))).sort((a, b) =>
            a.localeCompare(b, 'pt-BR')
        );
    }, [data]);

    const gamesByPlatform = useMemo(() => {
        if (platform === 'all' || !data) return data ?? [];
        return data.filter((game) => game.platform === platform);
    }, [data, platform]);

    const games = useMemo(() => {
        const term = search.trim().toLowerCase();
        const filtered = term
            ? gamesByPlatform.filter((game) => game.title.toLowerCase().includes(term))
            : gamesByPlatform;
        return sortGames(filtered, sort);
    }, [gamesByPlatform, search, sort]);

    return (
        <div className="container space-y-6 p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Jogos Zerados</h1>
                    <p className="text-muted-foreground">
                        {total === 0
                            ? 'Sua coleção de jogos concluídos'
                            : `${total} ${total === 1 ? 'jogo concluído' : 'jogos concluídos'} na sua coleção`}
                    </p>
                </div>
                <Button onClick={() => setFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar jogo
                </Button>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-20 rounded-lg" />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} className="aspect-[2/3] rounded-lg" />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <Alert variant="destructive">
                    <AlertDescription>Erro ao carregar jogos zerados.</AlertDescription>
                </Alert>
            ) : (
                <>
                    <FinishedGamesStats games={gamesByPlatform} />

                    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Filtrar por nome…"
                                className="pl-9"
                            />
                        </div>

                        <Select value={platform} onValueChange={setPlatform}>
                            <SelectTrigger className="sm:w-44">
                                <SelectValue placeholder="Plataforma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as plataformas</SelectItem>
                                {platformOptions.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={sort} onValueChange={(value) => setSort(value as FinishedGameSort)}>
                            <SelectTrigger className="sm:w-48">
                                <SelectValue placeholder="Ordenar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Mais recente</SelectItem>
                                <SelectItem value="rating">Maior nota</SelectItem>
                                <SelectItem value="hours">Mais horas</SelectItem>
                                <SelectItem value="title">Título (A–Z)</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center gap-1 rounded-md border p-1">
                            <Button
                                variant={view === 'grid' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Visualização em grade"
                                onClick={() => setView('grid')}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={view === 'list' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                aria-label="Visualização em lista"
                                onClick={() => setView('list')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    {total > 0 && games.length === 0 ? (
                        <Alert>
                            <AlertDescription>
                                Nenhum jogo encontrado
                                {search.trim() && (
                                    <>
                                        {' '}
                                        para &quot;{search}&quot;
                                    </>
                                )}
                                {platform !== 'all' && (
                                    <>
                                        {' '}
                                        em &quot;{platform}&quot;
                                    </>
                                )}
                                .
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <FinishedGameList games={games} view={view} />
                    )}
                </>
            )}

            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Cadastrar jogo zerado</DialogTitle>
                        <DialogDescription>
                            Busque o jogo para preencher título, capa e plataforma.
                        </DialogDescription>
                    </DialogHeader>
                    <FinishedGameForm variant="sheet" />
                </DialogContent>
            </Dialog>
        </div>
    );
}