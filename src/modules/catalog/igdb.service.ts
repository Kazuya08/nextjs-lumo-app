import type { CatalogGame } from './types';

interface IgdbCover {
    url?: string;
}

interface IgdbPlatform {
    name?: string;
}

interface IgdbGameRaw {
    id: number;
    name?: string;
    cover?: IgdbCover;
    platforms?: IgdbPlatform[];
}

interface IgdbTimeToBeat {
    game_id: number;
    hastily?: number;
    normally?: number;
    completely?: number;
}

interface IgdbTokenResponse {
    access_token: string;
    expires_in: number;
}

const IGDB_API_URL = process.env.IGDB_API_URL ?? 'https://api.igdb.com/v4';
const TWITCH_TOKEN_URL = process.env.TWITCH_TOKEN_URL ?? 'https://id.twitch.tv/oauth2/token';

let cachedToken: { token: string; expiresAt: number } | null = null;

function getClientId(): string {
    const clientId = process.env.IGDB_CLIENT_ID;
    if (!clientId) {
        throw new Error('IGDB_CLIENT_ID não configurado no ambiente');
    }
    return clientId;
}

function getClientSecret(): string {
    const clientSecret = process.env.IGDB_CLIENT_SECRET;
    if (!clientSecret) {
        throw new Error('IGDB_CLIENT_SECRET não configurado no ambiente');
    }
    return clientSecret;
}

async function getToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }

    const res = await fetch(TWITCH_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: getClientId(),
            client_secret: getClientSecret(),
            grant_type: 'client_credentials',
        }),
    });

    if (!res.ok) {
        throw new Error('Falha ao obter token de acesso do IGDB');
    }

    const data = (await res.json()) as IgdbTokenResponse;

    cachedToken = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    return cachedToken.token;
}

function sanitizeQuery(query: string): string {
    return query.replace(/["\\]/g, '');
}

function toHttpsImage(url: string): string {
    return url
        .replace('//', 'https://')
        .replace('t_thumb', 't_cover_big');
}

function secondsToHours(seconds?: number): number | undefined {
    if (seconds == null || seconds <= 0) {
        return undefined;
    }

    return Math.round((seconds / 3600) * 10) / 10;
}

export async function searchCatalogGames(query: string): Promise<CatalogGame[]> {
    const token = await getToken();
    const clientId = getClientId();

    const res = await fetch(`${IGDB_API_URL}/games`, {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain',
        },
        body: `fields name, cover.url, platforms.name; search "${sanitizeQuery(query)}"; limit 10; where cover != null & platforms != null;`,
    });

    if (!res.ok) {
        throw new Error('Falha na busca de jogos no IGDB');
    }

    const games = (await res.json()) as IgdbGameRaw[];
    const timeToBeatByGame = await fetchTimeToBeat(games.map((game) => game.id), token, clientId);

    return games.map((game) => {
        const time = timeToBeatByGame.get(game.id);

        return {
            id: game.id,
            title: game.name ?? 'Sem título',
            cover: game.cover?.url ? toHttpsImage(game.cover.url) : null,
            platforms: (game.platforms ?? [])
                .map((platform) => platform.name ?? '')
                .filter(Boolean),
            suggestedHours: secondsToHours(time?.normally),
            suggestedHoursHastily: secondsToHours(time?.hastily),
            suggestedHoursCompletely: secondsToHours(time?.completely),
        };
    });
}

async function fetchTimeToBeat(
    gameIds: number[],
    token: string,
    clientId: string,
): Promise<Map<number, IgdbTimeToBeat>> {
    if (gameIds.length === 0) {
        return new Map();
    }

    try {
        const res = await fetch(`${IGDB_API_URL}/game_time_to_beats`, {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain',
            },
            body: `fields game_id, hastily, normally, completely; where game_id = (${gameIds.join(',')});`,
        });

        if (!res.ok) {
            return new Map();
        }

        const times = (await res.json()) as IgdbTimeToBeat[];
        return new Map(times.map((time) => [time.game_id, time]));
    } catch {
        return new Map();
    }
}
