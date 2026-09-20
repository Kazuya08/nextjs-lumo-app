import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from './types';
import { verifySessionToken, type SessionPayload } from './token';

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    return verifySessionToken(token);
}