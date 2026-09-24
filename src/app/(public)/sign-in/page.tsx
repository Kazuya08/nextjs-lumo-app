"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { default as NextImage } from "next/image";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PublicGuard } from "@/components/auth/AuthGuard";
import { AuthProvider } from "@/contexts/AuthContext";
import { Sparkles, Compass, Trophy, Gamepad2, Sun, Moon, ArrowLeft } from "lucide-react";

export default function AuthPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isRegister, setIsRegister] = useState(false);

    const loginImage = "https://i.pinimg.com/736x/c7/63/64/c7636409decf56ab820fe24f3a5a62d8.jpg";
    const registerImage = "https://i.pinimg.com/736x/82/81/25/8281255e347781b29ce3758064d4a362.jpg";

    useEffect(() => {
        const isDarkHtml = document.documentElement.classList.contains("dark");
        setIsDarkMode(isDarkHtml);

        const img1 = new Image();
        img1.src = loginImage;
        const img2 = new Image();
        img2.src = registerImage;
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <AuthProvider>
            <PublicGuard>
                <div className={isDarkMode ? "dark" : ""}>
                    <div className="w-full h-[100dvh] flex items-center justify-center bg-background text-foreground p-0 sm:p-4 md:p-6 overflow-hidden">
                        <div className="w-full h-full lg:w-[1100px] lg:h-[850px] lg:max-w-[1200px] flex flex-col lg:flex-row bg-card text-foreground rounded-none sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-none lg:shadow-2xl border-0 lg:border border-border relative">
                            {/* ========================================================= */}
                            {/* PAINEL DA IMAGEM (Alterna de lado com isRegister)        */}
                            {/* ========================================================= */}
                            <div
                                className={`hidden lg:flex relative lg:w-[40%] xl:w-[50%] h-full flex-col justify-between p-8 xl:p-12 overflow-hidden bg-zinc-950 shrink-0 ${isRegister ? "lg:order-2" : "lg:order-1"}`}
                            >
                                <div className="absolute inset-0 z-0">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t ${isRegister ? "lg:bg-gradient-to-l" : "lg:bg-gradient-to-r"} from-zinc-950 via-zinc-950/80 to-transparent z-20`}
                                    />
                                    <div className="absolute inset-0 bg-zinc-900/40 z-10" />

                                    <NextImage
                                        src="https://i.pinimg.com/736x/c7/63/64/c7636409decf56ab820fe24f3a5a62d8.jpg"
                                        alt="Universo dos Games"
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 0vw"
                                        className={`object-cover object-center transition-opacity duration-500 ${!isRegister ? "opacity-100" : "opacity-0"}`}
                                        priority
                                    />
                                    <NextImage
                                        src="https://i.pinimg.com/736x/82/81/25/8281255e347781b29ce3758064d4a362.jpg"
                                        alt="Nova Aventura"
                                        fill
                                        sizes="(min-width: 1024px) 50vw, 0vw"
                                        className={`object-cover object-center transition-opacity duration-500 ${isRegister ? "opacity-100" : "opacity-0"}`}
                                    />
                                </div>

                                <div className="relative z-40 mt-4 mb-auto py-2 max-w-xl">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3 tracking-wide uppercase">
                                        <Compass className="w-3.5 h-3.5" />
                                        {isRegister ? "Sua Nova Aventura" : "Sua Jornada Gamer"}
                                    </div>

                                    <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3">
                                        {isRegister ? (
                                            <>
                                                Sua próxima aventura{" "}
                                                <span className="text-primary">começa aqui</span>.
                                            </>
                                        ) : (
                                            <>
                                                Grandes histórias merecem ser{" "}
                                                <span className="text-primary">registradas</span>.
                                            </>
                                        )}
                                    </h1>

                                    <p className="text-zinc-300 text-sm xl:text-base mb-6 leading-relaxed font-light">
                                        {isRegister
                                            ? "Crie seu perfil, registre sua história e comece a construir sua jornada gamer na plataforma oficial."
                                            : "Entre na sua jornada, acompanhe seu progresso e continue descobrindo novas aventuras."}
                                    </p>

                                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800/80">
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Trophy className="w-4 h-4" />
                                            </span>
                                            <span>
                                                {isRegister
                                                    ? "Registre sua história"
                                                    : "Jogos finalizados"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Sparkles className="w-4 h-4" />
                                            </span>
                                            <span>
                                                {isRegister ? "Evolua com XP" : "Conquiste XP"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-zinc-300 text-xs xl:text-sm font-medium">
                                            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                                                <Gamepad2 className="w-4 h-4" />
                                            </span>
                                            <span>
                                                {isRegister
                                                    ? "Descubra novos jogos"
                                                    : "Novas aventuras"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ========================================================= */}
                            {/* ÁREA DOS FORMULÁRIOS (Alterna de lado com isRegister)    */}
                            {/* ========================================================= */}
                            <div
                                className={`w-full lg:w-[50%] xl:w-[60%] h-full flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-card relative overflow-hidden ${isRegister ? "lg:order-1" : "lg:order-2"}`}
                            >
                                <div className="flex items-center justify-between w-full shrink-0 h-9 mb-2">
                                    <div className="relative z-30 flex items-center justify-between">
                                        <Link
                                            href="/"
                                            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/85 border border-zinc-800 px-3 py-2 rounded-lg transition-colors group ml-auto"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                                            <span>Voltar para o site</span>
                                        </Link>
                                    </div>{" "}
                                    <div />
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-lg border border-border bg-background text-muted-foreground hover:text-primary flex items-center gap-2 text-xs font-medium transition-colors cursor-pointer ml-auto"
                                    >
                                        {isDarkMode ? (
                                            <Sun className="w-3.5 h-3.5 text-primary" />
                                        ) : (
                                            <Moon className="w-3.5 h-3.5" />
                                        )}
                                        <span className="hidden sm:inline">
                                            {isDarkMode ? "Modo Claro" : "Tema Escuro"}
                                        </span>
                                        <span className="sm:hidden">
                                            {isDarkMode ? "Claro" : "Escuro"}
                                        </span>
                                    </button>
                                </div>

                                <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col justify-center">
                                    {isRegister ? (
                                        <RegisterForm
                                            onSwitchToLogin={() => setIsRegister(false)}
                                        />
                                    ) : (
                                        <LoginForm onSwitchToRegister={() => setIsRegister(true)} />
                                    )}
                                </div>

                                <div className="hidden lg:block text-center text-[11px] text-muted-foreground shrink-0 h-4 mt-2">
                                    © 2026 Project Lumo. Todos os direitos reservados.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PublicGuard>
        </AuthProvider>
    );
}
