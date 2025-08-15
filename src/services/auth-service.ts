import bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword({
  plainPassword,
  hashedPassword,
}: {
  plainPassword: string;
  hashedPassword: string;
}) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}
