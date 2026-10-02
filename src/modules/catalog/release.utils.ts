import { UpcomingRelease } from "./types";

export function getReleasesByPlatform(
    games: UpcomingRelease[],
    platform: string
): UpcomingRelease[] {
    return games.filter((game) =>
        game.platforms?.some((item) => item.toLowerCase().includes(platform.toLowerCase()))
    );
}

export function getReleasesByGenre(games: UpcomingRelease[], genre: string): UpcomingRelease[] {
    return games.filter((game) =>
        game.genres.some((item) => item.toLowerCase().includes(genre.toLowerCase()))
    );
}
