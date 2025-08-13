"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Globe,
  Copy,
  Loader2,
  Building2,
} from "lucide-react";

class TenderlyDemo {
  private static tokenCounter = 1004;
  static async uploadToIPFS(file: File): Promise<string> {
    await new Promise((r) => setTimeout(r, 1500));
    return `QmFile-${btoa(file.name).slice(0, 8)}`;
  }
  static async uploadJSONToIPFS(metadata: object): Promise<string> {
    await new Promise((r) => setTimeout(r, 1000));
    return `QmMeta-${btoa(JSON.stringify(metadata)).slice(0, 8)}`;
  }
  static async mintNFT(recipient: string, uri: string, data: any): Promise<string> {
    await new Promise((r) => setTimeout(r, 2000));
    return (this.tokenCounter++).toString();
  }
}

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

const mockCredentials = [
  {
    tokenId: "1001",
    recipientAddress: "0x742d35Cc...",
    degreeName: "Bachelor of Computer Science",
    studentName: "Alice Johnson",
    isRevoked: false,
  },
  {
    tokenId: "1002",
    recipientAddress: "0x8ba1f109...",
    degreeName: "Master of Business Administration",
    studentName: "Bob Smith",
    isRevoked: false,
  },
  {
    tokenId: "1003",
    recipientAddress: "0x1f9840a85...",
    degreeName: "PhD in Physics",
    studentName: "Carol Davis",
    isRevoked: true,
  },
];

export default function UniversityDashboard() {
  const [registrationStep, setRegistrationStep] = useState<"register" | "verify" | "wallet" | "complete">("register");
  const [registration, setRegistration] = useState<UniversityRegistration>({
    domain: "",
    universityName: "",
    contactEmail: "",
    isVerified: false,
  });
  const [walletConnection, setWalletConnection] = useState<WalletConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [formData, setFormData] = useState({
    studentWallet: "",
    degreeName: "",
    studentName: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isMetaMaskAvailable =
    typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined";

  useEffect(() => {
    const saved = localStorage.getItem("universityRegistration");
    if (saved) {
      const parsed = JSON.parse(saved);
      setRegistration(parsed);
      if (parsed.isVerified && parsed.walletAddress) setRegistrationStep("complete");
      else if (parsed.isVerified) setRegistrationStep("wallet");
      else if (parsed.domain) setRegistrationStep("verify");
    }
  }, []);

  const connectMetaMask = async () => {
    if (!isMetaMaskAvailable) {
      alert("MetaMask not installed");
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
      setWalletConnection({ address: accounts[0], isConnected: true, chainId: parseInt(chainId, 16) });
      const updated = { ...registration, walletAddress: accounts[0] };
      setRegistration(updated);
      localStorage.setItem("universityRegistration", JSON.stringify(updated));
      setRegistrationStep("complete");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDomainRegistration = () => {
    if (!registration.domain || !registration.universityName || !registration.contactEmail) {
      alert("Fill all fields");
      return;
    }
    setRegistrationStep("verify");
    localStorage.setItem("universityRegistration", JSON.stringify(registration));
  };

  const verifyDomain = async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const updated = { ...registration, isVerified: true };
    setRegistration(updated);
    localStorage.setItem("universityRegistration", JSON.stringify(updated));
    setRegistrationStep("wallet");
  };

  const mintCredential = async () => {
    if (!selectedFile || !formData.studentWallet || !formData.studentName || !formData.degreeName) {
      alert("Please fill required fields");
      return;
    }
    if (!walletConnection?.isConnected) {
      alert("Connect wallet first");
      return;
    }
    try {
      setIsConnecting(true);
      const pdfHash = await TenderlyDemo.uploadToIPFS(selectedFile);
      const metadata = {
        name: `${formData.degreeName} - ${formData.studentName}`,
        description: `Academic credential issued by ${registration.universityName}`,
        pdfHash,
      };
      const metadataHash = await TenderlyDemo.uploadJSONToIPFS(metadata);
      const tokenId = await TenderlyDemo.mintNFT(formData.studentWallet, `ipfs://${metadataHash}`, metadata);
      alert(`Credential minted! Token ID: ${tokenId}`);
      setFormData({ studentWallet: "", degreeName: "", studentName: "" });
      setSelectedFile(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const cardClass =
    "bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl transition-colors duration-300 shadow-lg";

  const renderStep = () => {
    switch (registrationStep) {
      case "register":
        return (
          <Card className={cardClass}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                University Registration
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Start issuing blockchain credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="University Name" value={registration.universityName} onChange={(e) => setRegistration({ ...registration, universityName: e.target.value })} />
              <Input placeholder="University Domain" value={registration.domain} onChange={(e) => setRegistration({ ...registration, domain: e.target.value })} />
              <Input placeholder="Contact Email" type="email" value={registration.contactEmail} onChange={(e) => setRegistration({ ...registration, contactEmail: e.target.value })} />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Register University
              </Button>
            </CardContent>
          </Card>
        );
      case "verify":
        return (
          <Card className={cardClass}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Domain Verification
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Verify {registration.domain}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
                Add TXT record: <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">nft-credentials-verification=abc123</code>
              </div>
              <Button onClick={verifyDomain} className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">Verify Domain</Button>
            </CardContent>
          </Card>
        );
      case "wallet":
        return (
          <Card className={cardClass}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Connect Wallet
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Connect MetaMask to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {isMetaMaskAvailable ? (
                <Button onClick={connectMetaMask} disabled={isConnecting} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {isConnecting ? "Connecting..." : "Connect MetaMask"}
                </Button>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Please install MetaMask</p>
              )}
            </CardContent>
          </Card>
        );
      case "complete":
        return (
          <div className="space-y-6">
            <Card className={cardClass}>
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {registration.universityName}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Domain: {registration.domain}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 justify-center">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{registration.walletAddress}</code>
                  <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(registration.walletAddress!)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Issue Credential</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Student Wallet" value={formData.studentWallet} onChange={(e) => setFormData({ ...formData, studentWallet: e.target.value })} />
                <Input placeholder="Student Name" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} />
                <Input placeholder="Degree Name" value={formData.degreeName} onChange={(e) => setFormData({ ...formData, degreeName: e.target.value })} />
                <Input type="file" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={mintCredential}>
                  {isConnecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  Issue Credential
                </Button>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Issued Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token ID</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCredentials.map((c) => (
                      <TableRow key={c.tokenId} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                        <TableCell>{c.tokenId}</TableCell>
                        <TableCell>{c.recipientAddress}</TableCell>
                        <TableCell>{c.studentName}</TableCell>
                        <TableCell>{c.degreeName}</TableCell>
                        <TableCell>
                          <Badge variant={c.isRevoked ? "destructive" : "default"}>
                            {c.isRevoked ? "Revoked" : "Active"}
                          </Badge>
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
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            University
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Manage registrations, verify domains, connect wallets, and issue blockchain credentials
          </p>
        </header>

        {renderStep()}
      </div>
    </div>
  );
}
