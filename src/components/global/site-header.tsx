"use client";

import { MainNav } from "@/components/global/main-nav";
import { MobileNav } from "@/components/global/mobile-nav";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "@/components/auth/UserMenu";

const navItems = [
    { title: "Descobrir", href: "/" },
    { title: "Perfil", href: "/profile" },
    { title: "Jogos", href: "/games" },
    { title: "Jogos Zerados", href: "/finished-games" },
    { title: "Sobre", href: "/sobre" },
];

export function SiteHeader() {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-white dark:bg-black text-slate-900 dark:text-foreground transition-colors duration-200">
            <div className="flex h-16 items-center justify-between px-6 max-w-[1200px] mx-auto relative">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight hover:opacity-80 transition-opacity"
                    >
                        <span>✨</span>
                    </Link>

                    <div className="md:hidden">
                        <MobileNav items={navItems} />
                    </div>

                    <MainNav items={navItems} />
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Ações disponíveis SOMENTE para usuários logados */}
                    {isAuthenticated && (
                        <>
                            <Button
                                asChild
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 border-border hover:text-primary transition-colors"
                                title="Adicionar Jogo"
                            >
                                <Link href="/games/new">
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Adicionar Jogo</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative text-muted-foreground hover:text-primary transition-colors"
                                title="Notificações"
                            >
                                <Bell className="h-4 w-4" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                                <span className="sr-only">Notificações</span>
                            </Button>
                        </>
                    )}

                    {isAuthenticated ? (
                        <UserMenu user={user!} onLogout={logout} />
                    ) : (
                        <Button asChild size="sm" className="text-xs font-medium">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
