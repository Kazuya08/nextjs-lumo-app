"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, Gamepad2, Star } from "lucide-react";
import type { FinishedGame } from "@/modules/finishedGames/types";

function round(value: number): number {
    return Math.round(value * 10) / 10;
}

export function FinishedGamesStats({ games }: { games: FinishedGame[] }) {
    const total = games.length;
    const totalHours = round(games.reduce((acc, game) => acc + (game.totalHours ?? 0), 0));
    const rated = games.filter((game) => game.rating != null);
    const average =
        rated.length > 0
            ? round(rated.reduce((acc, game) => acc + (game.rating as number), 0) / rated.length)
            : null;

    const stats = [
        { label: "Jogos zerados", value: String(total), icon: Gamepad2 },
        { label: "Horas jogadas", value: total > 0 ? `${totalHours}h` : "—", icon: Clock },
        { label: "Nota média", value: average != null ? `${average}/10` : "—", icon: Star },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.label}>
                    <CardContent className="flex items-center justify-center gap-4 p-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm text-muted-foreground">{stat.label}</p>
                            <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
