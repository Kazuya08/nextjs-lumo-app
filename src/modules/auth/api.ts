import type { LoginCredentials, RegisterCredentials, User } from "./types";

interface ApiError {
    error?: string;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const isForm = options?.body instanceof FormData;

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(isForm ? {} : { "Content-Type": "application/json" }),
            ...(options?.headers ?? {}),
        },
    });

    const data = (await res.json().catch(() => null)) as (T & ApiError) | null;

    if (!res.ok) {
        throw new Error(data?.error ?? "Erro na requisição");
    }

    return data as T;
}

export const authApi = {
    async login(credentials: LoginCredentials): Promise<{ user: User }> {
        return request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },

    async register(credentials: RegisterCredentials): Promise<{ user: User }> {
        return request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },

    async me(): Promise<{ user: User } | null> {
        const res = await fetch("/api/auth/me");

        if (res.status === 401) {
            return null;
        }

        if (!res.ok) {
            throw new Error("Erro ao validar sessão");
        }

        return res.json();
    },

    async logout(): Promise<void> {
        await fetch("/api/auth/logout", { method: "POST" });
    },

    async updateAvatar(file: File): Promise<{ user: User }> {
        const form = new FormData();
        form.append("file", file);

        return request("/api/user/avatar", {
            method: "POST",
            body: form,
        });
    },

    async removeAvatar(): Promise<{ user: User }> {
        return request("/api/user/avatar", {
            method: "DELETE",
        });
    },
};
