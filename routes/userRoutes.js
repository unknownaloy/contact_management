import { Router } from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

export const userRoutes = new Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/current", validateToken, currentUser);
