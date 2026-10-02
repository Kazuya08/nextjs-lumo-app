import { Gamepad2, Monitor } from "lucide-react";
import { FaPlaystation, FaXbox } from "react-icons/fa";

interface PlatformIconProps {
    platform: string;
    className?: string;
}

export function PlatformIcon({ platform, className = "h-3.5 w-3.5" }: PlatformIconProps) {
    const normalized = platform.toLowerCase();

    // PlayStation
    if (
        normalized.includes("playstation") ||
        normalized.includes("ps4") ||
        normalized.includes("ps5")
    ) {
        return <FaPlaystation className={className} aria-label="PlayStation" />;
    }

    // Xbox
    if (
        normalized.includes("xbox") ||
        normalized.includes("series x") ||
        normalized.includes("series s")
    ) {
        return <FaXbox className={className} aria-label="Xbox" />;
    }

    // Nintendo
    if (normalized.includes("nintendo") || normalized.includes("switch")) {
        return <Gamepad2 className={className} aria-label="Nintendo" />;
    }

    // PC
    if (
        normalized.includes("pc") ||
        normalized.includes("windows") ||
        normalized.includes("linux") ||
        normalized.includes("mac")
    ) {
        return <Monitor className={className} aria-label="PC" />;
    }

    // Fallback
    return <Gamepad2 className={className} aria-label={platform} />;
}
