import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Database, ArrowRight, CheckCircle, Globe } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300 mb-6 animate-slide-up">
            <Shield className="w-4 h-4 mr-2" />
            Blockchain-Powered Academic Verification
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Blockchain-Verified
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-pulse">
              Academic Credentials
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Universities issue <span className="font-semibold text-blue-600 dark:text-blue-400">tamper-proof digital degrees</span> as NFTs on Ethereum. 
            Secure, verifiable, and instantly accessible academic credentials for the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <Link href="/university" className="flex items-center">
                Issue Credential
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <Link href="/verify" className="flex items-center">
                <CheckCircle className="mr-2 w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                Verify Credential
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400 animate-fade-in">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-500" />
              Ethereum Secured
            </div>
            <div className="flex items-center">
              <Database className="w-4 h-4 mr-2 text-blue-500" />
              IPFS Decentralized
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-purple-500" />
              Globally Accessible
            </div>
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            <div className="relative text-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-600">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Blockchain Secured
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Credentials stored on Ethereum blockchain ensure <span className="font-semibold text-blue-600 dark:text-blue-400">immutable and tamper-proof</span> verification.
              </p>
              <div className="mt-4 text-xs text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more →
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            <div className="relative text-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-purple-200 dark:group-hover:border-purple-600">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Instant Verification
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Verify any credential <span className="font-semibold text-purple-600 dark:text-purple-400">instantly</span> using just the token ID. No need for lengthy verification processes.
              </p>
              <div className="mt-4 text-xs text-purple-600 dark:text-purple-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Try verification →
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            <div className="relative text-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group-hover:border-green-200 dark:group-hover:border-green-600">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                IPFS Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Credential documents stored on IPFS for <span className="font-semibold text-green-600 dark:text-green-400">decentralized, permanent,</span> and accessible storage.
              </p>
              <div className="mt-4 text-xs text-green-600 dark:text-green-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore storage →
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-24 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Institutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join the future of academic verification
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Credentials Issued" },
              { number: "150+", label: "Universities" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Verification" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Academic Verification?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of institutions already using blockchain technology for secure, instant credential verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href="/university">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Link href="/verify">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}