'use client';

import { Card } from '../ui/Card';

interface Transaction {
    id: string;
    type: 'buy' | 'sell' | 'claim' | 'create';
    marketQuestion: string;
    outcome?: string;
    amount: string;
    shares?: string;
    timestamp: Date;
    txHash: string;
    status: 'pending' | 'confirmed' | 'failed';
}

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'buy',
        marketQuestion: 'Will Bitcoin reach $100,000 by end of 2025?',
        outcome: 'Yes',
        amount: '0.5',
        shares: '50.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        txHash: '0x1234...5678',
        status: 'confirmed',
    },
    {
        id: '2',
        type: 'sell',
        marketQuestion: 'Will AI pass the Turing Test by 2026?',
        outcome: 'No',
        amount: '0.25',
        shares: '25.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        txHash: '0xabcd...efgh',
        status: 'confirmed',
    },
    {
        id: '3',
        type: 'claim',
        marketQuestion: 'Who will win the 2024 US Presidential Election?',
        amount: '1.25',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        txHash: '0x9876...5432',
        status: 'confirmed',
    },
    {
        id: '4',
        type: 'buy',
        marketQuestion: 'Will Ethereum 2.0 fully launch by Q2 2025?',
        outcome: 'Yes',
        amount: '0.3',
        shares: '30.0',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        txHash: '0xijkl...mnop',
        status: 'pending',
    },
];

interface TransactionHistoryProps {
    transactions?: Transaction[];
    limit?: number;
}

export function TransactionHistory({ transactions = mockTransactions, limit }: TransactionHistoryProps) {
    const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

    const getTypeIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'buy':
                return (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                );
            case 'sell':
                return (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--color-error)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </div>
                );
            case 'claim':
                return (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-warning)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--color-warning)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case 'create':
                return (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                );
        }
    };

    const getTypeLabel = (type: Transaction['type']) => {
        switch (type) {
            case 'buy': return 'Bought';
            case 'sell': return 'Sold';
            case 'claim': return 'Claimed';
            case 'create': return 'Created';
        }
    };

    const getStatusBadge = (status: Transaction['status']) => {
        switch (status) {
            case 'confirmed':
                return <span className="px-2 py-0.5 text-xs bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full">Confirmed</span>;
            case 'pending':
                return <span className="px-2 py-0.5 text-xs bg-[var(--color-warning)]/10 text-[var(--color-warning)] rounded-full animate-pulse">Pending</span>;
            case 'failed':
                return <span className="px-2 py-0.5 text-xs bg-[var(--color-error)]/10 text-[var(--color-error)] rounded-full">Failed</span>;
        }
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (displayedTransactions.length === 0) {
        return (
            <Card className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">No transactions yet</h3>
                <p className="text-sm text-[var(--text-muted)]">Your trading history will appear here</p>
            </Card>
        );
    }

    return (
        <Card padding="none">
            <div className="divide-y divide-[var(--border-color)]">
                {displayedTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-[var(--bg-elevated)]/50 transition-colors">
                        {getTypeIcon(tx.type)}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                    {getTypeLabel(tx.type)}
                                </span>
                                {tx.outcome && (
                                    <span className="px-2 py-0.5 text-xs bg-[var(--bg-elevated)] text-[var(--text-secondary)] rounded">
                                        {tx.outcome}
                                    </span>
                                )}
                                {getStatusBadge(tx.status)}
                            </div>
                            <p className="text-sm text-[var(--text-muted)] truncate">
                                {tx.marketQuestion}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-medium ${tx.type === 'sell' || tx.type === 'claim' ? 'text-[var(--color-success)]' : 'text-[var(--text-primary)]'}`}>
                                {tx.type === 'sell' || tx.type === 'claim' ? '+' : '-'}{tx.amount} ETH
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">{formatTime(tx.timestamp)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
