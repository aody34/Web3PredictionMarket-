'use client';

import { useState } from 'react';
import { MarketCard } from './MarketCard';
import { Input } from '../ui/Input';
import { SkeletonMarketCard } from '../ui/Skeleton';

// Mock data for demonstration
const mockMarkets = [
    {
        id: '1',
        question: 'Will Bitcoin reach $100,000 by end of 2025?',
        description: 'This market resolves to YES if Bitcoin price reaches or exceeds $100,000 USD on any major exchange before December 31, 2025.',
        outcomes: [
            { name: 'Yes', probability: 67.5 },
            { name: 'No', probability: 32.5 },
        ],
        endTime: new Date('2025-12-31'),
        totalVolume: '245.5',
        category: 'Crypto',
    },
    {
        id: '2',
        question: 'Will AI pass the Turing Test by 2026?',
        description: 'Resolves YES if a publicly demonstrated AI system convincingly passes an official Turing Test.',
        outcomes: [
            { name: 'Yes', probability: 45.2 },
            { name: 'No', probability: 54.8 },
        ],
        endTime: new Date('2026-06-30'),
        totalVolume: '128.3',
        category: 'Technology',
    },
    {
        id: '3',
        question: 'Who will win the 2024 US Presidential Election?',
        description: 'This market resolves based on the official winner of the 2024 US Presidential Election.',
        outcomes: [
            { name: 'Democrat', probability: 52.1 },
            { name: 'Republican', probability: 47.9 },
        ],
        endTime: new Date('2024-11-05'),
        totalVolume: '1250.8',
        category: 'Politics',
        resolved: true,
        winningOutcome: 1,
    },
    {
        id: '4',
        question: 'Will Ethereum 2.0 fully launch by Q2 2025?',
        outcomes: [
            { name: 'Yes', probability: 78.3 },
            { name: 'No', probability: 21.7 },
        ],
        endTime: new Date('2025-06-30'),
        totalVolume: '89.2',
        category: 'Crypto',
    },
    {
        id: '5',
        question: 'Will SpaceX launch Starship to Mars by 2026?',
        outcomes: [
            { name: 'Yes', probability: 23.4 },
            { name: 'No', probability: 76.6 },
        ],
        endTime: new Date('2026-12-31'),
        totalVolume: '156.7',
        category: 'Science',
    },
    {
        id: '6',
        question: 'Will Apple release AR Glasses in 2025?',
        outcomes: [
            { name: 'Yes', probability: 61.2 },
            { name: 'No', probability: 38.8 },
        ],
        endTime: new Date('2025-12-31'),
        totalVolume: '78.4',
        category: 'Technology',
    },
];

type FilterType = 'all' | 'active' | 'resolved';
type SortType = 'newest' | 'ending-soon' | 'volume' | 'trending';

const categories = ['All', 'Crypto', 'Politics', 'Technology', 'Science', 'Sports', 'Entertainment'];

interface MarketListProps {
    showFilters?: boolean;
    isLoading?: boolean;
}

export function MarketList({ showFilters = true, isLoading = false }: MarketListProps) {
    const [filter, setFilter] = useState<FilterType>('all');
    const [sort, setSort] = useState<SortType>('trending');
    const [category, setCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter and sort markets
    let filteredMarkets = mockMarkets;

    // Apply status filter
    if (filter === 'active') {
        filteredMarkets = filteredMarkets.filter((m) => !m.resolved);
    } else if (filter === 'resolved') {
        filteredMarkets = filteredMarkets.filter((m) => m.resolved);
    }

    // Apply category filter
    if (category !== 'All') {
        filteredMarkets = filteredMarkets.filter((m) => m.category === category);
    }

    // Apply search filter
    if (searchQuery) {
        filteredMarkets = filteredMarkets.filter(
            (m) =>
                m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Apply sorting
    switch (sort) {
        case 'ending-soon':
            filteredMarkets.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
            break;
        case 'volume':
            filteredMarkets.sort((a, b) => parseFloat(b.totalVolume) - parseFloat(a.totalVolume));
            break;
        case 'newest':
        default:
            // Keep default order (newest first in mock data)
            break;
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonMarketCard key={i} />
                ))}
            </div>
        );
    }

    return (
        <div>
            {showFilters && (
                <div className="mb-8 space-y-4">
                    {/* Search and Sort Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Search markets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftElement={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                            />
                        </div>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortType)}
                            className="px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] text-sm cursor-pointer focus:outline-none focus:border-[var(--color-primary)]"
                        >
                            <option value="trending">Trending</option>
                            <option value="newest">Newest</option>
                            <option value="ending-soon">Ending Soon</option>
                            <option value="volume">Highest Volume</option>
                        </select>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {(['all', 'active', 'resolved'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f
                                        ? 'bg-[var(--color-primary)] text-white'
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                        <div className="w-px h-8 bg-[var(--border-color)] mx-2 self-center" />
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat
                                        ? 'bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]'
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Market Grid */}
            {filteredMarkets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMarkets.map((market) => (
                        <MarketCard key={market.id} {...market} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center">
                        <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">No markets found</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
}
