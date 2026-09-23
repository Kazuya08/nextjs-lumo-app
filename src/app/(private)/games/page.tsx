import GameList from "@/components/profile/gamelist";

export default function GamesPage() {
    return (
        <div className="container mx-auto flex flex-col items-center space-y-8 p-8">
            <h1 className="text-3xl font-bold">Jogos</h1>
            <GameList />
        </div>
    );
}
