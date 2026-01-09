import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - PredictX',
    description: 'Terms of Service for PredictX prediction markets platform',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Terms of Service</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)]">
                    <p className="text-sm text-[var(--text-muted)]">Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the PredictX platform ("Service"), you agree to be bound by these Terms of Service.
                            If you do not agree to these terms, please do not use the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Eligibility & Jurisdictional Restrictions</h2>
                        <p>
                            <strong className="text-[var(--color-warning)]">⚠️ IMPORTANT:</strong> This Service is NOT available to users in the following jurisdictions:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>United States of America and its territories</li>
                            <li>United Kingdom</li>
                            <li>Countries subject to OFAC sanctions</li>
                            <li>Any jurisdiction where prediction markets are prohibited by law</li>
                        </ul>
                        <p className="mt-3">
                            By using this Service, you represent and warrant that you are not located in,
                            incorporated in, or a citizen or resident of any restricted jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Nature of Service</h2>
                        <p>
                            PredictX is a decentralized prediction market protocol. Users can create markets,
                            trade outcome shares, and redeem winnings. The protocol is non-custodial;
                            you retain full control of your assets at all times.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Risk Disclosure</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Financial Risk:</strong> You may lose 100% of funds used in prediction markets.</li>
                            <li><strong>Smart Contract Risk:</strong> Smart contracts may contain bugs or vulnerabilities.</li>
                            <li><strong>Oracle Risk:</strong> Market resolution depends on oracle data sources.</li>
                            <li><strong>Regulatory Risk:</strong> Laws regarding prediction markets may change.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Oracle & Resolution</h2>
                        <p>
                            Markets are resolved using decentralized oracle networks (Chainlink, UMA) or designated
                            resolvers as specified in each market's resolution criteria. Resolution decisions are final.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. No Financial Advice</h2>
                        <p>
                            Nothing on this platform constitutes financial, investment, or trading advice.
                            You should conduct your own research and consult professionals before participating.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, PREDICTX AND ITS CONTRIBUTORS SHALL NOT BE
                            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Contact</h2>
                        <p>
                            For questions about these Terms, contact: legal@predictx.io
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
