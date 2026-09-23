import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { finishedGamesApi } from '@/modules/finishedGames/api';
import type { CreateFinishedGameInput } from '@/modules/finishedGames/types';

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

export interface UpdateFinishedGameInput {
    id: string;
    input: CreateFinishedGameInput;
}

export function useUpdateFinishedGame() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: UpdateFinishedGameInput) => finishedGamesApi.update(id, input),
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