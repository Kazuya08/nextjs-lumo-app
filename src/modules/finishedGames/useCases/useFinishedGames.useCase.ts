import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { finishedGamesApi } from '@/modules/finishedGames/api';

export const finishedGamesQueryKey = ['finished-games'];

export function useFinishedGames() {
    return useQuery({
        queryKey: finishedGamesQueryKey,
        queryFn: finishedGamesApi.list,
    });
}

export function useCreateFinishedGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: finishedGamesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: finishedGamesQueryKey });
        },
    });
}

export function useRemoveFinishedGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: finishedGamesApi.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: finishedGamesQueryKey });
        },
    });
}