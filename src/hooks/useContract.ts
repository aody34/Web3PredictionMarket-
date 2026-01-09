'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { PredictionMarketABI } from '../contracts/abi';
import { config } from '../config';
import type { Market } from '../types';

const contractAddress = config.contracts.predictionMarket as `0x${string}`;

// Read Hooks
export function useMarketCount() {
    return useReadContract({
        address: contractAddress,
        abi: PredictionMarketABI,
        functionName: 'marketCount',
    });
}

export function useMarket(marketId: bigint) {
    return useReadContract({
        address: contractAddress,
        abi: PredictionMarketABI,
        functionName: 'getMarket',
        args: [marketId],
    });
}

export function useUserShares(marketId: bigint, userAddress: `0x${string}` | undefined) {
    return useReadContract({
        address: contractAddress,
        abi: PredictionMarketABI,
        functionName: 'getUserShares',
        args: userAddress ? [marketId, userAddress] : undefined,
        query: {
            enabled: !!userAddress,
        },
    });
}

export function useOutcomePrice(marketId: bigint, outcome: number) {
    return useReadContract({
        address: contractAddress,
        abi: PredictionMarketABI,
        functionName: 'getOutcomePrice',
        args: [marketId, outcome],
    });
}

// Write Hooks
export function useCreateMarket() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const createMarket = async (
        question: string,
        description: string,
        outcomes: string[],
        endTime: bigint,
        initialLiquidity: string
    ) => {
        writeContract({
            address: contractAddress,
            abi: PredictionMarketABI,
            functionName: 'createMarket',
            args: [question, description, outcomes, endTime],
            value: parseEther(initialLiquidity),
        });
    };

    return {
        createMarket,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

export function useBuyShares() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const buyShares = async (marketId: bigint, outcome: number, amount: string) => {
        writeContract({
            address: contractAddress,
            abi: PredictionMarketABI,
            functionName: 'buyShares',
            args: [marketId, outcome],
            value: parseEther(amount),
        });
    };

    return {
        buyShares,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

export function useSellShares() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const sellShares = async (marketId: bigint, outcome: number, shares: bigint) => {
        writeContract({
            address: contractAddress,
            abi: PredictionMarketABI,
            functionName: 'sellShares',
            args: [marketId, outcome, shares],
        });
    };

    return {
        sellShares,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

export function useClaimWinnings() {
    const { writeContract, data: hash, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

    const claimWinnings = async (marketId: bigint) => {
        writeContract({
            address: contractAddress,
            abi: PredictionMarketABI,
            functionName: 'claimWinnings',
            args: [marketId],
        });
    };

    return {
        claimWinnings,
        hash,
        isPending,
        isConfirming,
        isSuccess,
        error,
    };
}

// Utility functions
export function formatMarketData(rawMarket: Market): Market {
    return {
        ...rawMarket,
        totalPool: rawMarket.totalPool,
        outcomePools: rawMarket.outcomePools,
    };
}

export function calculateProbability(outcomePool: bigint, totalPool: bigint): number {
    if (totalPool === 0n) return 0;
    return Number((outcomePool * 10000n) / totalPool) / 100;
}

export function formatPoolAmount(amount: bigint): string {
    return formatEther(amount);
}
