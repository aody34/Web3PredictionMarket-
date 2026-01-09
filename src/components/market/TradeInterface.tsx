'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TradeInterfaceProps {
    marketId: string;
    outcomes: {
        name: string;
        probability: number;
        price: number;
    }[];
    onTrade?: (outcome: number, amount: string, type: 'buy' | 'sell') => void;
    isLoading?: boolean;
    userShares?: bigint[];
}

export function TradeInterface({
    outcomes,
    onTrade,
    isLoading = false,
    userShares = [],
}: TradeInterfaceProps) {
    const [selectedOutcome, setSelectedOutcome] = useState<number>(0);
    const [amount, setAmount] = useState('');
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');

    const handleTrade = () => {
        if (onTrade && amount) {
            onTrade(selectedOutcome, amount, tradeType);
            setAmount('');
        }
    };

    const estimatedShares = amount
        ? (Number(amount) / outcomes[selectedOutcome]?.price || 0).toFixed(2)
        : '0';

    const potentialReturn = amount
        ? ((Number(amount) / outcomes[selectedOutcome]?.price || 0) * 1).toFixed(4)
        : '0';

    return (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5">
            {/* Trade Type Toggle */}
            <div className="flex gap-2 mb-5">
                <button
                    onClick={() => setTradeType('buy')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tradeType === 'buy'
                            ? 'bg-[var(--color-success)] text-white'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setTradeType('sell')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tradeType === 'sell'
                            ? 'bg-[var(--color-error)] text-white'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                >
                    Sell
                </button>
            </div>

            {/* Outcome Selection */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Select Outcome
                </label>
                <div className="space-y-2">
                    {outcomes.map((outcome, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOutcome(index)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${selectedOutcome === index
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--border-color-light)]'
                                }`}
                        >
                            <span className="font-medium text-[var(--text-primary)]">
                                {outcome.name}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[var(--text-muted)]">
                                    {outcome.probability.toFixed(1)}%
                                </span>
                                <span className="text-sm font-medium text-[var(--color-primary)]">
                                    ${outcome.price.toFixed(2)}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Amount Input */}
            <div className="mb-5">
                <Input
                    label={tradeType === 'buy' ? 'Amount (ETH)' : 'Shares to Sell'}
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    rightElement={
                        <span className="text-sm text-[var(--text-muted)]">
                            {tradeType === 'buy' ? 'ETH' : 'shares'}
                        </span>
                    }
                />
                {tradeType === 'sell' && userShares[selectedOutcome] && (
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                        Available: {userShares[selectedOutcome].toString()} shares
                    </p>
                )}
            </div>

            {/* Trade Summary */}
            <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-5 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Estimated Shares</span>
                    <span className="text-[var(--text-primary)] font-medium">{estimatedShares}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">Avg. Price</span>
                    <span className="text-[var(--text-primary)] font-medium">
                        ${outcomes[selectedOutcome]?.price.toFixed(2) || '0.00'}
                    </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[var(--text-muted)]">Potential Return</span>
                    <span className="text-[var(--color-success)] font-medium">{potentialReturn} ETH</span>
                </div>
            </div>

            {/* Trade Button */}
            <Button
                className="w-full"
                variant={tradeType === 'buy' ? 'primary' : 'danger'}
                isLoading={isLoading}
                disabled={!amount || Number(amount) <= 0}
                onClick={handleTrade}
            >
                {tradeType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
            </Button>

            {/* Disclaimer */}
            <p className="mt-3 text-xs text-[var(--text-muted)] text-center">
                Trade at your own risk. All sales are final.
            </p>
        </div>
    );
}
