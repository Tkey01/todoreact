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

  const editHandleIf =
    (editState.edit && editState.id === props.id) ||
    (!editState.edit && editState.id !== props.id)
      ? handleEdit
      : function() {};

  const importance = props.importance;
  let background = {};
  switch (importance) {
    case "высокая":
      background = {
        backgroundColor: "#FCC55D"
      };
      break;
    case "средняя":
      background = {
        backgroundColor: "#80BFFF"
      };
      break;
    default:
      background = {
        backgroundColor: "#8CFF80"
      };
  }
  console.log(background);
  return (
    <li className="todo-item" style={background}>
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
