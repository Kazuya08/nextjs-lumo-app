"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
    items?: {
        title: string
        href: string
    }[]
}

export function MobileNav({ items }: MobileNavProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <div className="flex flex-col gap-4 px-4 py-4">
                    {items?.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            onClick={() => setOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

