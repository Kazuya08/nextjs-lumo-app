"use client"

import type React from "react"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg"
    variant?: "default" | "primary" | "secondary"
}

export function Spinner({ size = "md", variant = "default", className, ...props }: SpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    }

    const variantClasses = {
        default: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
    }

    return (
        <div className={cn("flex items-center justify-center", className)} {...props}>
            <Loader2 className={cn("animate-spin", sizeClasses[size], variantClasses[variant])} />
        </div>
    )
}

