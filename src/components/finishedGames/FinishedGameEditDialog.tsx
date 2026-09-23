"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FinishedGameForm } from "@/components/finishedGames/FinishedGameForm";
import type { FinishedGame } from "@/modules/finishedGames/types";

interface FinishedGameEditDialogProps {
    game: FinishedGame | null;
    onClose: () => void;
}

export function FinishedGameEditDialog({ game, onClose }: FinishedGameEditDialogProps) {
    return (
        <Dialog
            open={Boolean(game)}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Editar jogo zerado</DialogTitle>
                    <DialogDescription>Atualize as informações do jogo.</DialogDescription>
                </DialogHeader>
                {game && (
                    <FinishedGameForm
                        key={game.id}
                        variant="sheet"
                        game={game}
                        onSuccess={onClose}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
