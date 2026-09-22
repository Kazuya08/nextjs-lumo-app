import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Bell, Search, User, X } from "lucide-react"

export function MainNav() {
    return (
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
            <Link 
                href="/" 
                className="px-3 py-1.5 rounded-md transition-all duration-200 text-muted-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/20"
            >
                Início
            </Link>
            <Link 
                href="/" 
                className="px-3 py-1.5 rounded-md transition-all duration-200 text-muted-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/20"
            >
                Comunidade
            </Link>
        </nav>
    )
}