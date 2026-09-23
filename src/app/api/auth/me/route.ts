import { NextResponse } from "next/server";
import { getSession } from "@/modules/auth/session";
import { findUserById } from "@/modules/auth/repository";

export const runtime = "nodejs";

export async function GET() {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const user = await findUserById(session.userId);

    if (!user) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    return NextResponse.json({ user });
}
