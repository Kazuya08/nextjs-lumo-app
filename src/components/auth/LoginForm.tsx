"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/modules/auth";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from "lucide-react";

interface LoginFormProps {
    onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isLoading, error, clearError } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            clearError();
            await login(data);
            if (onSuccess) {
                onSuccess();
            } else {
                router.push("/finished-games");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto my-auto py-6">
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
                    Bem-vindo!
                </h2>
                <p className="text-sm text-muted-foreground">Comece sua jornada gamer.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <Alert variant="destructive" className="py-2">
                        <AlertDescription className="text-xs">{error}</AlertDescription>
                    </Alert>
                )}

                {/* Campo Email */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="email"
                        className="text-xs font-semibold text-foreground tracking-wide"
                    >
                        E-mail
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                            <Mail className="h-4 w-4" />
                        </div>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            {...register("email")}
                            disabled={isSubmitting || isLoading}
                            className="pl-10 h-11 text-sm bg-background text-foreground border-border focus-visible:ring-primary transition-all"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label
                        htmlFor="password"
                        className="text-xs font-semibold text-foreground tracking-wide"
                    >
                        Senha
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                            <Lock className="h-4 w-4" />
                        </div>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Sua senha"
                            {...register("password")}
                            disabled={isSubmitting || isLoading}
                            className="pl-10 pr-10 h-11 text-sm bg-background text-foreground border-border focus-visible:ring-primary transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting || isLoading}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Opções Adicionais: Lembrar de mim & Esqueceu a senha */}
                <div className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background accent-primary cursor-pointer"
                        />
                        <label
                            htmlFor="remember"
                            className="text-muted-foreground font-medium cursor-pointer select-none"
                        >
                            Lembrar de mim
                        </label>
                    </div>
                    <Link
                        href="/forgot-password"
                        className="font-medium text-primary hover:underline transition-colors"
                    >
                        Esqueceu sua senha?
                    </Link>
                </div>

                <Button
                    type="submit"
                    className="w-full h-11 bg-primary hover:bg-primary/95 text-primary-foreground font-medium text-sm transition-all shadow-lg shadow-primary/20 group flex items-center justify-center gap-2 mt-2"
                    disabled={isSubmitting || isLoading}
                >
                    {isSubmitting || isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Entrando...</span>
                        </>
                    ) : (
                        <>
                            <span>Entrar na minha jornada</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            {/* Divisor "ou" */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground tracking-wider">ou</span>
                </div>
            </div>

            <Button
                variant="outline"
                type="button"
                className="w-full h-11 border-border bg-background hover:bg-muted/50 text-foreground font-medium text-xs transition-colors flex items-center justify-center gap-3"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.14C3.18 21.32 7.23 24 12 24z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.62H1.18C.43 8.14 0 9.87 0 12s.43 3.86 1.18 5.38l4.09-3.14z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.68 1.18 6.62l4.09 3.14c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                </svg>
                <span>Continuar com Google</span>
            </Button>

            {/* Cadastro de Novo Usuário */}
            <div className="mt-8 text-center pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                    Ainda não faz parte da jornada?
                </p>
                <Button
                    asChild
                    variant="secondary"
                    className="w-full h-10 text-xs font-semibold bg-muted/80 hover:bg-muted text-foreground transition-colors"
                >
                    <Link href="/sign-up">Criar minha conta</Link>
                </Button>
            </div>
        </div>
    );
}
