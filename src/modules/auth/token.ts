import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { AUTH_COOKIE_MAX_AGE } from './types';

export interface SessionPayload {
    userId: string;
    email: string;
    name: string;
}

function getSecret(): Uint8Array {
    const value = process.env.AUTH_SECRET;

    if (!value) {
        throw new Error('AUTH_SECRET não configurado no ambiente');
    }

    return new TextEncoder().encode(value);
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(`${AUTH_COOKIE_MAX_AGE}s`)
        .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, getSecret());

        if (typeof payload.userId !== 'string') {
            return null;
        }

        return {
            userId: payload.userId,
            email: typeof payload.email === 'string' ? payload.email : '',
            name: typeof payload.name === 'string' ? payload.name : '',
        };
    } catch {
        return null;
    }
}