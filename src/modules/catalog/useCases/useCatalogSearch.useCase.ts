import { useQuery } from '@tanstack/react-query';
import type { CatalogGame } from '@/modules/catalog/types';

export function useCatalogSearch(query: string) {
    return useQuery({
        queryKey: ['catalog', 'search', query],
        queryFn: async (): Promise<CatalogGame[]> => {
            const res = await fetch(`/api/games/search?q=${encodeURIComponent(query)}`);

            if (!res.ok) {
                throw new Error('Erro ao buscar jogos');
            }

            return res.json();
        },
        enabled: query.length > 0,
        staleTime: 60_000,
    });
}
