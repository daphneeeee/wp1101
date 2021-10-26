import React from "react";

export default function Footer({
  total,
  done,
  showAll,
  showActive,
  showCompleted,
  clearComplete,
}) {
  return (
    <>
      <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{total} left</div>
        <ul className="todo-app__view-buttons">
          <button id="all" onClick={showAll}>
            All
          </button>
          <button id="active" onClick={showActive}>
            Active
          </button>
          <button id="completed" onClick={showCompleted}>
            Completed
          </button>
        </ul>
        <div className="todo-app__clean">
          {done !== 0 && (
            <button onClick={clearComplete}>Clear completed</button>
          )}
        </div>
      </footer>
    </>
  );
}
