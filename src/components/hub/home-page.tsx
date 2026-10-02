"use client";

import { useState } from "react";

import type { ElementType } from "react";

import {
    ArrowRight,
    Check,
    Clock3,
    Gamepad2,
    Lock,
    Medal,
    MessageCircle,
    Star,
    Trophy,
    Users,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import FriendsActivity from "@/components/hub/friends-activity";

import { WeeklyReleases } from "@/components/releases/weekly-releases";

import type { UpcomingRelease } from "@/modules/catalog";

/* =========================================================
   DADOS MOCKADOS

   Futuramente substituir pelos dados reais do banco/API.
========================================================= */

const initialRecommendations = [
    {
        id: 1,
        friend: "Abelinha",
        avatar: "A",
        game: "Undertale",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
        hours: "28h",
        score: "10",
        comment:
            "Você precisa jogar esse. A história é simplesmente incrível e acho que você vai gostar muito.",
    },
];

const topGames = [
    {
        position: 1,
        title: "The Last of Us",
        score: "10",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1r6z.jpg",
    },
    {
        position: 2,
        title: "God of War",
        score: "9.5",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1tmu.jpg",
    },
    {
        position: 3,
        title: "Red Dead Redemption 2",
        score: "9.5",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1q1f.jpg",
    },
    {
        position: 4,
        title: "Undertale",
        score: "9",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1r7f.jpg",
    },
    {
        position: 5,
        title: "Hollow Knight",
        score: "9",
        image: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1rgi.jpg",
    },
];

/* =========================================================
   PROPS
========================================================= */

interface HomePageProps {
    upcomingGames: UpcomingRelease[];
}

/* =========================================================
   COMPONENTES AUXILIARES
========================================================= */

function SectionTitle({
    icon: Icon,
    title,
    action,
}: {
    icon: ElementType;
    title: string;
    action?: string;
}) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />

                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            </div>

            {action && (
                <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
                    {action}
                </button>
            )}
        </div>
    );
}

/* =========================================================
   PÁGINA PRINCIPAL
========================================================= */

