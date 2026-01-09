import Link from 'next/link';
import { MarketList } from '@/components/market/MarketList';

// Recent activity mock data
const recentActivity = [
  { user: '0x8f3...a2d', action: 'bought', market: 'BTC $100K', amount: '0.5 ETH', time: '2m ago' },
  { user: '0x1a2...f8c', action: 'sold', market: 'AI Turing', amount: '0.3 ETH', time: '5m ago' },
  { user: '0xd4e...9b1', action: 'bought', market: 'ETH 2.0', amount: '1.2 ETH', time: '8m ago' },
  { user: '0x7c9...3e5', action: 'claimed', market: 'US Election', amount: '2.4 ETH', time: '12m ago' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Testnet Notice */}
      <div className="bg-[var(--color-warning)]/10 border-b border-[var(--color-warning)]/20 py-2">
        <p className="text-center text-sm text-[var(--color-warning)]">
          ⚠️ <strong>Testnet Mode:</strong> This is a demo on Sepolia testnet. Get free test ETH from a{' '}
          <a href="https://sepoliafaucet.com" target="_blank" rel="noopener noreferrer" className="underline">
            faucet
          </a>{' '}
          to try trading.
        </p>
      </div>

      {/* Hero Section - Simplified */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-full text-sm text-[var(--color-success)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
            Live on Sepolia Testnet
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[var(--text-primary)]">Decentralized</span>{' '}
            <span className="gradient-text">Prediction Markets</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Trade on real-world outcomes. Markets resolved by Chainlink oracles.
            Full transparency, no intermediaries, verifiable on-chain.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="#markets"
              className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-xl transition-all"
            >
              Browse Markets
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold rounded-xl transition-all"
            >
              How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Total Volume', value: '$12.5M+' },
              { label: 'Active Markets', value: '245' },
              { label: 'Traders', value: '15K+' },
              { label: 'Avg. Settlement', value: '<1 min' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Ticker */}
      <section className="py-4 bg-[var(--bg-card)] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase whitespace-nowrap">Live Activity</span>
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className="font-mono text-[var(--text-muted)]">{activity.user}</span>
                <span className={activity.action === 'bought' ? 'text-[var(--color-success)]' : activity.action === 'claimed' ? 'text-[var(--color-warning)]' : 'text-[var(--color-error)]'}>
                  {activity.action}
                </span>
                <span className="text-[var(--text-primary)]">{activity.market}</span>
                <span className="text-[var(--text-muted)]">•</span>
                <span className="text-[var(--color-primary)]">{activity.amount}</span>
                <span className="text-[var(--text-muted)] text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">How It Works</h2>
            <p className="text-[var(--text-muted)]">Transparent, trustless, and verifiable</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create or Find Market', desc: 'Browse existing markets or create your own prediction with clear resolution criteria.' },
              { step: '2', title: 'Trade Outcome Shares', desc: 'Buy shares for outcomes you believe in. Prices reflect real-time market consensus.' },
              { step: '3', title: 'Oracle Resolution', desc: 'Markets resolve via Chainlink oracles or designated data sources. No manual intervention.' },
              { step: '4', title: 'Claim Winnings', desc: 'If your prediction is correct, redeem shares for 1 ETH each. Instant, on-chain settlement.' },
            ].map((item) => (
              <div key={item.step} className="relative p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl">
                <div className="absolute -top-3 left-6 w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Oracle Transparency Box */}
          <div className="mt-12 p-6 bg-[var(--bg-card)] border border-[var(--color-primary)]/30 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[var(--color-primary)]/10 rounded-lg">
                <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  🔮 Oracle & Resolution Transparency
                </h3>
                <p className="text-[var(--text-secondary)] mb-3">
                  All markets specify their resolution source upfront. We use:
                </p>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    <strong>Chainlink Price Feeds</strong> - For crypto price markets (BTC, ETH, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    <strong>UMA Optimistic Oracle</strong> - For event-based markets with dispute resolution
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    <strong>Verified Data Sources</strong> - AP, Reuters, Official Government Data
                  </li>
                </ul>
                <p className="text-xs text-[var(--text-muted)] mt-3">
                  Each market displays its specific resolution criteria and oracle source.
                  <Link href="/terms" className="text-[var(--color-primary)] ml-1">Learn more →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Section */}
      <section id="markets" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Trending Markets
              </h2>
              <p className="text-[var(--text-muted)] mt-1">
                Trade on the most popular predictions
              </p>
            </div>
          </div>

          <MarketList showFilters={true} />
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Why Trust PredictX?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔐',
                title: 'Non-Custodial',
                description: 'Your funds stay in your wallet. We never hold your crypto. All trades execute via smart contracts.',
              },
              {
                icon: '📜',
                title: 'Open Source',
                description: 'Smart contracts are verified on Etherscan. Anyone can audit the code and verify the logic.',
              },
              {
                icon: '⚖️',
                title: 'Fair Resolution',
                description: 'Market outcomes determined by decentralized oracles, not by platform operators.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Get testnet ETH and start trading risk-free. No real money required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://sepoliafaucet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium rounded-xl"
            >
              Get Testnet ETH
            </a>
            <Link
              href="#markets"
              className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-xl"
            >
              Start Trading
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Legal Notice */}
      <div className="py-4 border-t border-[var(--border-color)] bg-[var(--bg-card)]">
        <p className="text-center text-xs text-[var(--text-muted)]">
          By using this platform, you agree to our{' '}
          <Link href="/terms" className="text-[var(--color-primary)]">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-[var(--color-primary)]">Privacy Policy</Link>.
          Not available in US, UK, or restricted jurisdictions.
        </p>
      </div>
    </div>
  );
}
