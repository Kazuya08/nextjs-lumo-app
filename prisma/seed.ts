import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { readFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

interface LegacyFinishedGame {
    title: string;
    cover: string | null;
    platform: string;
    finishedDate: string;
    totalHours?: number;
}

async function readLegacyFinishedGames(): Promise<LegacyFinishedGame[]> {
    try {
        const raw = await readFile(
            path.join(process.cwd(), 'data', 'finished-games.json'),
            'utf-8'
        );
        return JSON.parse(raw) as LegacyFinishedGame[];
    } catch {
        return [];
    }
}

async function main() {
    const passwordHash = await hash('123456', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@lumo.com' },
        update: {},
        create: {
            email: 'admin@lumo.com',
            name: 'Admin Lumo',
            passwordHash,
        },
    });

    await prisma.user.upsert({
        where: { email: 'user@lumo.com' },
        update: {},
        create: {
            email: 'user@lumo.com',
            name: 'Usuário Teste',
            passwordHash,
        },
    });

    const legacyGames = await readLegacyFinishedGames();

    for (const game of legacyGames) {
        const existing = await prisma.finishedGame.findFirst({
            where: { userId: admin.id, title: game.title },
        });

        if (!existing) {
            await prisma.finishedGame.create({
                data: {
                    userId: admin.id,
                    title: game.title,
                    coverUrl: game.cover,
                    platform: game.platform,
                    finishedDate: new Date(game.finishedDate),
                    totalHours: game.totalHours ?? null,
                },
            });
        }
    }

    console.log(`Seed concluído: usuários criados e ${legacyGames.length} jogo(s) importado(s).`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });