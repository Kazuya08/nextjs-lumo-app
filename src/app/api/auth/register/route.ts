import { NextResponse } from "next/server";
import { registerSchema } from "@/modules/auth/validations";
import { createUser } from "@/modules/auth/repository";
import { signSessionToken } from "@/modules/auth/token";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/modules/auth/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        const message = parsed.error.issues[0]?.message ?? "Dados inválidos";
        return NextResponse.json({ error: message }, { status: 400 });
    }

    try {
        const user = await createUser({
            name: parsed.data.name,
            email: parsed.data.email,
            password: parsed.data.password,
        });

        const token = await signSessionToken({
            userId: user.id,
            email: user.email,
            name: user.name,
        });

        const res = NextResponse.json({ user }, { status: 201 });
        res.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: AUTH_COOKIE_MAX_AGE,
        });

        return res;
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao criar conta";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
