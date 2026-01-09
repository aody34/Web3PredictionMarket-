'use client';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animate?: boolean;
}

export function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animate = true,
}: SkeletonProps) {
    const baseStyles = 'bg-[var(--bg-elevated)] relative overflow-hidden';

    const variants = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const shimmer = animate
        ? `
      after:absolute after:inset-0
      after:bg-gradient-to-r after:from-transparent
      after:via-[rgba(255,255,255,0.05)] after:to-transparent
      after:animate-[shimmer_1.5s_infinite]
    `
        : '';

    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '1rem',
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${shimmer} ${className}`}
            style={style}
        />
    );
}

// Common skeleton patterns
export function SkeletonCard() {
    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 space-y-4">
            <Skeleton height={20} width="60%" />
            <Skeleton height={14} />
            <Skeleton height={14} width="80%" />
            <div className="flex gap-3 mt-4">
                <Skeleton height={40} variant="rectangular" className="flex-1" />
                <Skeleton height={40} variant="rectangular" className="flex-1" />
            </div>
        </div>
    );
}

export function SkeletonMarketCard() {
    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                    <Skeleton height={16} width="40%" />
                    <Skeleton height={12} width="20%" className="mt-2" />
                </div>
            </div>
            <Skeleton height={20} />
            <Skeleton height={16} width="80%" />
            <div className="space-y-2">
                <Skeleton height={36} />
                <Skeleton height={36} />
            </div>
            <div className="flex justify-between pt-3 border-t border-[var(--border-color)]">
                <Skeleton height={14} width="30%" />
                <Skeleton height={14} width="20%" />
            </div>
        </div>
    );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            <div className="flex gap-4 pb-3 border-b border-[var(--border-color)]">
                <Skeleton height={14} width="20%" />
                <Skeleton height={14} width="30%" />
                <Skeleton height={14} width="15%" />
                <Skeleton height={14} width="15%" />
                <Skeleton height={14} width="20%" />
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex gap-4 py-3">
                    <Skeleton height={14} width="20%" />
                    <Skeleton height={14} width="30%" />
                    <Skeleton height={14} width="15%" />
                    <Skeleton height={14} width="15%" />
                    <Skeleton height={14} width="20%" />
                </div>
            ))}
        </div>
    );
}
