import React from "react";
import x from "./img/x.png";

export default function Todo({ item, deleteTodo, completeTodo }) {
  const handleComplete = () => {
    completeTodo(item.id);
  };
  const handleDelete = () => {
    deleteTodo(item.id);
  };

  return (
    <li className="todo-app__item" key={item.id}>
      <div className="todo-app__checkbox">
        <input
          type="checkbox"
          id={item.id}
          checked={item.isCompleted}
          onChange={handleComplete}
        />
        <label htmlFor={item.id}></label>
      </div>
      <h1
        className={`todo-app__item-detail ${
          item.isCompleted ? "completed" : ""
        }`}
      >
        {item.text}
      </h1>
      <img
        className="todo-app__item-x"
        src={x}
        alt="delete"
        onClick={handleDelete}
      />
    </li>
  );
}
