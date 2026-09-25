"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Laptop } from "lucide-react";

export function SiteFooter() {
    const { setTheme } = useTheme();

    return (
        <footer className="w-full border-t border-border bg-white dark:bg-black text-slate-900 dark:text-foreground mt-auto transition-colors duration-200">
            <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between items-start">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-lg tracking-tight">
                                ✨ Project Lumo
                            </span>
                            <p className="text-xs text-slate-600 dark:text-muted-foreground leading-relaxed max-w-xs">
                                Sua jornada gamer registrada passo a passo. Conquiste XP, organize
                                seu acervo e compartilhe sua história.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200 dark:border-border/40 w-fit">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                                Aparência & Destaque
                            </span>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-slate-100 dark:bg-muted/60 p-1 rounded-lg border border-slate-200 dark:border-border">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTheme("light")}
                                        className="h-6 w-6 text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
                                        title="Tema Claro"
                                    >
                                        <Sun className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTheme("dark")}
                                        className="h-6 w-6 text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
                                        title="Tema Escuro"
                                    >
                                        <Moon className="h-3 w-3" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTheme("system")}
                                        className="h-6 w-6 text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground"
                                        title="Tema Sistema"
                                    >
                                        <Laptop className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                            Plataforma
                        </span>
                        <Link
                            href="/equipe"
                            className="text-xs text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground transition-colors"
                        >
                            Equipe & História
                        </Link>
                        <Link
                            href="/contato"
                            className="text-xs text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground transition-colors"
                        >
                            Contato
                        </Link>
                        <Link
                            href="/termos"
                            className="text-xs text-slate-600 dark:text-muted-foreground hover:text-slate-900 dark:hover:text-foreground transition-colors"
                        >
                            Termos Legais
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                            Comunidade
                        </span>
                        <span className="text-xs text-slate-500 dark:text-muted-foreground">
                            Discord (Em breve)
                        </span>
                        <span className="text-xs text-slate-500 dark:text-muted-foreground">
                            Twitter / X (Em breve)
                        </span>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-muted-foreground gap-4">
                    <p>© 2026 Project Lumo. Desenvolvido por Thiago Kazua & Diego Carmo.</p>
                    <div className="flex items-center gap-4">
                        <span className="bg-primary/15 text-primary px-2 py-0.5 rounded font-bold border border-primary/20">
                            MVP v0.1.0
                        </span>
                        <Link href="/changelog" className="hover:underline">
                            Histórico de Versões
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
