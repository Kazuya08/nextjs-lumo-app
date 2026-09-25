import Link from "next/link";
import {
    Database,
    FileText,
    History,
    Info,
    Mail,
    Map,
    Shield,
    Users,
    Sparkles,
} from "lucide-react";

type ChangeType = "NOVO" | "MELHORIA" | "CORREÇÃO" | "DESIGN";

// Estrutura de dados organizada para facilitar futuras adições de atualizações
const updates = [
    // {
    //     version: "v0.1.0",
    //     date: "24 de setembro de 2026",
    //     title: "Exemplo",
    //     description: "Exemplo",
    //     isLatest: true,
    //     changes: [
    //         { type: "NOVO", text: "Exemplo" },
    //         { type: "NOVO", text: "Exemplo." },
    //         { type: "NOVO", text: "Exemplo" },
    //         { type: "NOVO", text: "Exemplo" },
    //         { type: "MELHORIA", text: "Exemplo" },
    //         { type: "DESIGN", text: "Exemplo" },
    //     ],
    // },

    {
        version: "v0.1.0",
        date: "24 de setembro de 2026",
        title: "Identidade e Evolução do Perfil",
        description: "Aprimoramento do design system e atualização de dependências críticas.",
        isLatest: false,
        changes: [
            {
                type: "NOVO",
                text: "Apresentação oficial do sistema de level e progressão.",
            },
            {
                type: "MELHORIA",
                text: "Aprimoramento na interface de gerenciamento de jogos zerados.",
            },
            {
                type: "DESIGN",
                text: "Criação e estruturação do menu superior e do rodapé global.",
            },
            {
                type: "DESIGN",
                text: "Implementação do design oficial do footer global.",
            },
            {
                type: "CORREÇÃO",
                text: "Atualizações de dependências e correções de segurança.",
            },
        ],
    },
    {
        version: "v0.1.0",
        date: "20 de setembro de 2026",
        title: "A Base do Lumo",
        description: "Primeiros passos da plataforma com recursos de descoberta de mídia.",
        isLatest: false,
        changes: [
            {
                type: "NOVO",
                text: "Integração com a IGDB para busca de jogos, com suporte aos idiomas português e inglês.",
            },
            {
                type: "NOVO",
                text: "Implementação da autenticação com JWT, incluindo registro, login, logout e proteção das rotas.",
            },
            {
                type: "MELHORIA",
                text: "Ajustes nos componentes shadcn/ui para estabelecer uma base visual consistente para o Lumo.",
            },
        ],
    },
];

const getBadgeStyle = (type: ChangeType) => {
    switch (type) {
        case "NOVO":
            return "bg-primary text-primary-foreground border-primary/20";
        case "MELHORIA":
            return "bg-accent text-accent-foreground border-border";
        case "CORREÇÃO":
            return "bg-muted text-muted-foreground border-border";
        case "DESIGN":
            return "bg-secondary text-secondary-foreground border-border";
        default:
            return "bg-secondary text-secondary-foreground border-border";
    }
};

const navigationGroups = [
    {
        title: "COMUNIDADE",
        items: [
            { label: "Sobre o Lumo", href: "/sobre", icon: Info },
            { label: "A Equipe", href: "/equipe", icon: Users },
            { label: "Contato", href: "/contato", icon: Mail },
        ],
    },
    {
        title: "DESENVOLVIMENTO",
        items: [
            { label: "Roadmap", href: "/roadmap", icon: Map },
            { label: "Changelog", href: "/changelog", icon: History, active: true },
        ],
    },
    {
        title: "DADOS",
        items: [{ label: "Dados dos Jogos", href: "/dados-dos-jogos", icon: Database }],
    },
    {
        title: "LEGAL",
        items: [
            { label: "Termos de Serviço", href: "/termos", icon: FileText },
            { label: "Política de Privacidade", href: "/privacidade", icon: Shield },
        ],
    },
];

export default function Changelog() {
    return (
        <div className="min-h-[100dvh] bg-background text-foreground font-sans">
            <div className="flex min-h-[100dvh]">
                {/* MENU LATERAL */}
                <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-background">
                    <div className="sticky top-0 flex h-[100dvh] flex-col px-4 py-8">
                        <Link
                            href="/"
                            className="mb-10 px-3 text-xl font-bold tracking-tight text-foreground"
                        >
                            Lumo<span className="text-primary">.</span>
                        </Link>

                        <nav className="space-y-8" aria-label="Navegação institucional">
                            {navigationGroups.map((group) => (
                                <div key={group.title}>
                                    <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
                                        {group.title}
                                    </p>

                                    <div className="space-y-1">
                                        {group.items.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                                        item.active
                                                            ? "bg-accent text-primary"
                                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                    }`}
                                                >
                                                    {item.active && (
                                                        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                                                    )}

                                                    <Icon
                                                        className={`h-4 w-4 shrink-0 transition-colors ${
                                                            item.active
                                                                ? "text-primary"
                                                                : "text-muted-foreground group-hover:text-foreground"
                                                        }`}
                                                    />

                                                    <span>{item.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* CONTEÚDO */}
                <main className="min-w-0 flex-1">
                    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
                        <header className="mb-12 space-y-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                                Atualizações
                            </span>

                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                O Lumo está sempre evoluindo.
                            </h1>

                            <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                                Acompanhe novos recursos, melhorias e mudanças que fazem parte da
                                nossa jornada.
                            </p>
                        </header>

                        <div className="relative border-l border-border pl-6 sm:pl-8">
                            <div className="space-y-12">
                                {updates.map((item, index) => (
                                    <div
                                        key={`${item.version}-${item.date}-${index}`}
                                        className="relative"
                                    >
                                        <div
                                            className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-background sm:-left-[39px] ${
                                                item.isLatest
                                                    ? "bg-primary ring-4 ring-primary/20"
                                                    : "bg-muted border-border"
                                            }`}
                                        />

                                        <article
                                            className={`rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                                                item.isLatest
                                                    ? "bg-card border-primary/40 shadow-lg shadow-primary/5"
                                                    : "bg-card/60 border-border hover:border-border/80"
                                            }`}
                                        >
                                            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-bold tracking-wide text-primary">
                                                        {item.version}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.date}
                                                    </span>
                                                </div>

                                                {item.isLatest && (
                                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                                                        <Sparkles className="h-3 w-3" />
                                                        Mais recente
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-6 space-y-1.5">
                                                <h2 className="text-xl font-bold text-card-foreground">
                                                    {item.title}
                                                </h2>

                                                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div className="space-y-2.5 border-t border-border/60 pt-4">
                                                {item.changes.map((change, changeIndex) => (
                                                    <div
                                                        key={`${change.type}-${changeIndex}`}
                                                        className="flex items-start gap-3 text-sm"
                                                    >
                                                        <span
                                                            className={`mt-0.5 shrink-0 rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(
                                                                change.type as ChangeType
                                                            )}`}
                                                        >
                                                            {change.type}
                                                        </span>

                                                        <span className="font-light leading-relaxed text-foreground/90">
                                                            {change.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
