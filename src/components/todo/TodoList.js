import React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = props => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map(todo => (
          <TodoItem
            handleToggle={props.handleToggle}
            key={todo.id}
            {...todo}
            handleRemove={props.handleRemove}
            handleEdit={props.handleEdit}
            currentEditState={props.currentEditState}
            currentEditName={props.currentEditName}
            currentEditText={props.currentEditText}
            handleEditName={props.handleEditName}
            handleEditText={props.handleEditText}
          />
        ))}
      </ul>
    </div>
  );
};
