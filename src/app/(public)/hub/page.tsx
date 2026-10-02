import { getUpcomingReleases } from "@/modules/catalog/igdb.service";

import { HomePage } from "@/components/hub/home-page";

function formatDateForApi(date: Date) {
    return date.toISOString().slice(0, 10);
}

function getHubReleaseWindow() {
    const now = new Date();

    const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

    const end = new Date(start);

    end.setUTCDate(end.getUTCDate() + 30);

    return {
        start: formatDateForApi(start),
        end: formatDateForApi(end),
    };
}

export default async function Page() {
    const { start, end } = getHubReleaseWindow();

    const upcomingGames = await getUpcomingReleases(start, end, 50);

    return <HomePage upcomingGames={upcomingGames} />;
}
