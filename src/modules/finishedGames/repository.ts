import { prisma } from '@/shared/prisma';
import type { CreateFinishedGameInput, FinishedGame } from './types';

interface FinishedGameRecord {
    id: string;
    title: string;
    coverUrl: string | null;
    platform: string;
    finishedDate: Date;
    totalHours: number | null;
    rating: number | null;
    createdAt: Date;
}

function toFinishedGame(record: FinishedGameRecord): FinishedGame {
    return {
        id: record.id,
        title: record.title,
        cover: record.coverUrl,
        platform: record.platform,
        finishedDate: record.finishedDate.toISOString().slice(0, 10),
        totalHours: record.totalHours ?? undefined,
        rating: record.rating ?? undefined,
        createdAt: record.createdAt.toISOString(),
    };
}

export async function listFinishedGamesByUser(userId: string): Promise<FinishedGame[]> {
    const games = await prisma.finishedGame.findMany({
        where: { userId },
        orderBy: { finishedDate: 'desc' },
    });

    return games.map(toFinishedGame);
}

export async function createFinishedGame(
    userId: string,
    input: CreateFinishedGameInput
): Promise<FinishedGame> {
    const game = await prisma.finishedGame.create({
        data: {
            userId,
            title: input.title,
            coverUrl: input.cover ?? null,
            platform: input.platform,
            finishedDate: new Date(input.finishedDate),
            totalHours: input.totalHours ?? null,
            rating: input.rating ?? null,
        },
    });

    return toFinishedGame(game);
}

export async function removeFinishedGame(userId: string, id: string): Promise<boolean> {
    const result = await prisma.finishedGame.deleteMany({
        where: { id, userId },
    });

    return result.count > 0;
}