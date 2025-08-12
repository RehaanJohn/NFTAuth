"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, GraduationCap, Share2, ExternalLink, CheckCircle, Eye } from "lucide-react"

// Mock student credentials data
const mockStudentCredentials = [
  {
    tokenId: "1001",
    degreeName: "Bachelor of Computer Science",
    issuer: "MIT",
    dateIssued: "2024-05-15",
    fieldOfStudy: "Computer Science",
    status: "verified",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  },
  {
    tokenId: "1004",
    degreeName: "Certificate in Web Development",
    issuer: "Stanford University",
    dateIssued: "2024-03-20",
    fieldOfStudy: "Web Development",
    status: "verified",
    ipfsHash: "QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
  },
  {
    tokenId: "1005",
    degreeName: "Master of Science in AI",
    issuer: "Carnegie Mellon University",
    dateIssued: "2024-07-10",
    fieldOfStudy: "Artificial Intelligence",
    status: "verified",
    ipfsHash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
  },
]

export default function StudentDashboard() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [selectedCredential, setSelectedCredential] = useState<any>(null)

  // Placeholder functions
  const connectWallet = async () => {
    // Placeholder for MetaMask connection
    setTimeout(() => {
      setIsWalletConnected(true)
    }, 1000)
  }

  const viewCredential = (credential: any) => {
    // Placeholder for viewing PDF
    window.open(`https://ipfs.io/ipfs/${credential.ipfsHash}`, "_blank")
  }

  const generateQRCode = (tokenId: string) => {
    // This would normally generate a real QR code
    // For demo purposes, we'll use a placeholder QR code image
    return `/placeholder.svg?height=200&width=200&query=QR code for credential ${tokenId}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">View and manage your blockchain-verified academic credentials</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Wallet Connection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Wallet
                </CardTitle>
                <CardDescription>Connect your wallet to view credentials</CardDescription>
              </CardHeader>
              <CardContent>
                {!isWalletConnected ? (
                  <Button onClick={connectWallet} className="w-full">
                    Connect MetaMask
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Wallet Connected</span>
                    </div>
                    <div className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">0x742d...8D4</div>
                    <div className="text-sm text-gray-600">
                      <strong>{mockStudentCredentials.length}</strong> credentials found
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {isWalletConnected && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Credentials</span>
                    <span className="font-semibold">{mockStudentCredentials.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Verified</span>
                    <span className="font-semibold text-green-600">
                      {mockStudentCredentials.filter((c) => c.status === "verified").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Universities</span>
                    <span className="font-semibold">{new Set(mockStudentCredentials.map((c) => c.issuer)).size}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content - Credentials List */}
          <div className="lg:col-span-3">
            {!isWalletConnected ? (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600">Connect your wallet to view your academic credentials</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">My Credentials</h2>
                  <Badge variant="secondary">{mockStudentCredentials.length} credentials</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockStudentCredentials.map((credential) => (
                    <Card key={credential.tokenId} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            <Badge variant="outline" className="text-xs">
                              #{credential.tokenId}
                            </Badge>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{credential.degreeName}</CardTitle>
                        <CardDescription>{credential.fieldOfStudy}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Issuer:</span>
                            <span className="font-medium">{credential.issuer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date Issued:</span>
                            <span className="font-medium">
                              {new Date(credential.dateIssued).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewCredential(credential)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedCredential(credential)}
                                className="flex-1"
                              >
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Share Credential</DialogTitle>
                                <DialogDescription>
                                  Share this credential using the QR code or verification link
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="text-center">
                                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                                    <img
                                      src={generateQRCode(credential.tokenId) || "/placeholder.svg"}
                                      alt={`QR code for credential ${credential.tokenId}`}
                                      className="w-48 h-48"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-600 mt-2">
                                    Scan to verify credential #{credential.tokenId}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-gray-700">Verification Link:</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      value={`${window.location.origin}/verify?token=${credential.tokenId}`}
                                      readOnly
                                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          `${window.location.origin}/verify?token=${credential.tokenId}`,
                                        )
                                      }}
                                    >
                                      Copy
                                    </Button>
                                  </div>
                                </div>

                                <Button
                                  variant="outline"
                                  className="w-full bg-transparent"
                                  onClick={() =>
                                    window.open(
                                      `${window.location.origin}/verify?token=${credential.tokenId}`,
                                      "_blank",
                                    )
                                  }
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open Verification Page
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
