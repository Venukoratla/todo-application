import express from "express";
import { authUser } from "../Middlewares/auth.js";
import { addTodo } from "../Controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.post("/add-todo", authUser, addTodo);
