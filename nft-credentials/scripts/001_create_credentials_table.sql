-- Create credentials table to store academic credentials as NFT data
CREATE TABLE IF NOT EXISTS credentials (
  id SERIAL PRIMARY KEY,
  hash VARCHAR(64) UNIQUE NOT NULL, -- Unique hash for verification
  student_wallet_address VARCHAR(42) NOT NULL, -- Ethereum wallet address
  student_name VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  university_name VARCHAR(255) NOT NULL,
  degree_title VARCHAR(255) NOT NULL,
  graduation_date DATE NOT NULL,
  pdf_filename VARCHAR(255),
  pdf_url TEXT, -- IPFS or storage URL for the PDF
  nft_token_id VARCHAR(100), -- Simulated NFT token ID
  blockchain_tx_hash VARCHAR(66), -- Simulated transaction hash
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_count INTEGER DEFAULT 0
);

-- Create verifications table to track verification attempts
CREATE TABLE IF NOT EXISTS verifications (
  id SERIAL PRIMARY KEY,
  credential_hash VARCHAR(64) NOT NULL,
  verifier_info JSONB, -- Store verifier details (employer, etc.)
  verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (credential_hash) REFERENCES credentials(hash)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_credentials_hash ON credentials(hash);
CREATE INDEX IF NOT EXISTS idx_credentials_wallet ON credentials(student_wallet_address);
CREATE INDEX IF NOT EXISTS idx_verifications_hash ON verifications(credential_hash);
