-- Insert sample credential data for testing
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
  'abc123def456789012345678901234567890123456789012345678901234567890',
  '0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e5e5',
  'John Smith',
  'john.smith@email.com',
  'MIT',
  'Bachelor of Science in Computer Science',
  '2024-05-15',
  'john_smith_diploma.pdf',
  'https://ipfs.io/ipfs/QmSampleHashForJohnSmithDiploma',
  'NFT_001',
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
) ON CONFLICT (hash) DO NOTHING;

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
  'xyz789abc123456789012345678901234567890123456789012345678901234567890',
  '0x8ba1f109551bD432803012645Hac136c30C6e5e5',
  'Sarah Johnson',
  'sarah.johnson@email.com',
  'Stanford University',
  'Master of Business Administration',
  '2024-06-20',
  'sarah_johnson_diploma.pdf',
  'https://ipfs.io/ipfs/QmSampleHashForSarahJohnsonDiploma',
  'NFT_002',
  '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
) ON CONFLICT (hash) DO NOTHING;
