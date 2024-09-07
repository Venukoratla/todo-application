import connection from "../db.js";

export const addTodo = (req, res) => {
  const { name, description, status } = req.body;
  if (!name) {
    res.status(400).json({ message: "Name required" });
  }
  try {
    connection.query(
      `INSERT INTO todos (name,description,status) VALUES (?,?,?);`,
      [name, description, status],
      (err, result) => {
        if (err) {
          res.status(400).json({ message: "Error while inserting todo" });
        } else {
          res.status(200).json({ message: "todo Inserted" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPendingTodos = (req, res) => {
  try {
    connection.query(`SELECT * FROM todos WHERE status = 0`, (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error while getting todo" });
      } else {
        res.status(200).json({ message: "todo list", data: result });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProgressTodos = (req, res) => {
  try {
    connection.query(`SELECT * FROM todos WHERE status = 1`, (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error while getting todo" });
      } else {
        res.status(200).json({ message: "todo list", data: result });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompletedTodos = (req, res) => {
  try {
    connection.query(`SELECT * FROM todos WHERE status = 2`, (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error while getting todo" });
      } else {
        res.status(200).json({ message: "todo list", data: result });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTodoById = (req, res) => {
  const { id } = req.params;
  try {
    connection.query(
      `SELECT * FROM todos WHERE id = ?`,
      [id],
      (err, result) => {
        if (err) {
          res.status(400).json({ message: "Error while getting todo" });
        } else {
          res.status(200).json({ message: "todo", data: result[0] });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodoToPending = (req, res) => {
  const { id } = req.params;

  console.log("controller called ", id);

  try {
    connection.query(
      `UPDATE todos SET status = ? WHERE id = ?;`,
      [0, id],
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({ message: "Error while updating todo" });
        } else {
          res.status(200).json({ message: "todo updated" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodoToInProgress = (req, res) => {
  const { id } = req.params;

  try {
    connection.query(
      `UPDATE todos SET status = ? WHERE id = ?;`,
      [1, id],
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({ message: "Error while updating todo" });
        } else {
          res.status(200).json({ message: "todo updated" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodoToComplete = (req, res) => {
  const { id } = req.params;

  try {
    connection.query(
      `UPDATE todos SET status = ? WHERE id = ?;`,
      [2, id],
      (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({ message: "Error while updating todo" });
        } else {
          res.status(200).json({ message: "todo updated" });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;

  try {
    connection.query(`DELETE FROM todos WHERE id = ?`, [id], (err, result) => {
      if (err) {
        res.status(400).json({ message: "Error while deleting todo" });
      } else {
        res.status(200).json({
          message: "Todo Deleted",
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
