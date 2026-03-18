import User from "../../domain/models/User.js";

/*
CREATE USER
*/
export async function createUser(data) {
  return User.create(data);
}

/*
FIND BY EMAIL
*/
export async function getUserByEmail(email) {
  return User.findOne({ email });
}

/*
FIND BY ID
*/
export async function getUserById(id) {
  return User.findById(id);
}