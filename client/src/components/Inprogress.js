import React from "react";

import Droparea from "./Droparea";

const Inprogress = (props) => {
  const {
    setDraggbleCard,
    onDrop,
    inProgressTasks,
    getProgressTodos,
    getTodos,
    getCompletedTodos,
  } = props;

  //This function is called when user click complete button
  const handleMoveToCompleted = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}update-todo-complete/${id}`,
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
  const status = 1;

  return (
    <>
      <div className="section">
        <h2>In Progress</h2>
        <Droparea onDrop={() => onDrop(status)} />
        {inProgressTasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div
              key={task.id}
              className="in-progress-taskContainer"
              draggable
              onDragStart={() => {
                setDraggbleCard(task.id);
              }}
              onDragEnd={() => setDraggbleCard(null)}
            >
              <div className="taskItem">
                <h3 className="aboutTask">{task.name}</h3>
                <p className="aboutTask">{task.description}</p>
              </div>
              <button
                className="complete-button"
                onClick={() => handleMoveToCompleted(task.id)}
              >
                Complete
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
            <Droparea onDrop={() => onDrop(status, task.id)} id={task.id} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
export default Inprogress;
