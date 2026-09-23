"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { LoginForm } from '@/components/auth/LoginForm'
import { PublicGuard } from '@/components/auth/AuthGuard'
import { AuthProvider } from '@/contexts/AuthContext'
import { Sparkles, Compass, Trophy, Gamepad2, Sun, Moon, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function SignInPage() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        const isDarkHtml = document.documentElement.classList.contains("dark")
        setIsDarkMode(isDarkHtml)
    }, [])

    const toggleTheme = () => {
        const newMode = !isDarkMode
        setIsDarkMode(newMode)
        if (newMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <AuthProvider>
            <PublicGuard>
                <div className={isDarkMode ? "dark" : ""}>
                    {/* Contêiner principal cravado na viewport (100dvh) sem nenhuma rolagem */}
                    <div className="w-full h-[100dvh] flex items-center justify-center bg-background text-foreground transition-colors duration-300 p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden">

                        <div className="w-full h-full max-w-7xl flex flex-col lg:flex-row bg-card text-foreground transition-colors duration-300 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border">

                            {/* ÁREA ESQUERDA — IMAGEM E CONTEÚDO (visível apenas em lg+) */}
                            <div className="hidden lg:flex relative lg:w-[45%] xl:w-[50%] h-full flex-col justify-between p-8 xl:p-12 overflow-hidden bg-zinc-950 shrink-0">
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-20" />
                                    <div className="absolute inset-0 bg-zinc-900/40 z-10" />
                                    <Image
                                        src="https://i.pinimg.com/736x/c7/63/64/c7636409decf56ab820fe24f3a5a62d8.jpg"
                                        alt="Universo dos Games"
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000"
                                    />
                                </div>

                                <div className="relative z-20 flex items-center justify-between">
                                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 border border-zinc-800 px-3 py-2 rounded-lg transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950">
                                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                        <span>Voltar para o site</span>
                                    </Link>
                                </div>

                                <div className="relative z-40 mt-4 mb-auto py-2 max-w-xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3 tracking-wide uppercase">
                                        <Compass className="w-3.5 h-3.5" /> Sua Jornada Gamer
                                    </div>

                                    <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
                                        Grandes histórias merecem ser <span className="text-primary">registradas</span>.
                                    </h1>

                                    <p className="text-zinc-300 text-sm xl:text-base mb-6 leading-relaxed font-light">
                                        Entre na sua jornada, acompanhe seu progresso e continue descobrindo novas aventuras. Você já construiu sua história nos games. Agora, continue sua jornada.
                                    </p>

                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800/80">
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Trophy className="w-4 h-4" />
                                            </span>
                                            <span>Jogos finalizados</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Sparkles className="w-4 h-4" />
                                            </span>
                                            <span>Conquiste XP</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Gamepad2 className="w-4 h-4" />
                                            </span>
                                            <span>Novas aventuras</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-20 text-xs text-zinc-500">
                                    © 2026 Project Lumo. Todos os direitos reservados.
                                </div>
                            </div>

                            {/* ÁREA DIREITA — FORMULÁRIO DE LOGIN (Mobile / Tablet / Desktop) */}
                            <div className="w-full lg:w-[55%] xl:w-[50%] h-full flex flex-col justify-between p-4 sm:p-6 lg:p-10 bg-card relative overflow-hidden">

                                {/* Cabeçalho: Voltar + Tema com ajuste de altura para não esmagar */}
                                <div className="flex items-center justify-between lg:justify-end w-full shrink-0 h-9">
                                    <Link href="/" className="lg:hidden inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Voltar ao site</span>
                                    </Link>

                                    <button
                                        onClick={toggleTheme}
                                        className="p-1.5 sm:p-2 rounded-lg border border-border bg-background text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        {isDarkMode ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4" />}
                                        <span className="hidden sm:inline">{isDarkMode ? "Modo Claro" : "Tema Escuro"}</span>
                                    </button>
                                </div>

                                
                                <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto py-2 sm:py-4 flex flex-col justify-center">
                                    <LoginForm />
                                </div>

                                <div className="lg:hidden text-center text-[10px] sm:text-[11px] text-muted-foreground shrink-0 h-4">
                                    © 2026 Project Lumo. Todos os direitos reservados.
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </PublicGuard>
        </AuthProvider>
    )
}