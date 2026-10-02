"use client";

import Link from "next/link";
import { Star, Users } from "lucide-react";

interface FriendActivity {
    id: number;
    username: string;
    avatar: string;
    action: "completed" | "added" | "reviewed";
    game: string;
    gameSlug: string;
    rating?: number;
    hours?: number;
    timestamp: string;
}

const activities: FriendActivity[] = [
    {
        id: 1,
        username: "Abelinha",
        avatar: "https://i.pravatar.cc/100?img=47",
        action: "completed",
        game: "Undertale",
        gameSlug: "undertale",
        rating: 5,
        timestamp: "há 2 horas",
    },
    {
        id: 2,
        username: "Kazuya",
        avatar: "https://i.pravatar.cc/100?img=12",
        action: "added",
        game: "Resident Evil 4",
        gameSlug: "resident-evil-4",
        timestamp: "há 5 horas",
    },
    {
        id: 3,
        username: "Abelinha",
        avatar: "https://i.pravatar.cc/100?img=47",
        action: "completed",
        game: "It Takes Two",
        gameSlug: "it-takes-two",
        hours: 18,
        timestamp: "ontem",
    },
    {
        id: 4,
        username: "Kazuya",
        avatar: "https://i.pravatar.cc/100?img=12",
        action: "reviewed",
        game: "Hades",
        gameSlug: "hades",
        rating: 4.5,
        timestamp: "ontem",
    },
];

function ActivityText({ activity }: { activity: FriendActivity }) {
    return (
        <span>
            <Link
                href={`/profile/${activity.username}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
            >
                {activity.username}
            </Link>{" "}
            {activity.action === "completed" && "zerou "}
            {activity.action === "added" && "adicionou "}
            {activity.action === "reviewed" && "avaliou "}
            <Link
                href={`/games/${activity.gameSlug}`}
                className="font-semibold text-primary hover:underline underline-offset-2 transition-colors"
            >
                {activity.game}
            </Link>
            {activity.action === "completed" && activity.rating && (
                <>
                    {" "}
                    e deu{" "}
                    <span className="inline-flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className={`h-3 w-3 ${
                                    index < Math.round(activity.rating!)
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground/40"
                                }`}
                            />
                        ))}
                    </span>
                </>
            )}
            {activity.action === "completed" && activity.hours && <> em {activity.hours}h</>}
            {activity.action === "reviewed" && activity.rating && (
                <>
                    {" "}
                    com nota{" "}
                    <span className="font-medium text-foreground">
                        {activity.rating.toString().replace(".", ",")}
                    </span>
                </>
            )}
        </span>
    );
}

export default function FriendsActivity() {
    const hasActivities = activities.length > 0;

    return (
        <section className="w-full rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            {/* Lista de atividades */}
            {hasActivities ? (
                <div className="divide-y divide-border/40">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-3 py-3 first:pt-1 last:pb-1"
                        >
                            {/* Avatar */}
                            <Link href={`/profile/${activity.username}`} className="shrink-0">
                                <img
                                    src={activity.avatar}
                                    alt={`Avatar de ${activity.username}`}
                                    className="h-8 w-8 rounded-full object-cover border border-border/60 transition-opacity hover:opacity-80"
                                />
                            </Link>

                            {/* Conteúdo */}
                            <div className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">
                                <div>
                                    <ActivityText activity={activity} />
                                </div>

                                <span className="mt-0.5 block text-[11px] text-muted-foreground/60">
                                    {activity.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Users className="h-5 w-5" />
                    </div>

                    <h3 className="text-sm font-medium text-foreground">Ainda não há atividades</h3>

                    <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                        Adicione alguns amigos para acompanhar suas jornadas pelos games.
                    </p>

                    <Link
                        href="/friends"
                        className="mt-4 text-xs font-semibold text-primary hover:underline underline-offset-2"
                    >
                        Encontrar jogadores
                    </Link>
                </div>
            )}
        </section>
    );
}
