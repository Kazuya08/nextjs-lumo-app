"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDeleteButtonProps {
    isDeleting: boolean;
    onConfirm: () => void;
    className?: string;
}

export function ConfirmDeleteButton({
    isDeleting,
    onConfirm,
    className,
}: ConfirmDeleteButtonProps) {
    const [confirming, setConfirming] = useState(false);

    if (!confirming) {
        return (
            <Button
                variant="ghost"
                size="icon"
                aria-label="Remover jogo"
                className={cn(
                    "h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive",
                    className
                )}
                disabled={isDeleting}
                onClick={() => setConfirming(true)}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                aria-label="Confirmar exclusão"
                disabled={isDeleting}
                onClick={onConfirm}
            >
                {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Check className="h-4 w-4" />
                )}
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", className)}
                aria-label="Cancelar exclusão"
                disabled={isDeleting}
                onClick={() => setConfirming(false)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}
