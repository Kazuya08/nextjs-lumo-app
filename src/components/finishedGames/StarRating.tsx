import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    value: number;
    showValue?: boolean;
    className?: string;
}

export function StarRating({
    value,
    showValue = true,
    className,
}: StarRatingProps) {
    const stars = Math.round(value / 2);
    const color =
        value >= 8 ? 'text-green-500' : value >= 5 ? 'text-amber-500' : 'text-red-500';

    return (
        <span
            className={cn('inline-flex items-center gap-0.5', color, className)}
            title={`Nota: ${value}/10`}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={cn('h-4 w-4', index < stars ? 'fill-current' : 'opacity-25')}
                />
            ))}
            {showValue && (
                <span className="ml-1 text-sm font-medium tabular-nums">{value}/10</span>
            )}
        </span>
    );
}