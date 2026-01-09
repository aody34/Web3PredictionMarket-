'use client';

import { CreateMarketForm, MarketFormData } from '@/components/create/CreateMarketForm';
import { ConnectWallet } from '@/components/wallet/ConnectWallet';
import { useAccount } from 'wagmi';
import { useToast } from '@/components/ui/Toast';

export default function CreateMarketPage() {
    const { isConnected } = useAccount();
    const { addToast } = useToast();

    const handleSubmit = async (data: MarketFormData) => {
        console.log('Creating market with data:', data);

        // Simulate transaction
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In production, this would call the smart contract
        addToast('success', 'Market created successfully!');
    };

    if (!isConnected) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="max-w-md mx-auto px-4">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                            Create a Market
                        </h1>
                        <p className="text-[var(--text-muted)]">
                            Connect your wallet to create prediction markets
                        </p>
                    </div>
                    <ConnectWallet variant="full" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                        Create a Market
                    </h1>
                    <p className="text-[var(--text-muted)] max-w-lg mx-auto">
                        Create your own prediction market and let the crowd forecast the outcome.
                        You'll earn trading fees from every transaction.
                    </p>
                </div>

                {/* Form */}
                <CreateMarketForm onSubmit={handleSubmit} />

                {/* Info Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: '💰',
                            title: 'Earn Fees',
                            description: 'Market creators earn a percentage of all trading fees.',
                        },
                        {
                            icon: '⏱️',
                            title: 'You Decide',
                            description: 'Set your own resolution criteria and timeline.',
                        },
                        {
                            icon: '🔒',
                            title: 'Trustless',
                            description: 'All markets are powered by smart contracts.',
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="p-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl text-center"
                        >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <h3 className="font-medium text-[var(--text-primary)] mb-1">{item.title}</h3>
                            <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
