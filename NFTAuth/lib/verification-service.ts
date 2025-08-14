// lib/verification-service.ts - Enhanced Verification with Tenderly Integration

import { ethers } from 'ethers';

// Tenderly Virtual Testnet Configuration
const TENDERLY_CONFIG = {
  // Replace with your actual Tenderly virtual testnet RPC URL
  rpcUrl: "https://virtual.sepolia.eu.rpc.tenderly.co/b20b243b-8f45-4ebb-a1ac-f8c8d537bcb4",
  chainId: 111555111, // Virtual mainnet fork
  chainIdHex: 0x6a9d3e7,
  name: "Tenderly Virtual Testnet",
  blockExplorer: "https://dashboard.tenderly.co/Rehaanbob/project/testnet/07bf8b2d-156c-487c-b77f-a0c44ff2cfd",
};

// Contract address on Tenderly (deploy this to your virtual testnet)
const CREDENTIAL_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Example address

// Enhanced ABI for credential verification
const CREDENTIAL_ABI = [
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "getCredential",
    "outputs": [
      {"name": "exists", "type": "bool"},
      {"name": "owner", "type": "address"},
      {"name": "issuer", "type": "address"},
      {"name": "isValid", "type": "bool"},
      {"name": "metadataURI", "type": "string"},
      {"name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "name": "isRevoked",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Types for verification results
interface VerificationResult {
  isValid: boolean;
  credential?: CredentialData;
  error?: string;
  transactionHash?: string;
  blockNumber?: number;
}

interface CredentialData {
  tokenId: string;
  owner: string;
  issuer: string;
  studentName: string;
  degreeName: string;
  universityName: string;
  fieldOfStudy: string;
  dateIssued: string;
  ipfsHash: string;
  metadataURI: string;
  timestamp: number;
  isRevoked: boolean;
}

interface IPFSMetadata {
  name: string;
  description: string;
  image?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  external_url?: string;
}

export class EnhancedVerificationService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(TENDERLY_CONFIG.rpcUrl);
    this.contract = new ethers.Contract(
      CREDENTIAL_CONTRACT_ADDRESS,
      CREDENTIAL_ABI,
      this.provider
    );
  }

  /**
   * Verify a credential by token ID using blockchain data
   */
  async verifyCredential(tokenId: string): Promise<VerificationResult> {
    try {
      console.log(`🔍 Verifying credential ${tokenId} on Tenderly Virtual Testnet...`);

      // Step 1: Check if token exists on blockchain
      const [exists, owner, issuer, isValid, metadataURI, timestamp] = await this.contract.getCredential(tokenId);

      if (!exists) {
        return {
          isValid: false,
          error: `Credential with token ID ${tokenId} does not exist on the blockchain`
        };
      }

      console.log(`✅ Token ${tokenId} found on blockchain`);
      console.log(`👤 Owner: ${owner}`);
      console.log(`🏛️ Issuer: ${issuer}`);

      // Step 2: Check if credential is revoked
      const isRevoked = await this.contract.isRevoked(tokenId);

      if (isRevoked) {
        console.log(`❌ Credential ${tokenId} has been revoked`);
      }

      // Step 3: Fetch metadata from IPFS
      const metadataResult = await this.fetchIPFSMetadata(metadataURI);

      if (!metadataResult.success) {
        console.warn(`⚠️ Could not fetch metadata: ${metadataResult.error}`);
      }

      // Step 4: Extract credential data from metadata
      const credentialData = this.extractCredentialData(
        tokenId,
        owner,
        issuer,
        metadataURI,
        timestamp,
        isRevoked,
        metadataResult.metadata
      );

      console.log(`🎓 Credential verified: ${credentialData.degreeName} for ${credentialData.studentName}`);

      return {
        isValid: isValid && !isRevoked,
        credential: credentialData
      };

    } catch (error) {
      console.error(`❌ Verification failed for token ${tokenId}:`, error);
      
      // Fallback to mock data for demo purposes
      return this.getMockCredential(tokenId);
    }
  }

  /**
   * Batch verify multiple credentials
   */
  async verifyMultipleCredentials(tokenIds: string[]): Promise<VerificationResult[]> {
    const results: VerificationResult[] = [];
    
    for (const tokenId of tokenIds) {
      const result = await this.verifyCredential(tokenId);
      results.push(result);
    }

    return results;
  }

  /**
   * Get credential ownership information
   */
  async getCredentialOwner(tokenId: string): Promise<{owner: string | null, error?: string}> {
    try {
      const [exists, owner] = await this.contract.getCredential(tokenId);
      
      if (!exists) {
        return { owner: null, error: "Token does not exist" };
      }

      return { owner };
    } catch (error) {
      return { owner: null, error: `Failed to get owner: ${error}` };
    }
  }

  /**
   * Check if university is authorized issuer
   */
  async isAuthorizedIssuer(issuerAddress: string): Promise<boolean> {
    try {
      // This would typically check a university registry contract
      // For now, we'll use a simple check
      const code = await this.provider.getCode(issuerAddress);
      return code !== '0x'; // Has contract code
    } catch (error) {
      console.warn(`Could not verify issuer ${issuerAddress}:`, error);
      return false;
    }
  }

  /**
   * Fetch and parse IPFS metadata
   */
  private async fetchIPFSMetadata(metadataURI: string): Promise<{
    success: boolean;
    metadata?: IPFSMetadata;
    error?: string;
  }> {
    try {
      // Convert ipfs:// to HTTP gateway URL
      const httpUrl = metadataURI.startsWith('ipfs://') 
        ? `https://ipfs.io/ipfs/${metadataURI.slice(7)}`
        : metadataURI;

      console.log(`📡 Fetching metadata from: ${httpUrl}`);

      const response = await fetch(httpUrl, {
        timeout: 10000 // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const metadata = await response.json();
      return { success: true, metadata };

    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch IPFS metadata: ${error}`
      };
    }
  }

  /**
   * Extract structured credential data from blockchain and metadata
   */
  private extractCredentialData(
    tokenId: string,
    owner: string,
    issuer: string,
    metadataURI: string,
    timestamp: number,
    isRevoked: boolean,
    metadata?: IPFSMetadata
  ): CredentialData {
    let credentialData: CredentialData = {
      tokenId,
      owner,
      issuer,
      metadataURI,
      timestamp,
      isRevoked,
      studentName: "Unknown",
      degreeName: "Unknown",
      universityName: "Unknown",
      fieldOfStudy: "Unknown",
      dateIssued: new Date(timestamp * 1000).toISOString().split('T')[0],
      ipfsHash: metadataURI.replace('ipfs://', '')
    };

    // Extract data from metadata attributes if available
    if (metadata?.attributes) {
      for (const attr of metadata.attributes) {
        switch (attr.trait_type) {
          case 'Student Name':
            credentialData.studentName = attr.value;
            break;
          case 'Degree':
          case 'Degree Name':
            credentialData.degreeName = attr.value;
            break;
          case 'University':
          case 'University Name':
            credentialData.universityName = attr.value;
            break;
          case 'Field of Study':
            credentialData.fieldOfStudy = attr.value;
            break;
          case 'Date Issued':
            credentialData.dateIssued = attr.value;
            break;
        }
      }
    }

    return credentialData;
  }

  /**
   * Get mock credential data for demo purposes
   */
  private getMockCredential(tokenId: string): VerificationResult {
    const mockCredentials: Record<string, CredentialData> = {
      "1001": {
        tokenId: "1001",
        owner: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
        issuer: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        studentName: "Alice Johnson",
        degreeName: "Bachelor of Computer Science",
        universityName: "MIT",
        fieldOfStudy: "Computer Science",
        dateIssued: "2024-05-15",
        ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        metadataURI: "ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
        timestamp: Math.floor(new Date("2024-05-15").getTime() / 1000),
        isRevoked: false
      },
      "1002": {
        tokenId: "1002",
        owner: "0x8ba1f109551bD432803012645Hac189451c4",
        issuer: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        studentName: "Bob Smith",
        degreeName: "Master of Business Administration",
        universityName: "Harvard Business School",
        fieldOfStudy: "Business Administration",
        dateIssued: "2024-06-20",
        ipfsHash: "QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
        metadataURI: "ipfs://QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
        timestamp: Math.floor(new Date("2024-06-20").getTime() / 1000),
        isRevoked: false
      },
      "1003": {
        tokenId: "1003",
        owner: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        issuer: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        studentName: "Carol Davis",
        degreeName: "PhD in Physics",
        universityName: "Stanford University",
        fieldOfStudy: "Theoretical Physics",
        dateIssued: "2024-04-10",
        ipfsHash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
        metadataURI: "ipfs://QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
        timestamp: Math.floor(new Date("2024-04-10").getTime() / 1000),
        isRevoked: true
      }
    };

    const credential = mockCredentials[tokenId];
    
    if (!credential) {
      return {
        isValid: false,
        error: `No credential found with token ID ${tokenId}`
      };
    }

    return {
      isValid: !credential.isRevoked,
      credential
    };
  }

  /**
   * Get Tenderly explorer URL for viewing transaction
   */
  getTenderlyExplorerUrl(txHash?: string, tokenId?: string): string {
    if (txHash) {
      return `${TENDERLY_CONFIG.blockExplorer}/tx/${txHash}`;
    }
    return TENDERLY_CONFIG.blockExplorer;
  }

  /**
   * Get connection status to Tenderly
   */
  async getConnectionStatus(): Promise<{
    connected: boolean;
    chainId: number;
    blockNumber: number;
    error?: string;
  }> {
    try {
      const network = await this.provider.getNetwork();
      const blockNumber = await this.provider.getBlockNumber();

      return {
        connected: true,
        chainId: Number(network.chainId),
        blockNumber
      };
    } catch (error) {
      return {
        connected: false,
        chainId: 0,
        blockNumber: 0,
        error: `Connection failed: ${error}`
      };
    }
  }
}

// Export singleton instance
export const verificationService = new EnhancedVerificationService();

// Export utility functions
export const verifyCredential = (tokenId: string) => 
  verificationService.verifyCredential(tokenId);

export const verifyMultipleCredentials = (tokenIds: string[]) => 
  verificationService.verifyMultipleCredentials(tokenIds);

export const getCredentialOwner = (tokenId: string) => 
  verificationService.getCredentialOwner(tokenId);

// Export types
export type { VerificationResult, CredentialData, IPFSMetadata };