"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
    items?: {
        title: string
        href: string
    }[]
}

export function MainNav({ items }: MainNavProps) {
    return (
        <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
                <span className="inline-block font-bold">LOGO</span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            ) : null}
        </div>
    )
}