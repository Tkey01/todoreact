import React from "react";
import { partial } from "../../lib/utils";

export const TodoItem = props => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  const deadline = props.deadline ? props.deadline : "время неограничено";
  return (
    <li>
      <span onClick={handleRemove}>&#128465;</span>
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={props.isComplete}
      />
      {props.name}
      <textarea className="todo-text" disabled value={props.text} />
      <p>Важность: {props.importance}</p>

      <p>Дедлайн: {deadline}</p>
      {props.dateEnd && <p>Дата завершения: {props.dateEnd}</p>}
    </li>
  );
};
