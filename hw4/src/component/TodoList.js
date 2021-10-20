import React from "react";
import Todo from "./Todo";

export default function TodoList({ todo, deleteTodo, completeTodo, filter }) {
  return (
    <>
      <ul className="todo-app__list" id="todo-list">
        {filter === "ALL" &&
          todo.map((item) => (
            <Todo
              key={item.id}
              item={item}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          ))}

        {filter === "ACTIVE" &&
          todo
            .filter((item) => item.isCompleted === false)
            .map((item) => (
              <Todo
                key={item.id}
                item={item}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}

        {filter === "COMPLETE" &&
          todo
            .filter((item) => item.isCompleted === true)
            .map((item) => (
              <Todo
                key={item.id}
                item={item}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}
      </ul>
    </>
  );
}
