import React, { useEffect, useState } from "react";
import Inprogress from "../components/Inprogress";
import Droparea from "../components/Droparea";
import Completedtask from "./Completedtask";
function HomePage() {
  const [show, setShow] = useState(false); //This is used to show form field
  const [completedTasks, setCompletedTasks] = useState([]);
  const [todo, setTodo] = useState({
    name: "",
    description: "",
    status: 0,
  });
  const [inProgressTasks, setInProgressTasks] = useState([]);

  const [pendingTasks, setPendingTasks] = useState([]); //This is used to add task into pending tasks
  const [draggableCard, setDraggbleCard] = useState(null); //This is used to store draggable card id

  //This function is called when user click on start button
  const handleMoveToInProgress = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}update-todo-in-progress/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        getTodos();
        getCompletedTodos();
        getProgressTodos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //This function is used to handle to submission of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todo),
      });
      const data = await response.json();
      if (response.ok) {
        setTodo({
          name: "",
          description: "",
          status: 0,
        });
        getTodos();
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
    setShow(!show);
  };
  //This function is used to handle to show or hide the from
  const handlePlus = () => {
    setShow(!show);
  };

  const status = 0; //This is used to status of column

  //This function is used to remove dragged item from dragged array
  // const removeDragElement = (a, b) => {
  //   console.log(" a value is " + a + "-----b value is " + b);
  //   if (a === "" || a === undefined || a === null) {
  //     console.log(a + "so b value is " + b);
  //   } else if (a === "pending") {
  //     let indexToRemove = pendingTasks.findIndex((item) => item.id === b);
  //     if (indexToRemove !== -1) {
  //       pendingTasks.splice(indexToRemove, 1);
  //     }
  //   } else if (a === "inProgress") {
  //     let indexToRemove = inProgressTasks.findIndex((item) => item.id === b);
  //     if (indexToRemove !== -1) {
  //       inProgressTasks.splice(indexToRemove, 1);
  //     }
  //   } else if (a === "completed") {
  //     let indexToRemove = completedTasks.findIndex((item) => item.id === b);
  //     if (indexToRemove !== -1) {
  //       completedTasks.splice(indexToRemove, 1);
  //     }
  //   }
  // };
  //This function is used to handle onDrop

  const updateTodoStatus = async (url, taskId, status) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Optionally, refresh the todos based on the status
        getTodos();
        getCompletedTodos();
        getProgressTodos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onDrop = async (status, taskId) => {
    const updateUrlMap = {
      0: `${process.env.REACT_APP_URL}update-todo-pending/${draggableCard}`,
      1: `${process.env.REACT_APP_URL}update-todo-in-progress/${draggableCard}`,
      2: `${process.env.REACT_APP_URL}update-todo-complete/${draggableCard}`,
    };

    await updateTodoStatus(updateUrlMap[status], taskId, status);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const getTodos = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}get-pending-todos`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPendingTasks(data.data);
      } else {
        alert("error while getting data");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getCompletedTodos = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}get-completed-todos`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCompletedTasks(data.data);
      } else {
        alert("error while getting data");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getProgressTodos = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}get-progress-todos`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setInProgressTasks(data.data);
      } else {
        alert("error while getting data");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}delete-todo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        getProgressTodos();
        getTodos();
        getCompletedTodos();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTodos();
    getCompletedTodos();
    getProgressTodos();
  }, []);

  return (
    <div className="App">
      <h1>Dynamic ToDo-List</h1>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <button onClick={handlePlus} className="add-task">
          Add Task
        </button>
      </div>
      {show && (
        <div className="add-task-container">
          <form className="toggleForm" onSubmit={handleSubmit}>
            <input
              type="text"
              value={todo.name}
              name="name"
              placeholder="Enter task..."
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              value={todo.description}
              placeholder="Enter task description..."
              onChange={handleChange}
            />
            <button type="submit" className="task-add-button">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="sectionCategories">
        <div className="section">
          <h2>Pending</h2>
          <Droparea onDrop={() => onDrop(status, draggableCard)} />
          {pendingTasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <div
                key={task.id}
                className="taskContainer"
                draggable
                onDragStart={() => {
                  setDraggbleCard(task.id);
                }}
                onDragEnd={() => {
                  setDraggbleCard(null);
                }}
              >
                <div className="taskItem">
                  <h3 className="aboutTask">{task.name}</h3>
                  <p className="aboutTask">{task.description}</p>
                </div>
                <button
                  className="start-button"
                  onClick={() => handleMoveToInProgress(task.id)}
                >
                  Start
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
              <Droparea onDrop={() => onDrop(status)} id={task.id} />
            </React.Fragment>
          ))}
        </div>
        <Inprogress
          inProgressTasks={inProgressTasks}
          setDraggbleCard={setDraggbleCard}
          onDrop={onDrop}
          getProgressTodos={getProgressTodos}
          getCompletedTodos={getCompletedTodos}
          getTodos={getTodos}
        />
        <Completedtask
          completedTasks={completedTasks}
          setDraggbleCard={setDraggbleCard}
          onDrop={onDrop}
          getProgressTodos={getProgressTodos}
          getCompletedTodos={getCompletedTodos}
          getTodos={getTodos}
        />
      </div>
    </div>
  );
}
export default HomePage;
