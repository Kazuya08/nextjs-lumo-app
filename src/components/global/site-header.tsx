"use client"

import { MainNav } from "@/components/global/main-nav"
import { MobileNav } from "@/components/global/mobile-nav"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, Search, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mobileNavItems = [
    { title: "Início", href: "/" },
    { title: "Social", href: "/social" },
    { title: "Missões", href: "/rank/missoes" },
    { title: "Relatório de XP", href: "/rank/relatorio-xp" },
    { title: "Meu Perfil", href: "/profile" },
    { title: "Biblioteca", href: "/biblioteca" },
]

export function SiteHeader() {
    const [searchOpen, setSearchOpen] = useState(false)

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-white dark:bg-black text-slate-900 dark:text-foreground transition-colors duration-200">
            <div className="flex h-16 items-center justify-between px-6 max-w-[1200px] mx-auto relative">
                <div className="flex items-center gap-4">
                    <span>✨</span>
                    <div className="md:hidden">
                        <MobileNav items={mobileNavItems} />
                        
                    </div>
                    <MainNav />
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Barra de busca padrão em telas maiores */}
                    <div className="hidden lg:block w-56">
                        <Input placeholder="Pesquisar jogos..." className="h-9 text-xs" />
                    </div>

                    {/* Botão de Lupa para abrir/fechar a busca */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="Pesquisar jogos"
                    >
                        {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        <span className="sr-only">Pesquisar</span>
                    </Button>

                    {/* Botão de Notificações (Sino) */}
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                        <span className="sr-only">Notificações</span>
                    </Button>

                    {/* Dropdown de Perfil */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 h-9 px-3 border-border hover:text-primary transition-colors">
                                <User className="h-4 w-4 text-primary" />
                                <span className="hidden sm:inline text-xs font-medium">Conta</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-black border-border">
                            <DropdownMenuLabel className="text-xs text-muted-foreground">Meu Perfil</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="cursor-pointer text-xs">Perfil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/biblioteca" className="cursor-pointer text-xs">Biblioteca</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/lista-desejos" className="cursor-pointer text-xs">Lista de Desejos</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/colecoes" className="cursor-pointer text-xs">Coleções</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Barra de busca expansível */}
            {searchOpen && (
                <div className="w-full bg-white dark:bg-black border-b border-border px-6 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-w-[1200px] mx-auto flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Digite o nome do jogo que deseja buscar..." 
                            className="h-9 text-xs bg-background border-border flex-1"
                            autoFocus
                        />
                        <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)} className="text-xs">
                            Fechar
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}