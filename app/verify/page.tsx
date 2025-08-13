"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, CheckCircle, XCircle, ExternalLink, FileText, University, User, Calendar } from "lucide-react"

// Mock verification data
const mockCredentialData: Record<string, any> = {
  "1001": {
    status: "verified",
    degreeName: "Bachelor of Computer Science",
    studentName: "Alice Johnson",
    universityName: "MIT",
    issuerAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    dateIssued: "2024-05-15",
    fieldOfStudy: "Computer Science",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  },
  "1002": {
    status: "verified",
    degreeName: "Master of Business Administration",
    studentName: "Bob Smith",
    universityName: "Harvard Business School",
    issuerAddress: "0x8ba1f109551bD432803012645Hac189451c4",
    dateIssued: "2024-06-20",
    fieldOfStudy: "Business Administration",
    ipfsHash: "QmPK1s3pNYLi9ERiq3BDxKa4XosgWwFRQUydHUtz4YgpqB",
  },
  "1003": {
    status: "revoked",
    degreeName: "PhD in Physics",
    studentName: "Carol Davis",
    universityName: "Stanford University",
    issuerAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    dateIssued: "2024-04-10",
    fieldOfStudy: "Theoretical Physics",
    ipfsHash: "QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51",
    revokedDate: "2024-07-15",
    revokedReason: "Academic misconduct",
  },
}

export default function VerifyPage() {
  const [tokenId, setTokenId] = useState("")
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const verifyCredential = async () => {
    if (!tokenId.trim()) return
    setIsLoading(true)
    setHasSearched(true)
    setTimeout(() => {
      const result = mockCredentialData[tokenId]
      setVerificationResult(result || null)
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      verifyCredential()
    }
  }

  const cardBase =
    "bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg transition-colors duration-300"

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br 
        from-blue-50 via-white to-purple-50 
        dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 
        py-12 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Verify Academic
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
              dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 
              bg-clip-text text-transparent">
              Credential
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Enter a token ID to instantly verify the authenticity of any blockchain-issued academic credential
          </p>
        </div>

        {/* Search Section */}
        <Card className={`${cardBase} mb-8`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Credential Verification
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Enter the token ID found on the digital credential to verify its authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tokenId" className="text-gray-700 dark:text-gray-200">Token ID</Label>
              <Input
                id="tokenId"
                placeholder="Enter token ID (e.g., 1001, 1002, 1003)"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg"
              />
            </div>
            <Button
              onClick={verifyCredential}
              disabled={!tokenId.trim() || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600
                text-white shadow-md"
              size="lg"
            >
              {isLoading ? "Verifying..." : "Verify Credential"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <Card className={cardBase}>
            <CardHeader>
              <CardTitle className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Verification Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              {verificationResult ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    {verificationResult.status === "verified" ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        <div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">This credential is authentic and valid</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                        <div>
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Revoked
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">This credential has been revoked</p>
                        </div>
                      </>
                    )}
                  </div>

                  <Separator />

                  {/* Credential Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Degree</p>
                          <p className="text-gray-600 dark:text-gray-300">{verificationResult.degreeName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{verificationResult.fieldOfStudy}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Student</p>
                          <p className="text-gray-600 dark:text-gray-300">{verificationResult.studentName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <University className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">University</p>
                          <p className="text-gray-600 dark:text-gray-300">{verificationResult.universityName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Date Issued</p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {new Date(verificationResult.dateIssued).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-2">Issuer Address</p>
                        <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono break-all">
                          {verificationResult.issuerAddress}
                        </code>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-2">Certificate Document</p>
                        <Button variant="outline" size="sm" asChild className="border-gray-300 dark:border-gray-600">
                          <a href={`https://ipfs.io/ipfs/${verificationResult.ipfsHash}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on IPFS
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Revocation Details */}
                  {verificationResult.status === "revoked" && (
                    <>
                      <Separator />
                      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4">
                        <h4 className="font-medium text-red-900 dark:text-red-300 mb-2">Revocation Details</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mb-1">
                          <strong>Revoked on:</strong>{" "}
                          {new Date(verificationResult.revokedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          <strong>Reason:</strong> {verificationResult.revokedReason}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Credential Not Found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No credential found with token ID "{tokenId}". Please check the token ID and try again.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className={`${cardBase} mt-8 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">How to verify a credential</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Find the token ID on the digital credential document</li>
                  <li>• Enter the token ID in the search field above</li>
                  <li>• Click "Verify Credential" to check authenticity</li>
                  <li>• View the full certificate document via the IPFS link</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
