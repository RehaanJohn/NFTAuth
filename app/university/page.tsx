"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, Shield, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"

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
]

export default function UniversityDashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isDomainVerified, setIsDomainVerified] = useState(false)
  const [universityDomain, setUniversityDomain] = useState("")
  const [formData, setFormData] = useState({
    studentWallet: "",
    degreeName: "",
    fieldOfStudy: "",
    dateIssued: "",
    studentName: "",
    studentId: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Placeholder functions
  const connectWallet = async () => {
    // Placeholder for MetaMask connection
    setTimeout(() => {
      setIsWalletConnected(true)
    }, 1000)
  }

  const verifyDomain = async () => {
    // Placeholder for domain verification
    if (universityDomain) {
      setTimeout(() => {
        setIsDomainVerified(true)
      }, 1500)
    }
  }

  const mintCredential = async () => {
    // Placeholder for IPFS upload + smart contract call
    console.log("Minting credential:", formData, selectedFile)
    alert("Credential minted successfully! (Demo)")
  }

  const revokeCredential = async (tokenId: string) => {
    // Placeholder for revoke function
    console.log("Revoking credential:", tokenId)
    alert(`Credential ${tokenId} revoked! (Demo)`)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">University Dashboard</h1>
          <p className="text-gray-600 mt-2">Issue and manage blockchain-verified academic credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet & Domain */}
          <div className="space-y-6">
            {/* Wallet Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet Connection
                </CardTitle>
                <CardDescription>Connect your university wallet to issue credentials</CardDescription>
              </CardHeader>
              <CardContent>
                {!isWalletConnected ? (
                  <Button onClick={connectWallet} className="w-full">
                    Connect MetaMask
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Wallet Connected</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Domain Verification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Domain Verification
                </CardTitle>
                <CardDescription>Verify your university domain for authenticity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="domain">University Domain</Label>
                  <Input
                    id="domain"
                    placeholder="university.edu"
                    value={universityDomain}
                    onChange={(e) => setUniversityDomain(e.target.value)}
                  />
                </div>
                {!isDomainVerified ? (
                  <Button onClick={verifyDomain} disabled={!universityDomain} className="w-full">
                    Verify Domain
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Domain Verified</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Mint Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Mint Credential
                </CardTitle>
                <CardDescription>Issue a new blockchain-verified academic credential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentWallet">Student Wallet Address</Label>
                    <Input
                      id="studentWallet"
                      placeholder="0x..."
                      value={formData.studentWallet}
                      onChange={(e) => handleInputChange("studentWallet", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      placeholder="John Doe"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input
                      id="studentId"
                      placeholder="STU123456"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateIssued">Date Issued</Label>
                    <Input
                      id="dateIssued"
                      type="date"
                      value={formData.dateIssued}
                      onChange={(e) => handleInputChange("dateIssued", e.target.value)}
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
                      onChange={(e) => handleInputChange("degreeName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      placeholder="Computer Science"
                      value={formData.fieldOfStudy}
                      onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
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
                  {selectedFile && <p className="text-sm text-gray-600 mt-2">Selected: {selectedFile.name}</p>}
                </div>

                <Button
                  onClick={mintCredential}
                  disabled={!isWalletConnected || !isDomainVerified}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Mint Credential
                </Button>

                {(!isWalletConnected || !isDomainVerified) && (
                  <div className="flex items-center gap-2 text-amber-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>Please connect wallet and verify domain to mint credentials</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Issued Credentials Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Issued Credentials</CardTitle>
            <CardDescription>Manage previously issued credentials</CardDescription>
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
                    <TableCell className="font-mono">{credential.tokenId}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {credential.recipientAddress.slice(0, 10)}...{credential.recipientAddress.slice(-8)}
                    </TableCell>
                    <TableCell>{credential.studentName}</TableCell>
                    <TableCell>{credential.degreeName}</TableCell>
                    <TableCell>
                      <Badge variant={credential.isRevoked ? "destructive" : "default"}>
                        {credential.isRevoked ? "Revoked" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!credential.isRevoked && (
                        <Button variant="outline" size="sm" onClick={() => revokeCredential(credential.tokenId)}>
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
    </div>
  )
}
