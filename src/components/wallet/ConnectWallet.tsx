'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { formatUnits } from 'viem';

interface ConnectWalletProps {
    variant?: 'default' | 'compact' | 'full';
    className?: string;
}

export function ConnectWallet({ variant = 'default', className = '' }: ConnectWalletProps) {
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({ address });
    const { disconnect } = useDisconnect();

    if (variant === 'compact') {
        return (
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                            })}
                            className={className}
                        >
                            {!connected ? (
                                <button
                                    onClick={openConnectModal}
                                    className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors"
                                >
                                    Connect
                                </button>
                            ) : (
                                <button
                                    onClick={openAccountModal}
                                    className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg hover:border-[var(--color-primary)] transition-colors"
                                >
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
                                    <span className="text-sm text-[var(--text-primary)]">
                                        {account.displayName}
                                    </span>
                                </button>
                            )}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        );
    }

    if (variant === 'full') {
        return (
            <div className={`bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-5 ${className}`}>
                {isConnected ? (
                    <>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
                            <div>
                                <p className="text-sm text-[var(--text-muted)]">Connected Wallet</p>
                                <p className="font-mono text-sm text-[var(--text-primary)]">
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg mb-4">
                            <span className="text-sm text-[var(--text-muted)]">Balance</span>
                            <span className="font-medium text-[var(--text-primary)]">
                                {balance ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}` : '0.00 ETH'}
                            </span>
                        </div>
                        <button
                            onClick={() => disconnect()}
                            className="w-full px-4 py-2.5 bg-[var(--color-error)]/10 text-[var(--color-error)] text-sm font-medium rounded-lg hover:bg-[var(--color-error)]/20 transition-colors"
                        >
                            Disconnect Wallet
                        </button>
                    </>
                ) : (
                    <ConnectButton.Custom>
                        {({ openConnectModal, mounted }) => (
                            <div {...(!mounted && { 'aria-hidden': true, style: { opacity: 0 } })}>
                                <div className="text-center mb-4">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Connect Your Wallet</h3>
                                    <p className="text-sm text-[var(--text-muted)]">Connect to start trading on prediction markets</p>
                                </div>
                                <button
                                    onClick={openConnectModal}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-xl hover:shadow-[var(--shadow-glow)] transition-all"
                                >
                                    Connect Wallet
                                </button>
                            </div>
                        )}
                    </ConnectButton.Custom>
                )}
            </div>
        );
    }

    // Default variant - uses RainbowKit's built-in ConnectButton
    return <ConnectButton />;
}

// Hook to get wallet state
export function useWallet() {
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();
    const { data: balance, isLoading: isBalanceLoading } = useBalance({ address });
    const { disconnect } = useDisconnect();

    return {
        address,
        isConnected,
        isConnecting,
        isDisconnected,
        balance: balance ? {
            value: balance.value,
            formatted: formatUnits(balance.value, balance.decimals),
            symbol: balance.symbol,
        } : null,
        isBalanceLoading,
        disconnect,
        shortAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null,
    };
}
