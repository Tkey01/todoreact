import React from "react";
import { partial } from "../../lib/utils";

export const TodoItem = props => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  const handleEdit = partial(props.handleEdit, [
    props.id,
    props.name,
    props.text
  ]);
  const deadline = props.deadline ? props.deadline : "время неограничено";
  const editState = props.currentEditState;
  console.log(editState);
  const editHandleIf =
    (editState.edit && editState.id === props.id) ||
    (!editState.edit && editState.id !== props.id)
      ? handleEdit
      : function() {};

  return (
    <li className="todo-item">
      <div className="todo-header">
        <span className="todo-delete" onClick={handleRemove}>
          &#128465;
        </span>
        <span className="todo-edit" onClick={editHandleIf}>
          ✎
        </span>
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={props.isComplete}
        />
        {editState.edit && editState.id === props.id ? (
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
      {editState.edit && editState.id === props.id ? (
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
