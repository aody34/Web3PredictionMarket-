import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - PredictX',
    description: 'Privacy Policy for PredictX prediction markets platform',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Privacy Policy</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
                    <p className="text-sm text-[var(--text-muted)]">Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Introduction</h2>
                        <p>
                            PredictX ("we", "our", "us") respects your privacy. This policy explains how we handle
                            information when you use our decentralized prediction market platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Information We Collect</h2>
                        <h3 className="text-lg font-medium text-[var(--text-primary)] mt-4 mb-2">Blockchain Data</h3>
                        <p>
                            All transactions on PredictX are recorded on public blockchains. This includes wallet
                            addresses, transaction hashes, and smart contract interactions. This data is publicly
                            accessible and immutable.
                        </p>

                        <h3 className="text-lg font-medium text-[var(--text-primary)] mt-4 mb-2">Technical Data</h3>
                        <p>
                            We may collect anonymized analytics including device type, browser version, and
                            interaction patterns to improve the platform experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. What We Do NOT Collect</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Personal identification (name, email, phone) - unless you provide it</li>
                            <li>Private keys or seed phrases - these never leave your device</li>
                            <li>Location data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Third-Party Services</h2>
                        <p>We integrate with the following services that have their own privacy policies:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li><strong>RPC Providers:</strong> Alchemy, Infura (transaction relay)</li>
                            <li><strong>Wallet Providers:</strong> MetaMask, WalletConnect, Coinbase Wallet</li>
                            <li><strong>Analytics:</strong> Vercel Analytics (anonymized)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Data Security</h2>
                        <p>
                            As a non-custodial platform, we do not store your funds or private keys.
                            All smart contract interactions are executed directly from your wallet.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Your Rights</h2>
                        <p>
                            Due to the decentralized nature of blockchain, on-chain data cannot be deleted.
                            However, you can request deletion of any off-chain data we may hold by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Cookies</h2>
                        <p>
                            We use essential cookies for wallet connection state and user preferences only.
                            No third-party tracking cookies are used.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Contact</h2>
                        <p>
                            For privacy inquiries: privacy@predictx.io
                        </p>
                    </section>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
                    <Link href="/" className="text-[var(--color-primary)] hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
