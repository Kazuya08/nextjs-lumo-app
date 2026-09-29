import GameList from "@/components/games/game-list";

export default function GamesPage() {
    return (
        <div className="container mx-auto flex flex-col items-center space-y-8 p-8">
            <div className="space-y-1 text-center">
                <h1 className="text-3xl font-bold">Jogos</h1>
                <p className="text-sm text-muted-foreground">
                    Busque no catálogo da IGDB e veja os detalhes de cada jogo.
                </p>
            </div>
            <GameList />
        </div>
    );
}
