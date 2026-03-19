import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../../infrastructure/repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET;

// 🔥 FAIL FAST (critical)
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/*
REGISTER
*/
export async function registerUser({ name, email, password }) {

  const existing = await userRepository.getUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword
  });

  // ❌ never send password
  const { password: _, ...safeUser } = user.toObject();

  return safeUser;
}

/*
LOGIN
*/
export async function loginUser({ email, password }) {

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ❌ remove password
  const { password: _, ...safeUser } = user.toObject();

  return { token, user: safeUser };
}