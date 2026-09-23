import { NextResponse } from "next/server";
import { loginSchema } from "@/modules/auth/validations";
import { authenticateUser } from "@/modules/auth/repository";
import { signSessionToken } from "@/modules/auth/token";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/modules/auth/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    try {
        const user = await authenticateUser(parsed.data.email, parsed.data.password);
        const token = await signSessionToken({
            userId: user.id,
            email: user.email,
            name: user.name,
        });

        const res = NextResponse.json({ user });
        res.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: AUTH_COOKIE_MAX_AGE,
        });

        return res;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao fazer login";
        return NextResponse.json({ error: message }, { status: 401 });
    }
}
