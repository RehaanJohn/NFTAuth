"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Shield,
  Calendar,
  GraduationCap,
  User,
  Mail,
  Wallet,
  Hash,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CredentialData {
  id: number
  hash: string
  student_wallet_address: string
  student_name: string
  student_email: string
  university_name: string
  degree_title: string
  graduation_date: string
  pdf_filename: string
  pdf_url: string
  nft_token_id: string
  blockchain_tx_hash: string
  issued_at: string
  verified_count: number
}

export default function VerifyPage() {
  const [hashInput, setHashInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [credential, setCredential] = useState<CredentialData | null>(null)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hashInput.trim()) return

    setIsLoading(true)
    setError("")
    setCredential(null)

    try {
      const response = await fetch(`/api/credentials/verify?hash=${encodeURIComponent(hashInput.trim())}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("Credential not found. Please check the hash and try again.")
        } else {
          throw new Error("Verification failed")
        }
        return
      }

      const data = await response.json()
      setCredential(data.credential)

      toast({
        title: "Credential Verified!",
        description: "The credential is authentic and valid.",
      })
    } catch (error) {
      setError("Failed to verify credential. Please try again.")
      toast({
        title: "Verification Error",
        description: "Unable to verify the credential.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const viewPDF = (pdfUrl: string, filename: string) => {
    window.open(pdfUrl, "_blank")
    toast({
      title: "Opening Document",
      description: `Opening ${filename} in a new tab.`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Credential Verification</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Enter the verification hash to confirm the authenticity of an academic credential
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash">Verification Hash</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hash"
                      value={hashInput}
                      onChange={(e) => setHashInput(e.target.value)}
                      placeholder="Enter the 8-character verification hash..."
                      className="pl-10"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Verifying...</>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {credential && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-2xl text-green-800">Credential Verified</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Authentic
                </Badge>
              </div>
              <CardDescription className="text-green-700">
                This credential has been verified {credential.verified_count + 1} time(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Information */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                    <p className="text-lg font-medium">{credential.student_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Email Address</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-lg">{credential.student_email}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Wallet Address</Label>
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-gray-400" />
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all">
                        {credential.student_wallet_address}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  Academic Credential
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">University</Label>
                    <p className="text-lg font-medium">{credential.university_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Graduation Date</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-lg">{formatDate(credential.graduation_date)}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-600">Degree Title</Label>
                    <p className="text-lg font-medium">{credential.degree_title}</p>
                  </div>
                </div>
              </div>

              {/* Blockchain Information */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Blockchain Verification
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">NFT Token ID</Label>
                    <code className="block text-sm font-mono bg-gray-100 px-3 py-2 rounded mt-1">
                      {credential.nft_token_id}
                    </code>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Transaction Hash</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 text-sm font-mono bg-gray-100 px-3 py-2 rounded break-all">
                        {credential.blockchain_tx_hash}
                      </code>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Verification Hash</Label>
                    <code className="block text-sm font-mono bg-gray-100 px-3 py-2 rounded mt-1 break-all">
                      {credential.hash}
                    </code>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Issued Date</Label>
                    <p className="text-sm text-gray-700 mt-1">{formatDate(credential.issued_at)}</p>
                  </div>
                </div>
              </div>

              {/* Document Access */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Document Access</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{credential.pdf_filename}</p>
                    <p className="text-sm text-gray-600">Original diploma document stored securely</p>
                  </div>
                  <Button variant="outline" onClick={() => viewPDF(credential.pdf_url, credential.pdf_filename)}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
