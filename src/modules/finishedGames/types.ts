export interface FinishedGame {
    id: string;
    title: string;
    cover: string | null;
    platform: string;
    finishedDate: string;
    totalHours?: number;
    rating?: number;
    createdAt: string;
}

export interface CreateFinishedGameInput {
    title: string;
    cover: string | null;
    platform: string;
    finishedDate: string;
    totalHours?: number;
    rating?: number;
}
