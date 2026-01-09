'use client';

import { Card } from '../ui/Card';

interface PortfolioOverviewProps {
    totalValue: string;
    totalProfit: string;
    profitPercent: number;
    activePositions: number;
    pendingRewards: string;
}

export function PortfolioOverview({
    totalValue = '0.00',
    totalProfit = '0.00',
    profitPercent = 0,
    activePositions = 0,
    pendingRewards = '0.00',
}: Partial<PortfolioOverviewProps>) {
    const isProfit = profitPercent >= 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Portfolio Value */}
            <Card variant="gradient" className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                    <p className="text-sm text-[var(--text-muted)] mb-1">Total Portfolio Value</p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">{totalValue} ETH</p>
                    <div className={`flex items-center gap-1 mt-2 ${isProfit ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                        <svg className={`w-4 h-4 ${isProfit ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span className="text-sm font-medium">{isProfit ? '+' : ''}{profitPercent.toFixed(2)}%</span>
                    </div>
                </div>
            </Card>

            {/* Total Profit/Loss */}
            <Card>
                <p className="text-sm text-[var(--text-muted)] mb-1">Total Profit/Loss</p>
                <p className={`text-2xl font-bold ${isProfit ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                    {isProfit ? '+' : ''}{totalProfit} ETH
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">All time</p>
            </Card>

            {/* Active Positions */}
            <Card>
                <p className="text-sm text-[var(--text-muted)] mb-1">Active Positions</p>
                <p className="text-2xl font-bold text-[var(--text-primary)]">{activePositions}</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Across all markets</p>
            </Card>

            {/* Pending Rewards */}
            <Card>
                <p className="text-sm text-[var(--text-muted)] mb-1">Pending Rewards</p>
                <p className="text-2xl font-bold text-[var(--color-warning)]">{pendingRewards} ETH</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Ready to claim</p>
            </Card>
        </div>
    );
}
