"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DomainVerification() {
  const [universityDomain, setUniversityDomain] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const verifyDomain = async () => {
    if (!universityDomain) {
      toast({
        title: "Error",
        description: "Please enter university domain",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate domain verification (in real app, this would check against accredited institutions)
    const accreditedDomains = ["mit.edu", "stanford.edu", "harvard.edu", "berkeley.edu", "caltech.edu"]
    const isAccredited = accreditedDomains.some((domain) => universityDomain.includes(domain))

    setTimeout(() => {
      if (isAccredited) {
        toast({
          title: "Domain Verified",
          description: "University domain is accredited. Redirecting to dashboard...",
        })
        // Redirect to university dashboard after verification
        setTimeout(() => {
          router.push("/university/dashboard")
        }, 1500)
      } else {
        toast({
          title: "Verification Failed",
          description: "University domain is not in our accredited institutions list",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto pt-16">
        <Card className="border-gray-200 bg-white shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">University Verification</CardTitle>
            <CardDescription className="text-gray-600">
              Verify your institution's domain to issue credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="universityDomain" className="text-gray-700">
                  University Domain
                </Label>
                <Input
                  id="universityDomain"
                  value={universityDomain}
                  onChange={(e) => setUniversityDomain(e.target.value)}
                  placeholder="mit.edu"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Accredited Institutions Only</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Only verified educational institutions can issue blockchain credentials through NFTAuth.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={verifyDomain}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Domain...</span>
                  </div>
                ) : (
                  "Verify University Domain"
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Supported domains: mit.edu, stanford.edu, harvard.edu, berkeley.edu, caltech.edu</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
