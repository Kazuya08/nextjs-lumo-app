import Link from "next/link";

interface NavItem {
    title: string;
    href: string;
}

interface MainNavProps {
    items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
    if (!items?.length) {
        return null;
    }

    return (
        <nav className="hidden md:flex items-center gap-1 sm:gap-6 text-sm font-medium">
            {items.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="px-3 py-1.5 rounded-md transition-all duration-200 text-muted-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/20"
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
