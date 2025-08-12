import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="font-bold text-xl">NFT Credentials</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Blockchain-verified academic credentials using NFT technology. Secure, tamper-proof, and instantly
              verifiable digital degrees.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/university" className="text-gray-400 hover:text-white transition-colors">
                  University Dashboard
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-400 hover:text-white transition-colors">
                  Verify Credential
                </Link>
              </li>
              <li>
                <Link href="/student" className="text-gray-400 hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Technology</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Ethereum Blockchain</li>
              <li>IPFS Storage</li>
              <li>Soulbound Tokens</li>
              <li>Smart Contracts</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NFT Credentials. Built for academic verification demo.</p>
        </div>
      </div>
    </footer>
  )
}
