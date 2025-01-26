import { sendResponse } from "../middlewares/response.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendResponse(
        res,
        400,
        "Username, email, and password are required"
      );
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return sendResponse(res, 409, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return sendResponse(res, 201, "User registered successfully", {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, "Email and password are required");
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return sendResponse(res, 401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return sendResponse(res, 401, "Invalid email or password");
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return sendResponse(res, 200, "Login successful", { token });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, 400, "User ID is missing from the token");
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    return sendResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};
