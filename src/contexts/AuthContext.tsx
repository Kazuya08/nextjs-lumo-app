'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials, authApi } from '@/modules/auth';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true
    });
    const [error, setError] = useState<string | null>(null);

    const clearError = () => setError(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            setError(null);
            setState(prev => ({ ...prev, isLoading: true }));

            const { user } = await authApi.login(credentials);

            setState({
                user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
            setState(prev => ({ ...prev, isLoading: false }));
            throw err;
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            setError(null);
            setState(prev => ({ ...prev, isLoading: true }));

            const { user } = await authApi.register(credentials);

            setState({
                user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar conta');
            setState(prev => ({ ...prev, isLoading: false }));
            throw err;
        }
    };

    const logout = async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));

            await authApi.logout();

            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    // Verifica se há uma sessão válida ao carregar a aplicação
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await authApi.me();

                if (result?.user) {
                    setState({
                        user: result.user,
                        isAuthenticated: true,
                        isLoading: false
                    });
                } else {
                    setState({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false
                    });
                }
            } catch {
                setState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            logout,
            error,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}