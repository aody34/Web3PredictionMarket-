'use client';

import Link from 'next/link';
import { Card } from '../ui/Card';

interface Position {
    marketId: string;
    marketQuestion: string;
    outcome: string;
    shares: string;
    avgPrice: number;
    currentPrice: number;
    value: string;
    profitLoss: string;
    profitLossPercent: number;
}

const mockPositions: Position[] = [
    {
        marketId: '1',
        marketQuestion: 'Will Bitcoin reach $100,000 by end of 2025?',
        outcome: 'Yes',
        shares: '50.0',
        avgPrice: 0.65,
        currentPrice: 0.675,
        value: '33.75',
        profitLoss: '+1.25',
        profitLossPercent: 3.85,
    },
    {
        marketId: '2',
        marketQuestion: 'Will AI pass the Turing Test by 2026?',
        outcome: 'No',
        shares: '100.0',
        avgPrice: 0.52,
        currentPrice: 0.548,
        value: '54.80',
        profitLoss: '+2.80',
        profitLossPercent: 5.38,
    },
    {
        marketId: '4',
        marketQuestion: 'Will Ethereum 2.0 fully launch by Q2 2025?',
        outcome: 'Yes',
        shares: '30.0',
        avgPrice: 0.80,
        currentPrice: 0.783,
        value: '23.49',
        profitLoss: '-0.51',
        profitLossPercent: -2.13,
    },
];

interface PositionsListProps {
    positions?: Position[];
}

export function PositionsList({ positions = mockPositions }: PositionsListProps) {
    if (positions.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">No positions yet</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">Start trading to build your portfolio</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                >
                    Explore Markets
                </Link>
            </Card>
        );
    }

    return (
        <Card padding="none">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--border-color)]">
                            <th className="px-5 py-4 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Market
                            </th>
                            <th className="px-5 py-4 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Position
                            </th>
                            <th className="px-5 py-4 text-right text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Shares
                            </th>
                            <th className="px-5 py-4 text-right text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Avg. Price
                            </th>
                            <th className="px-5 py-4 text-right text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Current
                            </th>
                            <th className="px-5 py-4 text-right text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-5 py-4 text-right text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                                P&L
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.map((position, index) => {
                            const isProfit = position.profitLossPercent >= 0;
                            return (
                                <tr
                                    key={`${position.marketId}-${index}`}
                                    className="border-b border-[var(--border-color)] hover:bg-[var(--bg-elevated)]/50 transition-colors"
                                >
                                    <td className="px-5 py-4">
                                        <Link href={`/market/${position.marketId}`} className="hover:text-[var(--color-primary)]">
                                            <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1 max-w-xs">
                                                {position.marketQuestion}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="px-2.5 py-1 text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                                            {position.outcome}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right text-sm text-[var(--text-primary)]">
                                        {position.shares}
                                    </td>
                                    <td className="px-5 py-4 text-right text-sm text-[var(--text-secondary)]">
                                        ${position.avgPrice.toFixed(3)}
                                    </td>
                                    <td className="px-5 py-4 text-right text-sm text-[var(--text-primary)]">
                                        ${position.currentPrice.toFixed(3)}
                                    </td>
                                    <td className="px-5 py-4 text-right text-sm font-medium text-[var(--text-primary)]">
                                        {position.value} ETH
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className={`flex items-center justify-end gap-1 ${isProfit ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
                                            <span className="text-sm font-medium">{position.profitLoss}</span>
                                            <span className="text-xs">({isProfit ? '+' : ''}{position.profitLossPercent.toFixed(2)}%)</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
