"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface GameCardMenuProps {
    title: string;
    isDeleting: boolean;
    onEdit: () => void;
    onRemove: () => void;
}

export function GameCardMenu({ title, isDeleting, onEdit, onRemove }: GameCardMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-md bg-black/40 text-white backdrop-blur hover:bg-black/60 hover:text-white"
                    aria-label={`Opções do jogo ${title}`}
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={onEdit}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onRemove}
                    disabled={isDeleting}
                    className="text-destructive focus:text-destructive"
                >
                    {isDeleting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
