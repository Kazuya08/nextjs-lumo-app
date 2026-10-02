import type { CatalogGame, CatalogGameDetails, UpcomingRelease } from "./types";

interface IgdbImage {
    url?: string;
}

interface IgdbNamed {
    name?: string;
}

interface IgdbInvolvedCompany {
    company?: IgdbNamed;
    developer?: boolean;
    publisher?: boolean;
}

interface IgdbVideo {
    name?: string;
    video_id?: string;
}

interface IgdbGameRaw {
    id: number;
    name?: string;
    slug?: string;
    summary?: string;
    cover?: IgdbImage;
    artworks?: IgdbImage[];
    screenshots?: IgdbImage[];
    videos?: IgdbVideo[];
    platforms?: IgdbNamed[];
    genres?: IgdbNamed[];
    game_modes?: IgdbNamed[];
    player_perspectives?: IgdbNamed[];
    involved_companies?: IgdbInvolvedCompany[];
    franchises?: IgdbNamed[];
    first_release_date?: number;

    total_rating?: number;
    total_rating_count?: number;

    // Usados nos próximos lançamentos
    rating?: number;
    hypes?: number;
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

const IGDB_API_URL = process.env.IGDB_API_URL ?? "https://api.igdb.com/v4";

const TWITCH_TOKEN_URL = process.env.TWITCH_TOKEN_URL ?? "https://id.twitch.tv/oauth2/token";

const MAX_COMPANIES = 3;
const MAX_SCREENSHOTS = 8;

let cachedToken: {
    token: string;
    expiresAt: number;
} | null = null;

function getClientId(): string {
    const clientId = process.env.IGDB_CLIENT_ID;

    if (!clientId) {
        throw new Error("IGDB_CLIENT_ID não configurado no ambiente");
    }

    return clientId;
}

function getClientSecret(): string {
    const clientSecret = process.env.IGDB_CLIENT_SECRET;

    if (!clientSecret) {
        throw new Error("IGDB_CLIENT_SECRET não configurado no ambiente");
    }

    return clientSecret;
}

async function getToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }

    const res = await fetch(TWITCH_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: getClientId(),
            client_secret: getClientSecret(),
            grant_type: "client_credentials",
        }),
    });

    if (!res.ok) {
        throw new Error("Falha ao obter token de acesso do IGDB");
    }

    const data = (await res.json()) as IgdbTokenResponse;

    cachedToken = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };

    return cachedToken.token;
}

