import express from "express";
import {
  getUserById,
  login,
  register,
} from "../controllers/auth-controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-user-by-id", checkToken, getUserById);

export default router;
