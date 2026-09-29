import { useQuery } from "@tanstack/react-query";
import type { CatalogGameDetails } from "@/modules/catalog/types";

export const catalogGameDetailsKey = (id: number) => ["catalog", "details", id] as const;

export function useCatalogGameDetails(id: number | null) {
    return useQuery({
        queryKey: catalogGameDetailsKey(id ?? 0),
        queryFn: async (): Promise<CatalogGameDetails> => {
            const res = await fetch(`/api/games/${id}`);

            if (!res.ok) {
                throw new Error("Erro ao buscar detalhes do jogo");
            }

            return res.json();
        },
        enabled: id != null,
        staleTime: 5 * 60_000,
    });
}
