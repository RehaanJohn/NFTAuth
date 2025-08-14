import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { put } from "@vercel/blob"
import crypto from "crypto"

const sql = neon(process.env.DATABASE_URL!)

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    console.log("Starting credential issuance process...")

    const formData = await request.formData()

    const studentName = formData.get("studentName") as string
    const studentEmail = formData.get("studentEmail") as string
    const studentWallet = formData.get("studentWallet") as string
    const universityName = formData.get("universityName") as string
    const degreeTitle = formData.get("degreeTitle") as string
    const graduationDate = formData.get("graduationDate") as string
    const pdfFile = formData.get("pdfFile") as File

    if (!pdfFile) {
      console.error("No PDF file provided")
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 })
    }

    if (pdfFile.size > MAX_FILE_SIZE) {
      console.error(`File too large: ${pdfFile.size} bytes`)
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    if (pdfFile.type !== "application/pdf") {
      console.error(`Invalid file type: ${pdfFile.type}`)
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 })
    }

    console.log(`Processing PDF file: ${pdfFile.name}, size: ${pdfFile.size} bytes`)

    const hashInput = `${studentWallet}-${studentEmail}-${degreeTitle}-${Date.now()}`
    const fullHash = crypto.createHash("sha256").update(hashInput).digest("hex")
    const hash = fullHash.substring(0, 8).toUpperCase()

    console.log(`Generated hash: ${hash}`)

    // Generate simulated NFT data
    const nftTokenId = `NFT_${Date.now()}`
    const txHash = `0x${crypto.randomBytes(32).toString("hex")}`

    console.log("Uploading PDF to Blob storage...")

    const uploadPromise = put(`credentials/${hash}-${pdfFile.name}`, pdfFile, {
      access: "public",
    })

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Upload timeout")), 30000))

    const blob = (await Promise.race([uploadPromise, timeoutPromise])) as any

    console.log(`PDF uploaded successfully: ${blob.url}`)

    console.log("Inserting credential into database...")

    const result = await sql`
      INSERT INTO credentials (
        hash,
        student_wallet_address,
        student_name,
        student_email,
        university_name,
        degree_title,
        graduation_date,
        pdf_filename,
        pdf_url,
        nft_token_id,
        blockchain_tx_hash
      ) VALUES (
        ${hash},
        ${studentWallet.toLowerCase()},
        ${studentName},
        ${studentEmail},
        ${universityName},
        ${degreeTitle},
        ${graduationDate},
        ${pdfFile.name},
        ${blob.url},
        ${nftTokenId},
        ${txHash}
      ) RETURNING *
    `

    console.log(`Credential inserted successfully with hash: ${hash}`)

    return NextResponse.json({
      success: true,
      hash,
      studentWallet: studentWallet.toLowerCase(),
      nftTokenId,
      txHash,
      pdfUrl: blob.url,
      message: "Credential issued successfully",
    })
  } catch (error) {
    console.error("Detailed error issuing credential:", error)

    if (error instanceof Error) {
      if (error.message === "Upload timeout") {
        return NextResponse.json(
          {
            error: "File upload timed out. Please try with a smaller file or check your connection.",
          },
          { status: 408 },
        )
      }

      if (error.message.includes("duplicate key")) {
        return NextResponse.json(
          {
            error: "A credential with this information already exists.",
          },
          { status: 409 },
        )
      }
    }

    return NextResponse.json(
      {
        error: "Failed to issue credential. Please try again.",
      },
      { status: 500 },
    )
  }
}
