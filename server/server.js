import express from "express";
import dotenv from "dotenv";
import connection from "./db.js";
import { usersTable } from "./Models/userTable.js";
import { todosTable } from "./Models/todoTable.js";
import { userRouter } from "./Routes/userRoutes.js";
import { todoRouter } from "./Routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening at ${PORT}`);
  }
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
    connection.query(usersTable, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("users table created ");
        connection.query(todosTable, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("todos table created ");
          }
        });
      }
    });
  }
});

app.use("/api/v1/", userRouter);
app.use("/api/v1/", todoRouter);
