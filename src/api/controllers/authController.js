import {
  registerUser,
  loginUser
} from "../../application/services/authService.js";

/*
POST /api/auth/register
*/
export async function register(req, res, next) {
  try {

    const user = await registerUser(req.body);

    res.status(201).json(user);

  } catch (error) {
    next(error);
  }
}

/*
POST /api/auth/login
*/
export async function login(req, res, next) {
  try {

    const data = await loginUser(req.body);

    res.json(data);

  } catch (error) {
    next(error);
  }
}