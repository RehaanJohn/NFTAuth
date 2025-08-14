export interface Credential {
  tokenId: string
  recipientAddress: string
  studentName: string
  studentId: string
  degreeName: string
  fieldOfStudy: string
  universityName: string
  issuerAddress: string
  dateIssued: string
  ipfsHash: string
  status: "verified" | "revoked"
  revokedDate?: string
  revokedReason?: string
}

export interface MintCredentialData {
  studentWallet: string
  studentName: string
  studentId: string
  degreeName: string
  fieldOfStudy: string
  dateIssued: string
  pdfFile?: File
}

export interface WalletConnection {
  address: string
  isConnected: boolean
  chainId: number
}

export interface VerificationResult {
  isValid: boolean
  credential?: Credential
  error?: string
}

export interface IPFSUploadResult {
  hash: string
  url: string
}
