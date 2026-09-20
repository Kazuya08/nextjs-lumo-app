import type { CreateFinishedGameInput, FinishedGame } from './types';

const ENDPOINT = '/api/finished-games';

export const finishedGamesApi = {
    async list(): Promise<FinishedGame[]> {
        const res = await fetch(ENDPOINT, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Erro ao carregar jogos');
        }

        return res.json();
    },

    async create(input: CreateFinishedGameInput): Promise<FinishedGame> {
        const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });

        if (!res.ok) {
            throw new Error('Erro ao salvar jogo');
        }

        return res.json();
    },

    async remove(id: string): Promise<void> {
        const res = await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });

        if (!res.ok) {
            throw new Error('Erro ao remover jogo');
        }
    },
};