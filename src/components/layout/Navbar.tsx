'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const navLinks = [
    { href: '/', label: 'Markets' },
    { href: '/create', label: 'Create Market' },
    { href: '/portfolio', label: 'Portfolio' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-[var(--border-color)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--shadow-glow)] transition-shadow">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            PredictX
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                                            ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                                        }
                  `}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Network Status Indicator */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-color)]">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                            <span className="text-xs text-[var(--text-secondary)]">Sepolia</span>
                        </div>

                        {/* Connect Wallet Button */}
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
                                            style: {
                                                opacity: 0,
                                                pointerEvents: 'none',
                                                userSelect: 'none',
                                            },
                                        })}
                                    >
                                        {(() => {
                                            if (!connected) {
                                                return (
                                                    <button
                                                        onClick={openConnectModal}
                                                        className="px-4 py-2.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-semibold rounded-xl hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-all"
                                                    >
                                                        Connect Wallet
                                                    </button>
                                                );
                                            }

                                            if (chain.unsupported) {
                                                return (
                                                    <button
                                                        onClick={openChainModal}
                                                        className="px-4 py-2.5 bg-[var(--color-error)] text-white text-sm font-semibold rounded-xl"
                                                    >
                                                        Wrong Network
                                                    </button>
                                                );
                                            }

                                            return (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={openChainModal}
                                                        className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl hover:border-[var(--border-color-light)] transition-colors"
                                                    >
                                                        {chain.hasIcon && chain.iconUrl && (
                                                            <img
                                                                alt={chain.name ?? 'Chain icon'}
                                                                src={chain.iconUrl}
                                                                className="w-4 h-4"
                                                            />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={openAccountModal}
                                                        className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl hover:border-[var(--color-primary)] transition-colors"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
                                                        <span className="text-sm font-medium text-[var(--text-primary)]">
                                                            {account.displayName}
                                                        </span>
                                                        <span className="text-xs text-[var(--text-muted)]">
                                                            {account.displayBalance}
                                                        </span>
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
