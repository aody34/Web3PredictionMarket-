'use client';

import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface MarketCardProps {
    id: string;
    question: string;
    description?: string;
    outcomes: {
        name: string;
        probability: number;
    }[];
    endTime: Date;
    totalVolume: string;
    category?: string;
    resolved?: boolean;
    winningOutcome?: number;
}

export function MarketCard({
    id,
    question,
    description,
    outcomes,
    endTime,
    totalVolume,
    category,
    resolved = false,
    winningOutcome,
}: MarketCardProps) {
    const timeLeft = getTimeLeft(endTime);
    const isEnded = new Date() > endTime;

    return (
        <Link href={`/market/${id}`}>
            <Card variant="gradient" hover className="h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    {category && (
                        <span className="px-2.5 py-1 text-xs font-medium text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 rounded-full">
                            {category}
                        </span>
                    )}
                    {resolved ? (
                        <span className="px-2.5 py-1 text-xs font-medium text-[var(--color-success)] bg-[var(--color-success)]/10 rounded-full">
                            Resolved
                        </span>
                    ) : isEnded ? (
                        <span className="px-2.5 py-1 text-xs font-medium text-[var(--color-warning)] bg-[var(--color-warning)]/10 rounded-full">
                            Pending Resolution
                        </span>
                    ) : (
                        <span className="text-xs text-[var(--text-muted)]">{timeLeft}</span>
                    )}
                </div>

                {/* Question */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                    {question}
                </h3>

                {description && (
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                        {description}
                    </p>
                )}

                {/* Outcomes */}
                <div className="space-y-2 mb-4">
                    {outcomes.slice(0, 2).map((outcome, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-lg ${resolved && winningOutcome === index
                                    ? 'ring-2 ring-[var(--color-success)]'
                                    : ''
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent"
                                style={{ width: `${outcome.probability}%` }}
                            />
                            <div className="relative flex items-center justify-between px-3 py-2.5">
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {outcome.name}
                                </span>
                                <span className={`text-sm font-bold ${outcome.probability > 50
                                        ? 'text-[var(--color-success)]'
                                        : 'text-[var(--text-secondary)]'
                                    }`}>
                                    {outcome.probability.toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{totalVolume} ETH</span>
                    </div>
                    {!resolved && !isEnded && (
                        <Button size="sm" variant="ghost" className="text-[var(--color-primary)]">
                            Trade →
                        </Button>
                    )}
                </div>
            </Card>
        </Link>
    );
}

function getTimeLeft(endTime: Date): string {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
}
