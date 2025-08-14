import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Shield, Wallet, Building2, CheckCircle, ArrowRight, Zap, Globe, Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Powered by Ethereum & IPFS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Blockchain-Verified
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Academic Credentials
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A decentralized system where universities issue blockchain-verified academic credentials as non-transferable
            NFTs. Verifiers can instantly confirm authenticity without needing a wallet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-blue-600 text-white hover:bg-blue-700">
              <Link href="/university">
                <Building2 className="w-5 h-5 mr-2" />
                Issue Credentials
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Link href="/verify">
                <Shield className="w-5 h-5 mr-2" />
                Verify Credentials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How NFTAuth Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to secure, verify, and access your academic credentials on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Universities Issue</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Universities upload diploma PDFs and student information to mint NFT credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Secure PDF storage on IPFS</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Unique verification hash</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>NFT sent to student wallet</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-200 bg-white hover:border-green-300 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Employers Verify</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Employers enter verification hash to instantly confirm credential authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>No wallet required</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Instant verification</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Complete credential details</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Students Access</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Students connect their wallet to view all their blockchain-verified diplomas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>MetaMask integration</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>All credentials in one place</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Easy hash sharing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose NFTAuth?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on Ethereum with cutting-edge blockchain technology for maximum security and trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Tamper-Proof</h3>
              <p className="text-gray-600">Credentials stored on blockchain cannot be altered or forged</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Instant Verification</h3>
              <p className="text-gray-600">Verify credentials in seconds without contacting institutions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Global Access</h3>
              <p className="text-gray-600">Access credentials anywhere in the world, anytime</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Student Owned</h3>
              <p className="text-gray-600">Students have full control over their academic credentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Academic Future?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the revolution in academic credential verification with blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/student">
                <Wallet className="w-5 h-5 mr-2" />
                Connect Your Wallet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/verify">
                <Shield className="w-5 h-5 mr-2" />
                Verify a Credential
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