function sanitizeQuery(query: string): string {
    return query.replace(/["\\]/g, "");
}

function toHttpsImage(url: string): string {
    return url.replace("//", "https://").replace("t_thumb", "t_cover_big");
}

function withImageSize(url: string | undefined, size: string): string | null {
    if (!url) {
        return null;
    }

    return toHttpsImage(url).replace(/\/t_[a-z0-9_]+\//, `/t_${size}/`);
}

function secondsToHours(seconds?: number): number | undefined {
    if (seconds == null || seconds <= 0) {
        return undefined;
    }

    return Math.round((seconds / 3600) * 10) / 10;
}

function toUnixSeconds(timestamp?: number): number | undefined {
    if (timestamp == null || timestamp <= 0) {
        return undefined;
    }

    return Math.floor(timestamp);
}

function names(items?: IgdbNamed[]): string[] {
    return (items ?? []).map((item) => item.name ?? "").filter(Boolean);
}

function toCatalogGame(game: IgdbGameRaw, time?: IgdbTimeToBeat): CatalogGame {
    const releaseTimestamp = toUnixSeconds(game.first_release_date);

    return {
        id: game.id,

        title: game.name ?? "Sem título",

        cover: withImageSize(game.cover?.url, "cover_big"),

        platforms: names(game.platforms),

        summary: game.summary?.trim() || undefined,

        genres: names(game.genres),

        gameModes: names(game.game_modes),

        playerPerspectives: names(game.player_perspectives),

        companies: (game.involved_companies ?? [])
            .map((entry) => entry.company?.name ?? "")
            .filter(Boolean)
            .slice(0, MAX_COMPANIES),

        releaseYear: releaseTimestamp
            ? new Date(releaseTimestamp * 1000).getUTCFullYear()
            : undefined,

        releaseDate: releaseTimestamp ? new Date(releaseTimestamp * 1000).toISOString() : undefined,

        rating: game.total_rating ? Math.round(game.total_rating * 10) / 10 : undefined,

        ratingCount: game.total_rating_count,

        suggestedHours: secondsToHours(time?.normally),

        suggestedHoursHastily: secondsToHours(time?.hastily),

        suggestedHoursCompletely: secondsToHours(time?.completely),
    };
}

async function requestGames(body: string): Promise<IgdbGameRaw[]> {
    const token = await getToken();
    const clientId = getClientId();

    const res = await fetch(`${IGDB_API_URL}/games`, {
        method: "POST",
        headers: {
            "Client-ID": clientId,
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
        body,
    });

    if (!res.ok) {
        const errorBody = await res.text();

        console.error("IGDB error:", errorBody);

        throw new Error("Falha na busca de jogos no IGDB");
    }

    return (await res.json()) as IgdbGameRaw[];
}

export async function searchCatalogGames(query: string): Promise<CatalogGame[]> {
    const token = await getToken();
    const clientId = getClientId();

    const games = await requestGames(
        `
        fields
            name,
            cover.url,
            platforms.name,
            summary,
            genres.name,
            game_modes.name,
            involved_companies.company.name,
            first_release_date,
            total_rating,
            total_rating_count;

        search "${sanitizeQuery(query)}";

        limit 10;

        where
            cover != null
            & platforms != null;
        `
    );

    const timeToBeatByGame = await fetchTimeToBeat(
        games.map((game) => game.id),
        token,
        clientId
    );

    return games.map((game) => toCatalogGame(game, timeToBeatByGame.get(game.id)));
}

export async function getCatalogGameDetails(id: number): Promise<CatalogGameDetails | null> {
    const token = await getToken();
    const clientId = getClientId();

    const [game] = await requestGames(
        `
        fields
            name,
            slug,
            cover.url,
            artworks.url,
            screenshots.url,
            videos.video_id,
            videos.name,
            platforms.name,
            summary,
            genres.name,
            game_modes.name,
            player_perspectives.name,
            involved_companies.company.name,
            franchises.name,
            first_release_date,
            total_rating,
            total_rating_count;

        where id = ${id};

        limit 1;
        `
    );

    if (!game) {
        return null;
    }

    const timeToBeatByGame = await fetchTimeToBeat([game.id], token, clientId);

    const videos = (game.videos ?? []).filter((video) => Boolean(video.video_id));

    const trailer =
        videos.find((video) => /trailer|gameplay|game play/i.test(video.name ?? "")) ?? videos[0];

    return {
        ...toCatalogGame(game, timeToBeatByGame.get(game.id)),

        artwork: withImageSize(game.artworks?.[0]?.url, "1080p"),

        screenshots: (game.screenshots ?? [])
            .map((screenshot) => withImageSize(screenshot.url, "screenshot_big"))
            .filter((url): url is string => Boolean(url))
            .slice(0, MAX_SCREENSHOTS),

        trailerId: trailer?.video_id ?? null,

        franchise: names(game.franchises)[0],
    };
}

async function fetchTimeToBeat(
    gameIds: number[],
    token: string,
    clientId: string
): Promise<Map<number, IgdbTimeToBeat>> {
    if (gameIds.length === 0) {
        return new Map();
    }

    try {
        const res = await fetch(`${IGDB_API_URL}/game_time_to_beats`, {
            method: "POST",
            headers: {
                "Client-ID": clientId,
                Authorization: `Bearer ${token}`,
                "Content-Type": "text/plain",
            },
            body: `
                    fields
                        game_id,
                        hastily,
                        normally,
                        completely;

                    where game_id = (${gameIds.join(",")});
                `,
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

export async function getUpcomingReleases(
    startDate: string,
    endDate: string,
    limit = 50
): Promise<UpcomingRelease[]> {
    const token = await getToken();
    /** * A data final é inclusiva para quem chama a função. * * Exemplo: * 02/10/2026 até 08/10/2026 * * A consulta da IGDB será: * >= 02/10 00:00:00 * < 09/10 00:00:00 */ const start =
        new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);
    end.setUTCDate(end.getUTCDate() + 1);
    const startTimestamp = Math.floor(start.getTime() / 1000);
    const endTimestamp = Math.floor(end.getTime() / 1000);
    const query = ` fields name, cover.url, first_release_date, platforms.name, genres.name, involved_companies.company.name, involved_companies.developer, involved_companies.publisher, total_rating, total_rating_count, game_type, version_parent, parent_game; where first_release_date >= ${startTimestamp} & first_release_date < ${endTimestamp} & cover != null & game_type = (0,8,9,10) & version_parent = null & parent_game = null; sort first_release_date asc; limit ${limit}; `;
    const response = await fetch(`${IGDB_API_URL}/games`, {
        method: "POST",
        headers: {
            "Client-ID": getClientId(),
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/plain",
        },
        body: query,
    });
    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Erro na IGDB:", {
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
            startDate,
            endDate,
        });
        throw new Error(
            `Erro ao buscar próximos lançamentos na IGDB: ${response.status} ${response.statusText}`
        );
    }
    const games = (await response.json()) as Array<{
        id: number;
        name?: string;
        cover?: { url?: string };
        first_release_date?: number;
        platforms?: { name?: string }[];
        genres?: { name?: string }[];
        involved_companies?: {
            developer?: boolean;
            publisher?: boolean;
            company?: { name?: string };
        }[];
        total_rating?: number;
        total_rating_count?: number;
        game_type?: number;
        version_parent?: number | null;
        parent_game?: number | null;
    }>;
    /** * Segurança adicional contra duplicações. * * A IGDB já está sendo filtrada por version_parent, * mas também removemos IDs repetidos caso apareçam * na resposta. */ const uniqueGames =
        Array.from(new Map(games.map((game) => [game.id, game])).values());
    return uniqueGames.map((game) => ({
        id: game.id,
        title: game.name ?? "Sem título",
        cover: withImageSize(game.cover?.url, "cover_big"),
        releaseDate: game.first_release_date
            ? new Date(game.first_release_date * 1000).toISOString()
            : "",
        platforms: game.platforms?.map((platform) => platform.name ?? "").filter(Boolean) ?? [],
        genres: game.genres?.map((genre) => genre.name ?? "").filter(Boolean) ?? [],
        developers:
            game.involved_companies
                ?.filter((company) => company.developer)
                .map((company) => company.company?.name ?? "")
                .filter(Boolean) ?? [],
        publishers:
            game.involved_companies
                ?.filter((company) => company.publisher)
                .map((company) => company.company?.name ?? "")
                .filter(Boolean) ?? [],
        rating: game.total_rating != null ? Math.round(game.total_rating * 10) / 10 : null,
        popularity: null,
        hypes: null,
    }));
}
