// Prediction Market Contract ABI
export const PredictionMarketABI = [
    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'marketId', type: 'uint256' },
            { indexed: true, name: 'creator', type: 'address' },
            { indexed: false, name: 'question', type: 'string' },
            { indexed: false, name: 'endTime', type: 'uint256' },
        ],
        name: 'MarketCreated',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'marketId', type: 'uint256' },
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'outcome', type: 'uint8' },
            { indexed: false, name: 'amount', type: 'uint256' },
            { indexed: false, name: 'shares', type: 'uint256' },
        ],
        name: 'SharesPurchased',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'marketId', type: 'uint256' },
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'outcome', type: 'uint8' },
            { indexed: false, name: 'shares', type: 'uint256' },
            { indexed: false, name: 'payout', type: 'uint256' },
        ],
        name: 'SharesSold',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'marketId', type: 'uint256' },
            { indexed: false, name: 'winningOutcome', type: 'uint8' },
        ],
        name: 'MarketResolved',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'marketId', type: 'uint256' },
            { indexed: true, name: 'user', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'WinningsClaimed',
        type: 'event',
    },

    // Read Functions
    {
        inputs: [],
        name: 'marketCount',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'marketId', type: 'uint256' }],
        name: 'getMarket',
        outputs: [
            {
                components: [
                    { name: 'id', type: 'uint256' },
                    { name: 'creator', type: 'address' },
                    { name: 'question', type: 'string' },
                    { name: 'description', type: 'string' },
                    { name: 'outcomes', type: 'string[]' },
                    { name: 'endTime', type: 'uint256' },
                    { name: 'resolved', type: 'bool' },
                    { name: 'winningOutcome', type: 'uint8' },
                    { name: 'totalPool', type: 'uint256' },
                    { name: 'outcomePools', type: 'uint256[]' },
                ],
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'marketId', type: 'uint256' },
            { name: 'user', type: 'address' },
        ],
        name: 'getUserShares',
        outputs: [{ name: '', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'marketId', type: 'uint256' },
            { name: 'outcome', type: 'uint8' },
        ],
        name: 'getOutcomePrice',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },

    // Write Functions
    {
        inputs: [
            { name: 'question', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'outcomes', type: 'string[]' },
            { name: 'endTime', type: 'uint256' },
        ],
        name: 'createMarket',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'marketId', type: 'uint256' },
            { name: 'outcome', type: 'uint8' },
        ],
        name: 'buyShares',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'marketId', type: 'uint256' },
            { name: 'outcome', type: 'uint8' },
            { name: 'shares', type: 'uint256' },
        ],
        name: 'sellShares',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'marketId', type: 'uint256' },
            { name: 'winningOutcome', type: 'uint8' },
        ],
        name: 'resolveMarket',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ name: 'marketId', type: 'uint256' }],
        name: 'claimWinnings',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;
