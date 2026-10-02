import { getUpcomingReleases } from "@/modules/catalog/igdb.service";
import { ReleasesPage } from "@/components/releases/releases-page";
function formatDateForApi(date: Date) {
    return date.toISOString().slice(0, 10);
}
function getInitialReleaseWindow() {
    const now = new Date();
    const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    return { start: formatDateForApi(start), end: formatDateForApi(end) };
}
export default async function Page() {
    const { start, end } = getInitialReleaseWindow();
    const games = await getUpcomingReleases(start, end, 50);
    return <ReleasesPage initialGames={games} initialEndDate={end} />;
}
