import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const hash = searchParams.get("hash")

    if (!hash) {
      return NextResponse.json({ error: "Hash parameter is required" }, { status: 400 })
    }

    // Find credential by hash
    const result = await sql`
      SELECT * FROM credentials 
      WHERE hash = ${hash}
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Credential not found" }, { status: 404 })
    }

    const credential = result[0]

    // Update verification count
    await sql`
      UPDATE credentials 
      SET verified_count = verified_count + 1 
      WHERE hash = ${hash}
    `

    // Log verification attempt
    await sql`
      INSERT INTO verifications (credential_hash, verifier_info)
      VALUES (${hash}, ${JSON.stringify({ timestamp: new Date().toISOString(), ip: request.ip })})
    `

    return NextResponse.json({
      success: true,
      credential,
      message: "Credential verified successfully",
    })
  } catch (error) {
    console.error("Error verifying credential:", error)
    return NextResponse.json({ error: "Failed to verify credential" }, { status: 500 })
  }
}
