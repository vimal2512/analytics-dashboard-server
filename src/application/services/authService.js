import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../../infrastructure/repositories/userRepository.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/*
REGISTER
*/
export async function registerUser({ name, email, password }) {

  const existing = await userRepository.getUserByEmail(email);

  if (existing) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword
  });

  const safeUser = user.toObject
    ? user.toObject()
    : user;

  delete safeUser.password;

  return safeUser;
}

/*
LOGIN
*/
export async function loginUser({ email, password }) {

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }

  const token = jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const safeUser = user.toObject
    ? user.toObject()
    : user;

  delete safeUser.password;

  return { token, user: safeUser };
}