export interface CatalogGame {
    id: number;
    title: string;
    cover: string | null;
    platforms: string[];
    summary?: string;
    genres?: string[];
    gameModes?: string[];
    playerPerspectives?: string[];
    companies?: string[];
    releaseYear?: number;
    releaseDate?: string;
    rating?: number;
    ratingCount?: number;
    suggestedHours?: number;
    suggestedHoursHastily?: number;
    suggestedHoursCompletely?: number;
}

export interface CatalogGameDetails extends CatalogGame {
    artwork: string | null;
    screenshots: string[];
    trailerId: string | null;
    franchise?: string;
}

export interface UpcomingRelease {
    id: number;
    title: string;
    cover: string | null;
    releaseDate: string;
    platforms: string[];
    genres: string[];
    developers: string[];
    publishers: string[];
    rating: number | null;
    popularity: number | null;
    hypes: number | null;
}
