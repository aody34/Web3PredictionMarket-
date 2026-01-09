// Market Types
export interface Market {
    id: bigint;
    creator: `0x${string}`;
    question: string;
    description: string;
    outcomes: string[];
    endTime: bigint;
    resolved: boolean;
    winningOutcome: number;
    totalPool: bigint;
    outcomePools: bigint[];
}

export interface MarketCardData {
    id: string;
    question: string;
    description: string;
    outcomes: OutcomeData[];
    endTime: Date;
    totalVolume: string;
    resolved: boolean;
    winningOutcome?: number;
    category?: string;
    imageUrl?: string;
}

export interface OutcomeData {
    name: string;
    probability: number;
    pool: string;
}

export interface UserPosition {
    marketId: string;
    outcome: number;
    outcomeName: string;
    shares: bigint;
    avgPrice: number;
    currentPrice: number;
    value: string;
    profitLoss: string;
    profitLossPercent: number;
}

export interface Transaction {
    id: string;
    type: 'buy' | 'sell' | 'claim' | 'create';
    marketId: string;
    marketQuestion: string;
    outcome?: string;
    amount: string;
    shares?: string;
    timestamp: Date;
    txHash: string;
    status: 'pending' | 'confirmed' | 'failed';
}

// Form Types
export interface CreateMarketForm {
    question: string;
    description: string;
    outcomes: string[];
    endDate: string;
    endTime: string;
    initialLiquidity: string;
    category: string;
}

export interface TradeForm {
    marketId: string;
    outcome: number;
    amount: string;
    type: 'buy' | 'sell';
}

// UI Types
export type MarketFilter = 'all' | 'active' | 'resolved' | 'my-markets';
export type MarketSort = 'newest' | 'ending-soon' | 'most-volume' | 'trending';

export interface PaginationParams {
    page: number;
    limit: number;
}

// Wallet Types
export interface WalletState {
    isConnected: boolean;
    address?: `0x${string}`;
    balance?: string;
    chainId?: number;
}
