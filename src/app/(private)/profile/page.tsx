import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { Card } from "@/components/ui/card";

export default function Profile() {
    return (
        <div className="container space-y-6 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>

            <Card className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:items-start">
                <ProfileAvatar />
            </Card>
        </div>
    );
}
