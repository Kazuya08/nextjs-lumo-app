import { FinishedGameForm } from '@/components/finishedGames/FinishedGameForm';
import { FinishedGameList } from '@/components/finishedGames/FinishedGameList';

export default function FinishedGamesPage() {
    return (

        <div className="container space-y-8 p-8">
            <h1 className="text-3xl font-bold">Jogos Zerados</h1>
            <FinishedGameForm />
            <FinishedGameList />
        </div>
    );
}
