"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Wallet,
  Shield,
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Building2,
  Key,
  Globe,
  Copy,
  Loader2,
} from "lucide-react";

// Add Web3 types and Tenderly integration
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Import the Tenderly service (in production, you'd import from separate file)
class TenderlyDemo {
  private static tokenCounter = 1004; // Start after existing mock tokens

  static async uploadToIPFS(file: File): Promise<string> {
    console.log(`Uploading ${file.name} to IPFS...`);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fileString = `${file.name}-${file.size}-${file.lastModified}`;
    const hashInput = btoa(fileString).slice(0, 32);
    return `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79oj${hashInput}`;
  }

  static async uploadJSONToIPFS(metadata: object): Promise<string> {
    console.log("Uploading metadata to IPFS...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const metadataString = JSON.stringify(metadata);
    const hashInput = btoa(metadataString).slice(0, 32);
    return `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB${hashInput}`;
  }

  static async mintNFT(
    recipientAddress: string,
    metadataURI: string,
    credentialData: any
  ): Promise<string> {
    console.log("Minting NFT on Tenderly Virtual Testnet...");
    console.log("Recipient:", recipientAddress);
    console.log("Metadata URI:", metadataURI);
    console.log("Credential Data:", credentialData);

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const tokenId = this.tokenCounter.toString();
    this.tokenCounter++;

    console.log(`NFT minted! Token ID: ${tokenId}`);
    console.log(
      `View on Tenderly: https://dashboard.tenderly.co/explorer/vnet/your-testnet/tx/0x${Math.random()
        .toString(16)
        .slice(2, 18)}`
    );

    return tokenId;
  }
}

// IPFS and blockchain utility functions
const uploadPDFToIPFS = async (file: File): Promise<string> => {
  // For hackathon demo, we'll use a public IPFS service
  // In production, use Pinata, Infura IPFS, or your own node

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Using a mock upload for demo - replace with actual IPFS service
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload time

    // Generate a realistic-looking IPFS hash
    const hash = `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    return hash;
  } catch (error) {
    throw new Error(`IPFS upload failed: ${error}`);
  }
};

const uploadJSONToIPFS = async (metadata: object): Promise<string> => {
  try {
    // Simulate metadata upload
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const hash = `QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    return hash;
  } catch (error) {
    throw new Error(`Metadata upload failed: ${error}`);
  }
};

const mintNFTOnChain = async (
  recipientAddress: string,
  tokenURI: string,
  credentialData: any
): Promise<string> => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not found");
    }

    // Switch to Sepolia if not already there
    const sepoliaChainId = "0xaa36a7"; // 11155111 in hex

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (switchError: any) {
      // If Sepolia is not added, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: sepoliaChainId,
              chainName: "Sepolia Test Network",
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "SEP",
                decimals: 18,
              },
              rpcUrls: ["https://sepolia.infura.io/v3/"],
              blockExplorerUrls: ["https://sepolia.etherscan.io/"],
            },
          ],
        });
      }
    }

    // For hackathon demo, we'll simulate the contract call
    // In production, replace this with actual contract interaction using ethers.js or viem
    console.log("Calling smart contract mint function...");
    console.log("Recipient:", recipientAddress);
    console.log("Token URI:", tokenURI);
    console.log("Credential Data:", credentialData);

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate mock token ID
    const tokenId = (1000 + Math.floor(Math.random() * 9000)).toString();

    return tokenId;
  } catch (error) {
    throw new Error(`Blockchain minting failed: ${error}`);
  }
};

// Types for the registration flow
interface UniversityRegistration {
  domain: string;
  universityName: string;
  contactEmail: string;
  isVerified: boolean;
  walletAddress?: string;
}

interface WalletConnection {
  address: string;
  isConnected: boolean;
  chainId: number;
}

// Mock data for issued credentials
const mockCredentials = [
  {
    tokenId: "1001",
    recipientAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    degreeName: "Bachelor of Computer Science",
    studentName: "Alice Johnson",
    isRevoked: false,
  },
  {
    tokenId: "1002",
    recipientAddress: "0x8ba1f109551bD432803012645Hac189451c4",
    degreeName: "Master of Business Administration",
    studentName: "Bob Smith",
    isRevoked: false,
  },
  {
    tokenId: "1003",
    recipientAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    degreeName: "PhD in Physics",
    studentName: "Carol Davis",
    isRevoked: true,
  },
];

