"use client";
import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import { ReleaseCard } from "@/components/releases/release-card";
import type { UpcomingRelease } from "@/modules/catalog";
interface WeeklyReleasesProps {
    games: UpcomingRelease[];
    isLoading?: boolean;
    limit?: number;
}
function ReleaseSkeleton() {
    return (
        <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card">
            {" "}
            <div className="aspect-[2/3] animate-pulse bg-muted" />{" "}
            <div className="space-y-1.5 p-2.5">
                {" "}
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />{" "}
                <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />{" "}
            </div>{" "}
        </div>
    );
}
export function WeeklyReleases({ games, isLoading = false, limit = 5 }: WeeklyReleasesProps) {
    const visibleGames = games.slice(0, limit);
    return (
        <section className="space-y-4">
            {" "}
            <div className="flex items-center justify-between">
                {" "}
                <div className="flex items-center gap-2.5">
                    {" "}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {" "}
                        <CalendarDays className="h-4 w-4" />{" "}
                    </div>{" "}
                    <div>
                        {" "}
                        <h2 className="text-base font-semibold text-foreground">
                            {" "}
                            Próximos lançamentos{" "}
                        </h2>{" "}
                        <p className="text-xs text-muted-foreground">
                            {" "}
                            Os jogos que estão chegando{" "}
                        </p>{" "}
                    </div>{" "}
                </div>{" "}
                <Link
                    href="/releases"
                    className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    {" "}
                    Ver todos{" "}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />{" "}
                </Link>{" "}
            </div>{" "}
            <div className="grid grid-cols-5 gap-3">
                {" "}
                {isLoading
                    ? Array.from({ length: limit }).map((_, index) => (
                          <ReleaseSkeleton key={index} />
                      ))
                    : visibleGames.map((game) => (
                          <div key={game.id} className="min-w-0">
                              {" "}
                              <ReleaseCard game={game} compact />{" "}
                          </div>
                      ))}{" "}
            </div>{" "}
        </section>
    );
}
