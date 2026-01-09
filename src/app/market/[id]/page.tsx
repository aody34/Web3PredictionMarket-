'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TradeInterface } from '@/components/market/TradeInterface';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useAccount } from 'wagmi';

// Mock market data
const mockMarket = {
    id: '1',
    question: 'Will Bitcoin reach $100,000 by end of 2025?',
    description: 'This market resolves to YES if the price of Bitcoin (BTC) reaches or exceeds $100,000 USD on any major cryptocurrency exchange (Coinbase, Binance, Kraken) before December 31, 2025, 11:59 PM UTC. The market will resolve to NO if the price never reaches this threshold during the specified period.',
    outcomes: [
        { name: 'Yes', probability: 67.5, price: 0.675 },
        { name: 'No', probability: 32.5, price: 0.325 },
    ],
    endTime: new Date('2025-12-31'),
    totalVolume: '245.5',
    totalPool: '89.4',
    category: 'Crypto',
    creator: '0x1234...5678',
    createdAt: new Date('2024-01-15'),
    resolved: false,
};

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function MarketPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { isConnected } = useAccount();
    const [activeTab, setActiveTab] = useState<'trade' | 'info' | 'activity'>('trade');

    const market = mockMarket; // In production, fetch based on id

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
                    <Link href="/" className="hover:text-[var(--text-primary)]">Markets</Link>
                    <span>/</span>
                    <span className="text-[var(--text-secondary)]">{market.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Market Header Card */}
                        <Card>
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <span className="px-3 py-1 text-xs font-medium text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 rounded-full">
                                    {market.category}
                                </span>
                                {market.resolved ? (
                                    <span className="px-3 py-1 text-xs font-medium text-[var(--color-success)] bg-[var(--color-success)]/10 rounded-full">
                                        Resolved
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 text-xs font-medium text-[var(--color-warning)] bg-[var(--color-warning)]/10 rounded-full">
                                        Active
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                                {market.question}
                            </h1>

                            <p className="text-[var(--text-secondary)] mb-6">
                                {market.description}
                            </p>

                            {/* Outcome Bars */}
                            <div className="space-y-3">
                                {market.outcomes.map((outcome, index) => (
                                    <div key={index} className="relative">
                                        <div
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[var(--color-primary)]/20 to-transparent"
                                            style={{ width: `${outcome.probability}%` }}
                                        />
                                        <div className="relative flex items-center justify-between p-4 bg-[var(--bg-secondary)]/50 rounded-lg border border-[var(--border-color)]">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-[var(--color-success)]' : 'bg-[var(--color-error)]'}`} />
                                                <span className="font-medium text-[var(--text-primary)]">{outcome.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-bold text-[var(--text-primary)]">
                                                    {outcome.probability.toFixed(1)}%
                                                </span>
                                                <p className="text-xs text-[var(--text-muted)]">
                                                    ${outcome.price.toFixed(2)} per share
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Tabs */}
                        <div className="flex gap-2 border-b border-[var(--border-color)]">
                            {(['trade', 'info', 'activity'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab
                                            ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                                            : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'info' && (
                            <Card>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                    Resolution Criteria
                                </h3>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    {market.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                                        <p className="text-sm text-[var(--text-muted)] mb-1">End Date</p>
                                        <p className="font-medium text-[var(--text-primary)]">
                                            {formatDate(market.endTime)}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                                        <p className="text-sm text-[var(--text-muted)] mb-1">Created</p>
                                        <p className="font-medium text-[var(--text-primary)]">
                                            {formatDate(market.createdAt)}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                                        <p className="text-sm text-[var(--text-muted)] mb-1">Creator</p>
                                        <p className="font-mono text-sm text-[var(--text-primary)]">
                                            {market.creator}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                                        <p className="text-sm text-[var(--text-muted)] mb-1">Market ID</p>
                                        <p className="font-mono text-sm text-[var(--text-primary)]">
                                            #{id}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        )}

                        {activeTab === 'activity' && (
                            <Card>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                    Recent Activity
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { user: '0xabc...def', action: 'bought', outcome: 'Yes', amount: '0.5 ETH', time: '2 mins ago' },
                                        { user: '0x123...456', action: 'sold', outcome: 'No', amount: '0.3 ETH', time: '15 mins ago' },
                                        { user: '0x789...abc', action: 'bought', outcome: 'Yes', amount: '1.2 ETH', time: '1 hour ago' },
                                        { user: '0xdef...123', action: 'bought', outcome: 'No', amount: '0.8 ETH', time: '3 hours ago' },
                                    ].map((activity, i) => (
                                        <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border-color)] last:border-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
                                                <div>
                                                    <p className="text-sm text-[var(--text-primary)]">
                                                        <span className="font-mono">{activity.user}</span>{' '}
                                                        <span className={activity.action === 'bought' ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                                                            {activity.action}
                                                        </span>{' '}
                                                        <span className="font-medium">{activity.outcome}</span>
                                                    </p>
                                                    <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-[var(--text-primary)]">
                                                {activity.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Market Stats */}
                        <Card>
                            <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                                Market Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Total Volume</span>
                                    <span className="font-medium text-[var(--text-primary)]">{market.totalVolume} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Liquidity Pool</span>
                                    <span className="font-medium text-[var(--text-primary)]">{market.totalPool} ETH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--text-muted)]">Market Ends</span>
                                    <span className="font-medium text-[var(--text-primary)]">
                                        {market.endTime.toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Trade Interface or Connect Wallet */}
                        {isConnected ? (
                            <TradeInterface
                                marketId={id}
                                outcomes={market.outcomes}
                                onTrade={(outcome, amount, type) => {
                                    console.log('Trade:', { outcome, amount, type });
                                }}
                            />
                        ) : (
                            <ConnectWallet variant="full" />
                        )}

                        {/* Share */}
                        <Card>
                            <h3 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                                Share Market
                            </h3>
                            <div className="flex gap-2">
                                <Button variant="secondary" size="sm" className="flex-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </Button>
                                <Button variant="secondary" size="sm" className="flex-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </Button>
                                <Button variant="secondary" size="sm" className="flex-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
