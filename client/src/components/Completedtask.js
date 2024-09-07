import Droparea from "./Droparea";
import React from "react";
const Completedtask = (props) => {
  const {
    setDraggbleCard,
    onDrop,
    completedTasks,
    getProgressTodos,
    getTodos,
    getCompletedTodos,
  } = props;

  const status = 2;

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
  return (
    <div className="section">
      <h2>Completed</h2>
      <Droparea onDrop={() => onDrop(status, 0)} />
      {completedTasks?.map((task, index) => (
        <React.Fragment key={index}>
          <div
            key={task.id}
            className="complete-taskContainer"
            draggable
            onDragStart={() => {
              setDraggbleCard(task.id);
            }}
            onDragEnd={() => setDraggbleCard(null)}
          >
            <div className="taskItem">
              <h3 className="aboutTask">{task.name} </h3>
              <p className="aboutTask">{task.description} </p>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
          <Droparea onDrop={() => onDrop(status, task.id)} />
        </React.Fragment>
      ))}
    </div>
  );
};
export default Completedtask;
