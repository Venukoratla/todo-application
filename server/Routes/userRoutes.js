import express from "express";
import { loginUser, registerUser } from "../Controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/register-user", registerUser);
userRouter.post("/login", loginUser);
