import bcrypt from "bcrypt";
import User from "../models/User.js";

export const signup = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    authProvider: "local",
  });

  return user;
};

export const login = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const logout = async (req) => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) return reject(err);

      req.session.destroy((err) => {
        if (err) return reject(err);

        resolve();
      });
    });
  });
};

export const getCurrentUser = async (req) => {
  return req.user;
};