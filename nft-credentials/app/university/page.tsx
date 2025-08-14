"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UniversityPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to domain verification page
    router.push("/university/verify-domain")
  }, [router])

  return null
}
