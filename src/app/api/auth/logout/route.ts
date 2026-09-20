import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/modules/auth/types';

export async function POST() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(AUTH_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    return res;
}