export const CONTRACT_ADDRESSES = {
  CREDENTIAL_NFT: "0x1234567890123456789012345678901234567890",
  UNIVERSITY_REGISTRY: "0x0987654321098765432109876543210987654321",
} as const

// Network configuration
export const SUPPORTED_NETWORKS = {
  SEPOLIA: {
    chainId: 11155111,
    name: "Sepolia",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
  },
} as const

// IPFS configuration
export const IPFS_CONFIG = {
  GATEWAY_URL: "https://ipfs.io/ipfs/",
  PINATA_API_URL: "https://api.pinata.cloud",
  // Add your Pinata API keys here when implementing
  PINATA_API_KEY: "YOUR_PINATA_API_KEY",
  PINATA_SECRET_KEY: "YOUR_PINATA_SECRET_KEY",
} as const

// Contract ABI (placeholder - replace with actual ABI)
export const CREDENTIAL_NFT_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "tokenURI", type: "string" },
      { name: "credentialData", type: "bytes" },
    ],
    name: "mintCredential",
    outputs: [{ name: "tokenId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "revokeCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "getCredential",
    outputs: [
      { name: "isValid", type: "bool" },
      { name: "credentialData", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const
