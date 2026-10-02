"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/global/main-nav";
import { MobileNav } from "@/components/global/mobile-nav";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
    { title: "Jogos", href: "/games" },
    { title: "Desafios", href: "/challenges" },
    { title: "Minha Lista", href: "/my-list" },
];

export function SiteHeader() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full bg-background transition-colors duration-200">
            {/* =========================================================
          HEADER SUPERIOR (Ações de utilizador e Branding)
      ========================================================= */}
            <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
                >
                    <span className="text-lg">✦</span>
                    <span className="text-base sm:text-lg">Lumo</span>
                </Link>

                <div className="flex items-center gap-2">
                    {!isAuthenticated ? (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-xs font-medium text-muted-foreground hover:text-foreground"
                            >
                                <Link href="/sign-in">Entrar</Link>
                            </Button>

                            <Button asChild size="sm" className="text-xs font-medium">
                                <Link href="/sign-up">Cadastre-se</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative h-9 w-9 text-muted-foreground transition-colors hover:text-primary"
                                title="Notificações"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                                <span className="sr-only">Notificações</span>
                            </Button>

                            <UserMenu user={user!} onLogout={logout} />
                        </>
                    )}
                </div>
            </div>

            {/* =========================================================
          SEGUNDO MENU (Navegação + Busca sem caixa/borda)
      ========================================================= */}
            <div className="border-b border-border/60">
                <div className="mx-auto flex h-12 max-w-[1200px] items-center px-4 sm:px-6">
                    <div className="shrink-0">
                        <div className="hidden md:block">
                            <MainNav items={navItems} />
                        </div>
                        <div className="md:hidden">
                            <MobileNav items={navItems} />
                        </div>
                    </div>

                    <div className="flex-1" />

                    <div className="mx-3 hidden h-5 border-l border-border sm:block" />

                    <div className="relative w-full max-w-xs">
                        <Search
                            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Buscar jogos..."
                            aria-label="Buscar jogos"
                            className="h-9 w-full bg-transparent pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-0 border-none ring-0"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
