import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../../infrastructure/repositories/userRepository.js";

const JWT_SECRET = "supersecret";

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

  return user;
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

  return { token, user };
}