export function HomePage({ upcomingGames }: HomePageProps) {
    const [recommendations, setRecommendations] = useState(initialRecommendations);

    const currentXp = 680;
    const nextLevelXp = 1000;

    const progress = (currentXp / nextLevelXp) * 100;

    /* ---------------------------------------------------------
       Remove recomendação com animação
    --------------------------------------------------------- */

    const dismissRecommendation = (id: number) => {
        const element = document.getElementById(`recommendation-${id}`);

        if (element) {
            element.classList.add("opacity-0", "scale-95");
        }

        setTimeout(() => {
            setRecommendations((current) => current.filter((item) => item.id !== id));
        }, 200);
    };

    return (
        <main className="w-full">
            <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:py-8">
                {/* =====================================================
                    GRID PRINCIPAL
                ===================================================== */}

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    {/* =================================================
                        COLUNA ESQUERDA
                    ================================================= */}

                    <div className="min-w-0 space-y-6 lg:col-span-8">
                        {/* ---------------------------------------------
                            HERO / BOAS-VINDAS
                        --------------------------------------------- */}

                        <section className="py-2">
                            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Bom ter você de volta, Diego!
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                Mais uma aventura está esperando por você. Continue registrando seus
                                jogos e construindo sua história.
                            </p>
                        </section>

                        {/* ---------------------------------------------
                            RECOMENDAÇÕES DE AMIGOS
                        --------------------------------------------- */}

                        {recommendations.length > 0 && (
                            <section className="space-y-4">
                                {recommendations.map((recommendation) => (
                                    <article
                                        id={`recommendation-${recommendation.id}`}
                                        key={recommendation.id}
                                        className="
                                                rounded-xl
                                                border
                                                border-border
                                                bg-card
                                                p-4
                                                shadow-sm
                                                transition-all
                                                duration-200
                                                sm:p-5
                                            "
                                    >
                                        {/* Cabeçalho */}

                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                {recommendation.avatar}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm text-foreground">
                                                    <span className="font-semibold">
                                                        {recommendation.friend}
                                                    </span>{" "}
                                                    <span className="text-muted-foreground">
                                                        recomendou um jogo para você
                                                    </span>
                                                </p>

                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    Uma recomendação direta para sua jornada
                                                </p>
                                            </div>
                                        </div>

                                        {/* Corpo */}

                                        <div className="mt-4 flex gap-4">
                                            <img
                                                src={recommendation.image}
                                                alt={recommendation.game}
                                                className="
                                                        h-36
                                                        w-24
                                                        shrink-0
                                                        rounded-lg
                                                        object-cover
                                                    "
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-lg font-bold text-foreground">
                                                            {recommendation.game}
                                                        </p>

                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            Experiência de {recommendation.friend}
                                                        </p>
                                                    </div>

                                                    <div className="flex shrink-0 items-center gap-1 rounded-md bg-muted px-2 py-1">
                                                        <Star className="h-3 w-3 fill-current text-primary" />

                                                        <span className="text-xs font-semibold text-foreground">
                                                            {recommendation.score}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock3 className="h-3.5 w-3.5" />

                                                        {recommendation.hours}
                                                    </span>

                                                    <span className="flex items-center gap-1">
                                                        <Star className="h-3.5 w-3.5" />
                                                        Nota {recommendation.score}
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex gap-2">
                                                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                                        {recommendation.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ações */}

                                        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center">
                                            <Button
                                                size="sm"
                                                className="text-xs"
                                                onClick={() =>
                                                    dismissRecommendation(recommendation.id)
                                                }
                                            >
                                                Adicionar à Wishlist
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="text-xs"
                                                onClick={() =>
                                                    dismissRecommendation(recommendation.id)
                                                }
                                            >
                                                <Check className="mr-1.5 h-3.5 w-3.5" />
                                                Já Zerei
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-xs text-muted-foreground hover:text-foreground"
                                                onClick={() =>
                                                    dismissRecommendation(recommendation.id)
                                                }
                                            >
                                                <X className="mr-1.5 h-3.5 w-3.5" />
                                                Dispensar
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </section>
                        )}

                        {/* ---------------------------------------------
                            ATIVIDADES DOS AMIGOS
                        --------------------------------------------- */}

                        <section>
                            <SectionTitle
                                icon={Users}
                                title="Atividades dos amigos"
                                action="Ver tudo"
                            />

                            <FriendsActivity />
                        </section>

                        {/* ---------------------------------------------
                            LANÇAMENTOS

                            Agora os jogos vêm diretamente do IGDB.
                        --------------------------------------------- */}

                        <WeeklyReleases games={upcomingGames} limit={5} />
                    </div>

                    {/* =================================================
                        COLUNA DIREITA
                    ================================================= */}

                    <aside className="min-w-0 space-y-6 lg:col-span-4">
                        {/* ---------------------------------------------
                            STATUS DO JOGADOR
                        --------------------------------------------- */}

                        <section
                            className="
                                rounded-xl
                                border
                                border-border
                                bg-card
                                p-5
                                shadow-sm
                            "
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Seu nível
                                    </p>

                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-2xl font-bold text-foreground">
                                            01
                                        </span>

                                        <span className="text-xs text-primary">Jogador</span>
                                    </div>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                                    <Trophy className="h-5 w-5 text-primary" />
                                </div>
                            </div>

                            {/* XP */}

                            <div className="mt-5">
                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{currentXp} XP</span>

                                    <span className="text-muted-foreground">{nextLevelXp} XP</span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-primary transition-all duration-500"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-2 text-[11px] text-muted-foreground">
                                    Faltam{" "}
                                    <span className="font-semibold text-foreground">
                                        {nextLevelXp - currentXp} XP
                                    </span>{" "}
                                    para o próximo nível.
                                </p>
                            </div>

                            {/* Métricas */}

                            <div className="mt-5 grid grid-cols-3 divide-x divide-border border-t border-border pt-4">
                                <div className="text-center">
                                    <p className="text-lg font-bold text-foreground">24</p>

                                    <p className="text-[10px] text-muted-foreground">Zerados</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-lg font-bold text-foreground">18</p>

                                    <p className="text-[10px] text-muted-foreground">Em 2026</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-lg font-bold text-foreground">186h</p>

                                    <p className="text-[10px] text-muted-foreground">Registradas</p>
                                </div>
                            </div>

                            {/* Insígnias */}

                            <div className="mt-5 border-t border-border pt-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-foreground">
                                        Insígnias
                                    </span>

                                    <span className="text-[10px] text-muted-foreground">1 / 4</span>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    <div className="flex aspect-square items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                                        <Medal className="h-5 w-5 text-primary" />
                                    </div>

                                    {[1, 2, 3].map((item) => (
                                        <div
                                            key={item}
                                            className="flex aspect-square items-center justify-center rounded-lg border border-border bg-muted/40"
                                        >
                                            <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* ---------------------------------------------
                            DESAFIO
                        --------------------------------------------- */}

                        <section
                            className="
                                rounded-xl
                                border
                                border-border
                                bg-accent/40
                                p-5
                            "
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Gamepad2 className="h-4 w-4 text-primary" />

                                        <span className="text-xs font-semibold text-primary">
                                            Desafio mensal
                                        </span>
                                    </div>

                                    <h2 className="mt-2 text-base font-semibold text-foreground">
                                        Outubro de terror
                                    </h2>

                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        Finalize 3 jogos de terror durante o mês.
                                    </p>
                                </div>

                                <span className="shrink-0 text-sm font-bold text-foreground">
                                    1/3
                                </span>
                            </div>

                            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-1/3 rounded-full bg-primary" />
                            </div>

                            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                                Ver desafio
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </section>

                        {/* ---------------------------------------------
                            TOP 5
                        --------------------------------------------- */}

                        <section>
                            <SectionTitle
                                icon={Star}
                                title="Seus jogos mais bem avaliados"
                                action="Ver todos"
                            />

                            <div className="divide-y divide-border/40">
                                {topGames.map((game) => (
                                    <div
                                        key={game.position}
                                        className="flex items-center gap-3 py-2.5"
                                    >
                                        <span className="w-5 text-center text-xs font-bold text-muted-foreground">
                                            {game.position}
                                        </span>

                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="h-10 w-8 rounded object-cover"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-medium text-foreground">
                                                {game.title}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1">
                                            <Star className="h-3 w-3 fill-current text-primary" />

                                            <span className="text-[10px] font-semibold text-foreground">
                                                {game.score}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </main>
    );
}
