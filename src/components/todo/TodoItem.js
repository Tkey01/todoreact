import React from "react";
import { partial } from "../../lib/utils";

export const TodoItem = props => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  const handleEdit = partial(props.handleEdit, props.id);
  const deadline = props.deadline ? props.deadline : "время неограничено";
  const edit = props.currentEditState;

  return (
    <li className="todo-item">
      <div className="todo-header">
        <span className="todo-delete" onClick={handleRemove}>
          &#128465;
        </span>
        <span className="todo-edit" onClick={handleEdit}>
          ✎
        </span>
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={props.isComplete}
        />
        {edit.edit && edit.id === props.id ? (
          <input
            type="text"
            className="todo-name"
            placeholder="Задача"
            value={props.currentEditName}
            onChange={props.handleEditName}
          />
        ) : (
          <span>{props.name}</span>
        )}
      </div>
      {edit.edit && edit.id === props.id ? (
        <textarea
          className="todo-text"
          placeholder="Описание"
          value={props.currentEditText}
          onChange={props.handleEditText}
        />
      ) : (
        <textarea disabled className="todo-text" value={props.text} />
      )}
      <p>Важность: {props.importance}</p>

      <p>Дедлайн: {deadline}</p>
      {props.dateEnd && <p>Дата завершения: {props.dateEnd}</p>}
    </li>
  );
};
