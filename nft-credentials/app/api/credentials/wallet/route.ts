import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get("address")

    if (!address) {
      return NextResponse.json({ error: "Wallet address parameter is required" }, { status: 400 })
    }

    console.log(`Looking up credentials for wallet address: ${address}`)

    const result = await sql`
      SELECT * FROM credentials 
      WHERE LOWER(student_wallet_address) = LOWER(${address})
      ORDER BY issued_at DESC
    `

    console.log(`Found ${result.length} credentials for address: ${address}`)

    return NextResponse.json({
      success: true,
      credentials: result,
      count: result.length,
    })
  } catch (error) {
    console.error("Error fetching wallet credentials:", error)
    return NextResponse.json({ error: "Failed to fetch credentials" }, { status: 500 })
  }
}
