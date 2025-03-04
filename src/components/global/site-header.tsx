import { MainNav } from "@/components/global/main-nav"
import { MobileNav } from "@/components/global/mobile-nav"
import { ThemeToggle } from "@/components/global/theme-toggle"

// Exemplo de itens de navegação
const navItems = [
    {
        title: "Início",
        href: "/",
    },
    {
        title: "Sobre",
        href: "/sobre",
    },
    {
        title: "Contato",
        href: "/contato",
    },
]

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 p-10">
                <MobileNav items={navItems} />
                <MainNav items={navItems} />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}

