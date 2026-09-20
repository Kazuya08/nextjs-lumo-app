export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const AUTH_COOKIE_NAME = 'tokenLumo';
export const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 dias em segundos
