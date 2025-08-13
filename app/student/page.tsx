"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Wallet, GraduationCap, Share2, ExternalLink, CheckCircle, Eye, ArrowRight } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 animate-slide-up">
            Student
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            View and manage your blockchain-verified academic credentials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Wallet Connection */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Wallet</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Connect your wallet to view credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isWalletConnected ? (
                  <Button
                    onClick={connectWallet}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Connect MetaMask
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 justify-center">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Wallet Connected</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-center">
                      0x742d...8D4
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                      <strong>{mockStudentCredentials.length}</strong> credentials found
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {isWalletConnected && (
              <Card className="mt-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white text-center">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-gray-600 dark:text-gray-300">Total Credentials</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{mockStudentCredentials.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-gray-600 dark:text-gray-300">Verified</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {mockStudentCredentials.filter((c) => c.status === "verified").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <span className="text-gray-600 dark:text-gray-300">Universities</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{new Set(mockStudentCredentials.map((c) => c.issuer)).size}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content - Credentials List */}
          <div className="lg:col-span-3">
            {!isWalletConnected ? (
              <Card className="h-96 flex items-center justify-center bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect your wallet to view your academic credentials
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Credentials</h2>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {mockStudentCredentials.length} credentials
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockStudentCredentials.map((credential) => (
                    <div key={credential.tokenId} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <Card className="relative p-6 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-600">
                        <CardHeader className="p-0 mb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                                #{credential.tokenId}
                              </Badge>
                            </div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mt-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {credential.degreeName}
                          </CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-300">
                            {credential.fieldOfStudy}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                              <span>Issuer:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">{credential.issuer}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                              <span>Date Issued:</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
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
                              asChild
                              variant="outline"
                              size="sm"
                              className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:-translate-y-0.5 transition-all duration-300 group"
                            >
                              <Link href="#" onClick={() => viewCredential(credential)} className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedCredential(credential)}
                                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:-translate-y-0.5 transition-all duration-300 group"
                                >
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Share Credential</DialogTitle>
                                  <DialogDescription className="text-gray-600 dark:text-gray-300">
                                    Share this credential using the QR code or verification link
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6 text-center">
                                  <div className="inline-block bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner">
                                    <img
                                      src={generateQRCode(credential.tokenId) || "/placeholder.svg"}
                                      alt={`QR code for credential ${credential.tokenId}`}
                                      className="w-48 h-48"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Scan to verify credential #{credential.tokenId}
                                  </p>

                                  <div className="space-y-2 text-left">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                      Verification Link:
                                    </label>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        value={`${window.location.origin}/verify?token=${credential.tokenId}`}
                                        readOnly
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                      />
                                      <Button
                                        size="sm"
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            `${window.location.origin}/verify?token=${credential.tokenId}`,
                                          )
                                        }}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-md"
                                      >
                                        Copy
                                      </Button>
                                    </div>
                                  </div>

                                  <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() =>
                                      window.open(
                                        `${window.location.origin}/verify?token=${credential.tokenId}`,
                                        "_blank",
                                      )
                                    }
                                  >
                                    <Link href="#" className="flex items-center">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Open Verification Page
                                    </Link>
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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