import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "../component/TodoList";
import Footer from "../component/Footer";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [left, setLeft] = useState(0);
  const [filter, setFilter] = useState("ALL");

  const handleSubmit = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTodo([
        ...todo,
        {
          id: todo.length,
          text: e.target.value,
          isCompleted: false,
        },
      ]);
      e.target.value = "";
    }
  };
  const handleComplete = (id) => {
    setTodo(
      todo.map((item) => {
        if (item.id === id) {
          item.isCompleted = !item.isCompleted;
        }
        return item;
      })
    );
  };
  const handleDelete = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };
  const showAll = () => {
    setFilter("ALL");
  };
  const showActive = () => {
    setFilter("ACTIVE");
  };
  const showCompleted = () => {
    setFilter("COMPLETE");
  };
  const clearComplete = () => {
    setTodo(todo.filter((item) => item.isCompleted === false));
  };

  useEffect(() => {
    const n = todo.filter((item) => item.isCompleted === false);
    setLeft(n.length);
  }, [todo]);

  return (
    <>
      <div className="todo-app__root">
        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>
        <section className="todo-app__main">
          <input className="todo-app__input" onKeyPress={handleSubmit} />
          <TodoList
            todo={todo}
            deleteTodo={handleDelete}
            completeTodo={handleComplete}
            filter={filter}
          />
        </section>
        {todo.length !== 0 && (
          <Footer
            total={left}
            showAll={showAll}
            showActive={showActive}
            showCompleted={showCompleted}
            clearComplete={clearComplete}
          />
        )}
      </div>
    </>
  );
}
