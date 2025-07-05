import bcrypt from "bcrypt"

async function comparePasswords(plaintextPassword: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false; // Or handle the error as appropriate for your application
  }
}

export default comparePasswords