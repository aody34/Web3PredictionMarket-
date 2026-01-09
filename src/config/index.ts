// Web3 Configuration
export const config = {
  // WalletConnect Project ID - Get from https://cloud.walletconnect.com/
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  
  // Alchemy API Key - Get from https://alchemy.com/
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '',
  
  // Default chain ID (1 = Ethereum Mainnet, 11155111 = Sepolia)
  defaultChainId: Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID) || 11155111,
  
  // Contract Addresses
  contracts: {
    predictionMarket: process.env.NEXT_PUBLIC_PREDICTION_MARKET_CONTRACT || '0x0000000000000000000000000000000000000000',
  },
  
  // App metadata
  appName: 'Web3 Prediction Market',
  appDescription: 'Decentralized prediction market platform',
  appUrl: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
};
