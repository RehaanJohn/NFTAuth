"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  GraduationCap,
  Calendar,
  Shield,
  ExternalLink,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
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

export default function StudentPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState<CredentialData[]>([])
  const [error, setError] = useState("")
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([])
  const [showAccountSelector, setShowAccountSelector] = useState(false)
  const { toast } = useToast()

  const connectWallet = async () => {
    setIsLoading(true)
    setError("")

    try {
      if (typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAvailableAccounts(accounts)

        if (accounts.length > 1) {
          setShowAccountSelector(true)
        } else {
          selectAccount(accounts[0])
        }
      } else {
        // Fallback for demo - simulate multiple accounts
        const mockAccounts = [
          "0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e5e5",
          "0x8ba1f109551bD432803012645Hac136c22C501e5",
          "0x1234567890123456789012345678901234567890",
        ]
        setAvailableAccounts(mockAccounts)
        setShowAccountSelector(true)
      }
    } catch (error) {
      setError("Failed to connect wallet. Please try again.")
      toast({
        title: "Connection Failed",
        description: "Unable to connect to MetaMask wallet.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectAccount = async (address: string) => {
    setWalletAddress(address)
    setIsConnected(true)
    setShowAccountSelector(false)

    toast({
      title: "Wallet Connected!",
      description: `Connected to ${address}`,
    })

    // Fetch credentials for this wallet
    await fetchCredentials(address)
  }

  const switchAccount = () => {
    setShowAccountSelector(true)
  }

  const fetchCredentials = async (address: string) => {
    try {
      const response = await fetch(`/api/credentials/wallet?address=${encodeURIComponent(address)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch credentials")
      }

      const data = await response.json()
      setCredentials(data.credentials || [])
    } catch (error) {
      console.error("Error fetching credentials:", error)
      setError("Failed to load credentials.")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setIsConnected(false)
    setCredentials([])
    setError("")
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard.",
    })
  }

  const viewPDF = (pdfUrl: string, filename: string) => {
    window.open(pdfUrl, "_blank")
    toast({
      title: "Opening Document",
      description: `Opening ${filename} in a new tab.`,
    })
  }

  const downloadPDF = (pdfUrl: string, filename: string) => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Download Started",
      description: `Downloading ${filename}`,
    })
  }

  if (showAccountSelector && availableAccounts.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Wallet className="w-16 h-16 text-purple-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Select Wallet Account</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Choose which account you want to connect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableAccounts.map((account, index) => (
                <Card
                  key={account}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => selectAccount(account)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Account {index + 1}</p>
                        <p className="text-sm font-mono text-gray-600 break-all">{account}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={() => setShowAccountSelector(false)} className="w-full">
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Wallet className="w-16 h-16 text-purple-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Student Dashboard</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Connect your MetaMask wallet to view your academic credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">How it works:</h3>
                <ul className="text-left text-blue-800 space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Connect your MetaMask wallet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>View all your blockchain-verified diplomas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Share verification hashes with employers</span>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <Button onClick={connectWallet} disabled={isLoading} size="lg" className="w-full">
                {isLoading ? (
                  <>Connecting...</>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask Wallet
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500">
                Make sure you have MetaMask installed and are connected to the Sepolia testnet
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Wallet Connected</CardTitle>
                  <CardDescription className="font-mono text-sm break-all">{walletAddress}</CardDescription>
                </div>
              </div>
              <div className="flex space-x-2">
                {availableAccounts.length > 1 && (
                  <Button variant="outline" onClick={switchAccount}>
                    Switch Account
                  </Button>
                )}
                <Button variant="outline" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Credentials Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Academic Credentials</h2>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {credentials.length} Credential{credentials.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {credentials.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Credentials Found</h3>
                <p className="text-gray-500">No academic credentials have been issued to this wallet address yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {credentials.map((credential) => (
                <Card key={credential.id} className="border-2 hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{credential.degree_title}</CardTitle>
                        <CardDescription className="text-base font-medium text-purple-600">
                          {credential.university_name}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Graduate</p>
                        <p className="font-medium">{credential.student_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Graduation Date</p>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="font-medium">{formatDate(credential.graduation_date)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Verification Hash</p>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 text-xs font-mono bg-gray-100 px-2 py-1 rounded break-all">
                          {credential.hash}
                        </code>
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(credential.hash)}>
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">NFT Token ID</p>
                      <code className="block text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                        {credential.nft_token_id}
                      </code>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => viewPDF(credential.pdf_url, credential.pdf_filename)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => downloadPDF(credential.pdf_url, credential.pdf_filename)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Issued: {formatDate(credential.issued_at)} • Verified {credential.verified_count} times
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
