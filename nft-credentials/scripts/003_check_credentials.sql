-- Check all credentials in the database to see wallet addresses
SELECT 
  id,
  student_name,
  student_wallet_address,
  verification_hash,
  issued_at
FROM credentials
ORDER BY issued_at DESC;

-- Also check if there are any credentials with similar wallet addresses (case insensitive)
SELECT 
  id,
  student_name,
  student_wallet_address,
  verification_hash
FROM credentials
WHERE LOWER(student_wallet_address) = LOWER('0x703783550886acdb04e1096d44a7d8a57497ddcd');
