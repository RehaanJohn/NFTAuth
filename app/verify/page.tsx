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

    // Simulate API call delay
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Academic Credential</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter a token ID to instantly verify the authenticity of any blockchain-issued academic credential
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Credential Verification
            </CardTitle>
            <CardDescription>
              Enter the token ID found on the digital credential to verify its authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tokenId">Token ID</Label>
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              {isLoading ? "Verifying..." : "Verify Credential"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Result</CardTitle>
            </CardHeader>
            <CardContent>
              {verificationResult ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center gap-3">
                    {verificationResult.status === "verified" ? (
                      <>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">This credential is authentic and valid</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-8 w-8 text-red-600" />
                        <div>
                          <Badge variant="destructive">
                            <XCircle className="h-3 w-3 mr-1" />
                            Revoked
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">This credential has been revoked</p>
                        </div>
                      </>
                    )}
                  </div>

                  <Separator />

                  {/* Credential Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Degree</p>
                          <p className="text-gray-600">{verificationResult.degreeName}</p>
                          <p className="text-sm text-gray-500">{verificationResult.fieldOfStudy}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Student</p>
                          <p className="text-gray-600">{verificationResult.studentName}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <University className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">University</p>
                          <p className="text-gray-600">{verificationResult.universityName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Date Issued</p>
                          <p className="text-gray-600">
                            {new Date(verificationResult.dateIssued).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 mb-2">Issuer Address</p>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono break-all">
                          {verificationResult.issuerAddress}
                        </code>
                      </div>

                      <div>
                        <p className="font-medium text-gray-900 mb-2">Certificate Document</p>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://ipfs.io/ipfs/${verificationResult.ipfsHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-900 mb-2">Revocation Details</h4>
                        <p className="text-sm text-red-700 mb-1">
                          <strong>Revoked on:</strong>{" "}
                          {new Date(verificationResult.revokedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-red-700">
                          <strong>Reason:</strong> {verificationResult.revokedReason}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Credential Not Found</h3>
                  <p className="text-gray-600">
                    No credential found with token ID "{tokenId}". Please check the token ID and try again.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-2">How to verify a credential</h3>
                <ul className="text-sm text-blue-800 space-y-1">
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
