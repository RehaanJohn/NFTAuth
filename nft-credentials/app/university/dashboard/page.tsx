"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, Hash, Wallet, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UniversityDashboard() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentWallet: "",
    universityName: "",
    degreeTitle: "",
    graduationDate: "",
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [issuedCredential, setIssuedCredential] = useState<any>(null)
  const [walletConnected, setWalletConnected] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState("")
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([])
  const [showAccountSelector, setShowAccountSelector] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0])
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAvailableAccounts(accounts)

        if (accounts.length > 1) {
          setShowAccountSelector(true)
        } else {
          selectAccount(accounts[0])
        }
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to MetaMask",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to continue",
        variant: "destructive",
      })
    }
  }

  const selectAccount = (address: string) => {
    setConnectedWallet(address)
    setWalletConnected(true)
    setShowAccountSelector(false)
    toast({
      title: "Wallet Connected",
      description: `Connected to ${address}`,
    })
  }

  const switchAccount = () => {
    setShowAccountSelector(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!walletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your MetaMask wallet first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      if (pdfFile) {
        submitData.append("pdfFile", pdfFile)
      }

      const response = await fetch("/api/credentials/issue", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to issue credential")
      }

      const result = await response.json()
      setIssuedCredential(result)

      toast({
        title: "Credential Issued Successfully!",
        description: `NFT sent to wallet ${formData.studentWallet}`,
      })

      // Reset form
      setFormData({
        studentName: "",
        studentEmail: "",
        studentWallet: "",
        universityName: "",
        degreeTitle: "",
        graduationDate: "",
      })
      setPdfFile(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to issue credential. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (showAccountSelector && availableAccounts.length > 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Select University Account</CardTitle>
            <CardDescription className="text-gray-600">
              Choose which account to use for issuing credentials
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
    )
  }

  if (issuedCredential) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="border-green-200 bg-white shadow-lg">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">Credential Issued Successfully!</CardTitle>
              <CardDescription className="text-green-700">
                The NFT has been minted and sent to the student's wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Verification Hash</Label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Hash className="w-4 h-4 text-gray-500" />
                    <code className="text-sm font-mono break-all text-gray-900">{issuedCredential.hash}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Student Wallet</Label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Wallet className="w-4 h-4 text-gray-500" />
                    <code className="text-sm font-mono break-all text-gray-900">{issuedCredential.studentWallet}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">NFT Token ID</Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-sm font-mono text-gray-900">{issuedCredential.nftTokenId}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Transaction Hash</Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-sm font-mono break-all text-gray-900">{issuedCredential.txHash}</code>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  onClick={() => setIssuedCredential(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Issue Another Credential
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">University Dashboard</h1>
          <p className="text-lg text-gray-600">Issue blockchain-verified academic credentials as NFTs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - MetaMask Connection */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <Wallet className="w-5 h-5" />
                <span>MetaMask Connection</span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Connect your university wallet to issue credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Wallet className={`w-5 h-5 ${walletConnected ? "text-green-600" : "text-gray-400"}`} />
                  <span className="text-gray-900">Wallet Status</span>
                </div>
                {walletConnected ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {walletConnected ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Connected Wallet</Label>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <code className="text-sm font-mono text-green-800 break-all">{connectedWallet}</code>
                    </div>
                  </div>
                  {availableAccounts.length > 1 && (
                    <Button variant="outline" onClick={switchAccount} className="w-full bg-transparent">
                      Switch Account
                    </Button>
                  )}
                </div>
              ) : (
                <Button onClick={connectWallet} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Connect MetaMask Wallet
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Credential Form */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Issue New Credential</CardTitle>
              <CardDescription className="text-gray-600">Fill in student and degree information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName" className="text-gray-700">
                      Student Name
                    </Label>
                    <Input
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentEmail" className="text-gray-700">
                      Student Email
                    </Label>
                    <Input
                      id="studentEmail"
                      name="studentEmail"
                      type="email"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      placeholder="john@email.com"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentWallet" className="text-gray-700">
                    Student Wallet Address
                  </Label>
                  <Input
                    id="studentWallet"
                    name="studentWallet"
                    value={formData.studentWallet}
                    onChange={handleInputChange}
                    placeholder="0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e5e5"
                    pattern="^0x[a-fA-F0-9]{40}$"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="universityName" className="text-gray-700">
                      University Name
                    </Label>
                    <Input
                      id="universityName"
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleInputChange}
                      placeholder="MIT"
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationDate" className="text-gray-700">
                      Graduation Date
                    </Label>
                    <Input
                      id="graduationDate"
                      name="graduationDate"
                      type="date"
                      value={formData.graduationDate}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degreeTitle" className="text-gray-700">
                    Degree Title
                  </Label>
                  <Textarea
                    id="degreeTitle"
                    name="degreeTitle"
                    value={formData.degreeTitle}
                    onChange={handleInputChange}
                    placeholder="Bachelor of Science in Computer Science"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdfFile" className="text-gray-700">
                    Upload Diploma PDF
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="pdfFile"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {pdfFile ? (
                          <>
                            <FileText className="w-8 h-8 mb-2 text-green-600" />
                            <p className="text-sm text-gray-700">{pdfFile.name}</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">Click to upload PDF</p>
                          </>
                        )}
                      </div>
                      <input
                        id="pdfFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isLoading || !walletConnected}
                >
                  {isLoading ? "Minting NFT..." : "Issue Credential & Mint NFT"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
