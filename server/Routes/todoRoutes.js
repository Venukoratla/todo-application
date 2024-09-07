import express from "express";
import { authUser } from "../Middlewares/auth.js";
import {
  addTodo,
  deleteTodo,
  getCompletedTodos,
  getPendingTodos,
  getProgressTodos,
  getTodoById,
  updateTodoToComplete,
  updateTodoToInProgress,
  updateTodoToPending,
} from "../Controllers/todoController.js";

export const todoRouter = express.Router();

todoRouter.post("/add-todo", authUser, addTodo);
todoRouter.get("/get-pending-todos", authUser, getPendingTodos);
todoRouter.get("/get-progress-todos", authUser, getProgressTodos);
todoRouter.get("/get-completed-todos", authUser, getCompletedTodos);
todoRouter.get("/get-todo/:id", authUser, getTodoById);
todoRouter.put("/update-todo-pending/:id", authUser, updateTodoToPending);
todoRouter.put(
  "/update-todo-in-progress/:id",
  authUser,
  updateTodoToInProgress
);
todoRouter.put("/update-todo-complete/:id", authUser, updateTodoToComplete);

todoRouter.delete("/delete-todo/:id", authUser, deleteTodo);
