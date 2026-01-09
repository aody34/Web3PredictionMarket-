'use client';

import { PortfolioOverview } from '@/components/portfolio/PortfolioOverview';
import { PositionsList } from '@/components/portfolio/PositionsList';
import { TransactionHistory } from '@/components/portfolio/TransactionHistory';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useAccount } from 'wagmi';

export default function PortfolioPage() {
    const { isConnected } = useAccount();

    if (!isConnected) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="max-w-md mx-auto px-4">
                    <ConnectWallet variant="full" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Portfolio</h1>
                    <p className="text-[var(--text-muted)] mt-1">
                        Track your positions, earnings, and trading history
                    </p>
                </div>

                {/* Portfolio Overview */}
                <div className="mb-10">
                    <PortfolioOverview
                        totalValue="112.04"
                        totalProfit="+12.54"
                        profitPercent={12.6}
                        activePositions={3}
                        pendingRewards="1.25"
                    />
                </div>

                {/* Positions Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Active Positions
                        </h2>
                    </div>
                    <PositionsList />
                </div>

                {/* Transaction History */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Recent Transactions
                        </h2>
                        <button className="text-sm text-[var(--color-primary)] hover:underline">
                            View All
                        </button>
                    </div>
                    <TransactionHistory limit={5} />
                </div>
            </div>
        </div>
    );
}
