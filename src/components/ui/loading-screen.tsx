"use client";

import { Spinner } from "@/components/ui/spinner";

interface LoadingScreenProps {
    message?: string;
}

export function LoadingScreen({ message = "Carregando..." }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <Spinner size="lg" variant="primary" className="mb-4" />
            <p className="text-lg font-medium text-muted-foreground">{message}</p>
        </div>
    );
}
