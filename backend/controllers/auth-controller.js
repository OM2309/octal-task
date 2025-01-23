import { sendResponse } from "../middlewares/response.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return sendResponse(res, 400, "Username, email, and password are required");
  }

  try {
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
    return sendResponse(
      res,
      500,
      "An error occurred while registering the user"
    );
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, "Email and password are required");
  }

  try {
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
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return sendResponse(res, 200, "Login successful", { token });
  } catch (error) {
    console.log(error.message);
    return sendResponse(res, 500, "An error occurred during login");
  }
};
