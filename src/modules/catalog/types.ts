export interface CatalogGame {
    id: number;
    title: string;
    cover: string | null;
    platforms: string[];
    suggestedHours?: number;
    suggestedHoursHastily?: number;
    suggestedHoursCompletely?: number;
}