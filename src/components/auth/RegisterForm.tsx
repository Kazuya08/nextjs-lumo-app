'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '@/modules/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2, User, Mail, AtSign, Calendar, Lock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface RegisterFormProps {
    onSuccess?: () => void;
    onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const { register: registerUser, isLoading, error, clearError } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const passwordValue = watch('password') || '';
    const hasMinLength = passwordValue.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(passwordValue);
    const hasNumber = /[0-9]/.test(passwordValue);

    const onSubmit = async (data: RegisterFormData) => {
        if (!acceptTerms) return;
        try {
            clearError();
            await registerUser(data);
            onSuccess?.();
        } catch {
            // Error handled by context
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Cabeçalho limpo */}
            <div className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    Criar conta
                </h2>
                <p className="text-xs text-muted-foreground">
                    Comece sua jornada no Project Lumo.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
                {error && (
                    <Alert variant="destructive" className="py-1.5">
                        <AlertDescription className="text-xs">{error}</AlertDescription>
                    </Alert>
                )}

                {/* Grid para Nome e Username */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-[11px] font-semibold text-foreground">Nome</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <User className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="name"
                                placeholder="Seu nome"
                                {...register('name')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                        </div>
                        {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="username" className="text-[11px] font-semibold text-foreground">Username</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <AtSign className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="username"
                                placeholder="Seu nick"
                                {...register('username')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                        </div>
                        {errors.username && <p className="text-[10px] text-destructive">{errors.username.message}</p>}
                    </div>
                </div>

                {/* Email e Data de Nascimento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-[11px] font-semibold text-foreground">E-mail</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {...register('email')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                        </div>
                        {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="birthDate" className="text-[11px] font-semibold text-foreground">Nascimento</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="birthDate"
                                type="date"
                                {...register('birthDate')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                        </div>
                        {errors.birthDate && <p className="text-[10px] text-destructive">{errors.birthDate.message}</p>}
                    </div>
                </div>

                {/* Senha e Confirmação */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <Label htmlFor="password" className="text-[11px] font-semibold text-foreground">Senha</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <Lock className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Sua senha"
                                {...register('password')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 pr-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="confirmPassword" className="text-[11px] font-semibold text-foreground">Confirmar</Label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-muted-foreground">
                                <Lock className="h-3.5 w-3.5" />
                            </div>
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirme a senha"
                                {...register('confirmPassword')}
                                disabled={isSubmitting || isLoading}
                                className="pl-8 pr-8 h-9 text-xs bg-background text-foreground border-border"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted-foreground hover:text-foreground"
                            >
                                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Indicadores de requisitos de senha */}
                {passwordValue && (
                    <div className="flex items-center gap-3 pt-0.5 text-[10px]">
                        <span className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}`}>
                            {hasMinLength ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} 8+ chars
                        </span>
                        <span className={`flex items-center gap-1 ${hasLetter ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}`}>
                            {hasLetter ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Letra
                        </span>
                        <span className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-500 font-medium' : 'text-muted-foreground'}`}>
                            {hasNumber ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} Número
                        </span>
                    </div>
                )}
                {(errors.password || errors.confirmPassword) && (
                    <p className="text-[10px] text-destructive">Verifique os erros nas senhas.</p>
                )}

                {/* Termos de Serviço */}
                <div className="flex items-start space-x-2 pt-1">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="h-3.5 w-3.5 mt-0.5 rounded border-border text-primary focus:ring-primary bg-background accent-primary cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] text-muted-foreground leading-tight cursor-pointer select-none">
                        Aceito os{' '}
                        <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">Termos</a>
                        {' '}e a{' '}
                        <a href="/privacy" target="_blank" className="text-primary hover:underline font-medium">Privacidade</a>.
                    </label>
                </div>

                {/* Botão de Cadastro */}
                <Button
                    type="submit"
                    className="w-full h-10 bg-primary hover:bg-primary/95 text-primary-foreground font-medium text-xs transition-all shadow-lg shadow-primary/20 group flex items-center justify-center gap-2 mt-1"
                    disabled={isSubmitting || isLoading || !acceptTerms}
                >
                    {(isSubmitting || isLoading) ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Criando conta...</span>
                        </>
                    ) : (
                        <>
                            <span>Finalizar cadastro</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </form>

            {/* Retorno para Login tradicional no Rodapé */}
            <div className="mt-4 text-center pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1.5">
                    Já faz parte da jornada?
                </p>
                <Button
                    type="button"
                    onClick={onSwitchToLogin}
                    variant="secondary"
                    className="w-full h-9 text-xs font-semibold bg-muted/80 hover:bg-muted text-foreground transition-colors cursor-pointer"
                >
                    Entrar na minha conta
                </Button>
            </div>
        </div>
    );
}