import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Blockchain-Verified
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Academic Credentials
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Universities issue tamper-proof digital degrees as NFTs on Ethereum. Secure, verifiable, and instantly
            accessible academic credentials for the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/university">Issue Credential</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/verify">Verify Credential</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Secured</h3>
            <p className="text-gray-600">
              Credentials stored on Ethereum blockchain ensure immutable and tamper-proof verification.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Verification</h3>
            <p className="text-gray-600">
              Verify any credential instantly using just the token ID. No need for lengthy verification processes.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">IPFS Storage</h3>
            <p className="text-gray-600">
              Credential documents stored on IPFS for decentralized, permanent, and accessible storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