export default function UniversityDashboard() {
  // Registration state
  const [registrationStep, setRegistrationStep] = useState<
    "register" | "verify" | "wallet" | "complete"
  >("register");
  const [registration, setRegistration] = useState<UniversityRegistration>({
    domain: "",
    universityName: "",
    contactEmail: "",
    isVerified: false,
  });

  // Wallet state
  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    studentWallet: "",
    degreeName: "",
    fieldOfStudy: "",
    dateIssued: "",
    studentName: "",
    studentId: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Check if MetaMask is available
  const isMetaMaskAvailable =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  // Load saved registration data on component mount
  useEffect(() => {
    const savedRegistration = localStorage.getItem("universityRegistration");
    if (savedRegistration) {
      const parsed = JSON.parse(savedRegistration);
      setRegistration(parsed);
      if (parsed.isVerified && parsed.walletAddress) {
        setRegistrationStep("complete");
      } else if (parsed.isVerified) {
        setRegistrationStep("wallet");
      } else if (parsed.domain) {
        setRegistrationStep("verify");
      }
    }
  }, []);

  // MetaMask connection functions
  const connectMetaMask = async () => {
    if (!isMetaMaskAvailable) {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      const connection: WalletConnection = {
        address: accounts[0],
        isConnected: true,
        chainId: parseInt(chainId, 16),
      };

      setWalletConnection(connection);

      // Update registration with wallet address
      const updatedRegistration = {
        ...registration,
        walletAddress: accounts[0],
      };
      setRegistration(updatedRegistration);
      localStorage.setItem(
        "universityRegistration",
        JSON.stringify(updatedRegistration)
      );
      setRegistrationStep("complete");
    } catch (error) {
      console.error("Failed to connect MetaMask:", error);
      alert("Failed to connect MetaMask. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletConnection(null);
    const updatedRegistration = { ...registration };
    delete updatedRegistration.walletAddress;
    setRegistration(updatedRegistration);
    localStorage.setItem(
      "universityRegistration",
      JSON.stringify(updatedRegistration)
    );
    setRegistrationStep("wallet");
  };

  // Registration flow functions
  const handleDomainRegistration = async () => {
    if (
      !registration.domain ||
      !registration.universityName ||
      !registration.contactEmail
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate domain registration
    setRegistrationStep("verify");
    const updatedRegistration = { ...registration };
    setRegistration(updatedRegistration);
    localStorage.setItem(
      "universityRegistration",
      JSON.stringify(updatedRegistration)
    );
  };

  const verifyDomain = async () => {
    // Simulate domain verification process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const updatedRegistration = {
      ...registration,
      isVerified: true,
    };
    setRegistration(updatedRegistration);
    localStorage.setItem(
      "universityRegistration",
      JSON.stringify(updatedRegistration)
    );
    setRegistrationStep("wallet");
  };

  const resetRegistration = () => {
    setRegistration({
      domain: "",
      universityName: "",
      contactEmail: "",
      isVerified: false,
    });
    setWalletConnection(null);
    setRegistrationStep("register");
    localStorage.removeItem("universityRegistration");
  };

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const mintCredential = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file to upload");
      return;
    }

    if (
      !formData.studentWallet ||
      !formData.studentName ||
      !formData.degreeName
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!walletConnection?.isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setIsConnecting(true);

      // Step 1: Upload PDF to IPFS
      console.log("📄 Uploading PDF to IPFS...");
      const pdfHash = await TenderlyDemo.uploadToIPFS(selectedFile);
      console.log("✅ PDF uploaded:", pdfHash);

      // Step 2: Create metadata JSON
      const metadata = {
        name: `${formData.degreeName} - ${formData.studentName}`,
        description: `Academic credential for ${formData.degreeName} in ${formData.fieldOfStudy} issued by ${registration.universityName}`,
        image: `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(
          formData.degreeName
        )}`,
        external_url: `${window.location.origin}/verify?token=`,
        attributes: [
          { trait_type: "Student Name", value: formData.studentName },
          { trait_type: "Student ID", value: formData.studentId },
          { trait_type: "Degree", value: formData.degreeName },
          { trait_type: "Field of Study", value: formData.fieldOfStudy },
          { trait_type: "University", value: registration.universityName },
          { trait_type: "University Domain", value: registration.domain },
          { trait_type: "Date Issued", value: formData.dateIssued },
          { trait_type: "PDF Hash", value: pdfHash },
          { trait_type: "Issuer Address", value: walletConnection.address },
        ],
        properties: {
          credential_type: "academic_degree",
          pdf_document: `ipfs://${pdfHash}`,
          verification_url: `${window.location.origin}/verify?token=`,
          blockchain: "ethereum",
          network: "tenderly_virtual_testnet",
        },
      };

      // Step 3: Upload metadata to IPFS
      console.log("🔗 Uploading metadata to IPFS...");
      const metadataHash = await TenderlyDemo.uploadJSONToIPFS(metadata);
      console.log("✅ Metadata uploaded:", metadataHash);

      // Step 4: Mint NFT on Tenderly Virtual Testnet
      console.log("⛓️ Minting NFT on Tenderly Virtual Testnet...");
      const tokenId = await TenderlyDemo.mintNFT(
        formData.studentWallet,
        `ipfs://${metadataHash}`,
        {
          studentName: formData.studentName,
          studentId: formData.studentId,
          degreeName: formData.degreeName,
          fieldOfStudy: formData.fieldOfStudy,
          universityName: registration.universityName,
          dateIssued: formData.dateIssued,
          pdfHash: pdfHash,
        }
      );

      // Success message with all the details
      const successMessage = `
🎉 Credential Minted Successfully!

📋 Details:
• Token ID: ${tokenId}
• Student: ${formData.studentName}
• Degree: ${formData.degreeName}
• University: ${registration.universityName}

🔗 Blockchain Data:
• PDF Hash: ${pdfHash}
• Metadata Hash: ${metadataHash}
• Recipient: ${formData.studentWallet}

🌐 Links:
• PDF: https://ipfs.io/ipfs/${pdfHash}
• Metadata: https://ipfs.io/ipfs/${metadataHash}
• Verify: ${window.location.origin}/verify?token=${tokenId}
      `;

      alert(successMessage);

      // Reset form
      setFormData({
        studentWallet: "",
        degreeName: "",
        fieldOfStudy: "",
        dateIssued: "",
        studentName: "",
        studentId: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("❌ Failed to mint credential:", error);
      alert(`Failed to mint credential: ${error}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const revokeCredential = async (tokenId: string) => {
    console.log("Revoking credential:", tokenId);
    alert(`Credential ${tokenId} revoked! (Demo)`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Render registration steps
  const renderRegistrationFlow = () => {
    switch (registrationStep) {
      case "register":
        return (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  University Registration
                </CardTitle>
                <CardDescription>
                  Register your university to start issuing blockchain-verified
                  credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="universityName">University Name</Label>
                  <Input
                    id="universityName"
                    placeholder="Harvard University"
                    value={registration.universityName}
                    onChange={(e) =>
                      setRegistration((prev) => ({
                        ...prev,
                        universityName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="domain">University Domain</Label>
                  <Input
                    id="domain"
                    placeholder="harvard.edu"
                    value={registration.domain}
                    onChange={(e) =>
                      setRegistration((prev) => ({
                        ...prev,
                        domain: e.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This domain will be verified to ensure authenticity
                  </p>
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="admin@harvard.edu"
                    value={registration.contactEmail}
                    onChange={(e) =>
                      setRegistration((prev) => ({
                        ...prev,
                        contactEmail: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button onClick={handleDomainRegistration} className="w-full">
                  Register University
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "verify":
        return (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Domain Verification
                </CardTitle>
                <CardDescription>
                  Verify ownership of {registration.domain}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Verification Instructions
                  </h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Add the following TXT record to your domain's DNS:</li>
                    <li className="ml-4 font-mono bg-blue-100 p-2 rounded">
                      nft-credentials-verification=abc123def456
                    </li>
                    <li>Wait for DNS propagation (usually 5-30 minutes)</li>
                    <li>Click "Verify Domain" below</li>
                  </ol>
                </div>
                <div className="flex gap-2">
                  <Button onClick={verifyDomain} className="flex-1">
                    Verify Domain
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setRegistrationStep("register")}
                  >
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "wallet":
        return (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </CardTitle>
                <CardDescription>
                  Connect your MetaMask wallet to issue credentials for{" "}
                  {registration.universityName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle className="h-5 w-5" />
                  <span>
                    Domain {registration.domain} verified successfully
                  </span>
                </div>

                {!isMetaMaskAvailable ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">
                      MetaMask Required
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Please install MetaMask browser extension to continue
                    </p>
                    <Button asChild>
                      <a
                        href="https://metamask.io/download/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Install MetaMask
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">
                      Connect Your Wallet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Connect your MetaMask wallet to start issuing credentials
                    </p>
                    <Button
                      onClick={connectMetaMask}
                      disabled={isConnecting}
                      className="w-full"
                    >
                      {isConnecting ? "Connecting..." : "Connect MetaMask"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "complete":
        return (
          <div className="space-y-6">
            {/* University Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {registration.universityName}
                </CardTitle>
                <CardDescription>
                  Verified university • Domain: {registration.domain}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>University Wallet Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono flex-1">
                        {registration.walletAddress}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(registration.walletAddress!)
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Connection Status</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        Connected to MetaMask
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={disconnectWallet}>
                    Disconnect Wallet
                  </Button>
                  <Button variant="outline" onClick={resetRegistration}>
                    Reset Registration
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mint Credential Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Issue New Credential
                </CardTitle>
                <CardDescription>
                  Create a blockchain-verified academic credential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentWallet">
                      Student Wallet Address
                    </Label>
                    <Input
                      id="studentWallet"
                      placeholder="0x..."
                      value={formData.studentWallet}
                      onChange={(e) =>
                        handleInputChange("studentWallet", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      placeholder="John Doe"
                      value={formData.studentName}
                      onChange={(e) =>
                        handleInputChange("studentName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      placeholder="STU123456"
                      value={formData.studentId}
                      onChange={(e) =>
                        handleInputChange("studentId", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateIssued">Date Issued</Label>
                    <Input
                      id="dateIssued"
                      type="date"
                      value={formData.dateIssued}
                      onChange={(e) =>
                        handleInputChange("dateIssued", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degreeName">Degree Name</Label>
                    <Input
                      id="degreeName"
                      placeholder="Bachelor of Science"
                      value={formData.degreeName}
                      onChange={(e) =>
                        handleInputChange("degreeName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      placeholder="Computer Science"
                      value={formData.fieldOfStudy}
                      onChange={(e) =>
                        handleInputChange("fieldOfStudy", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pdfUpload">PDF Certificate</Label>
                  <div className="mt-2">
                    <Input
                      id="pdfUpload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <Button
                  onClick={mintCredential}
                  disabled={
                    isConnecting ||
                    !selectedFile ||
                    !formData.studentWallet ||
                    !formData.degreeName
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Minting Credential...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Issue Credential
                    </>
                  )}
                </Button>

                {isConnecting && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">
                      🚀 Minting Process
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>📄 Uploading PDF to IPFS...</li>
                      <li>🔗 Creating metadata JSON...</li>
                      <li>📡 Uploading metadata to IPFS...</li>
                      <li>⛓️ Minting NFT on Tenderly Virtual Testnet...</li>
                      <li>✅ Almost done...</li>
                    </ul>
                    <div className="mt-3 text-xs text-blue-600">
                      💡 Using Tenderly for instant, gas-free blockchain
                      interactions
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Issued Credentials Table */}
            <Card>
              <CardHeader>
                <CardTitle>Issued Credentials</CardTitle>
                <CardDescription>
                  Manage previously issued credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token ID</TableHead>
                      <TableHead>Recipient Address</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCredentials.map((credential) => (
                      <TableRow key={credential.tokenId}>
                        <TableCell className="font-mono">
                          {credential.tokenId}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {credential.recipientAddress.slice(0, 10)}...
                          {credential.recipientAddress.slice(-8)}
                        </TableCell>
                        <TableCell>{credential.studentName}</TableCell>
                        <TableCell>{credential.degreeName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              credential.isRevoked ? "destructive" : "default"
                            }
                          >
                            {credential.isRevoked ? "Revoked" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!credential.isRevoked && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                revokeCredential(credential.tokenId)
                              }
                            >
                              Revoke
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            University Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Register your university and manage blockchain-verified credentials
          </p>
        </div>

        {renderRegistrationFlow()}
      </div>
    </div>
  );
}
