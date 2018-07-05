import React from "react";

export const TodoForm = props => {
  return (
    <div className="todo-form">
      <form onSubmit={props.handleSubmit}>
        <input
          className="todo-name"
          type="text"
          value={props.currentTodo}
          onChange={props.handleInputChange}
          placeholder="Задача"
        />
        <textarea
          className="todo-text"
          value={props.currentTodoText}
          onChange={props.handleTextChange}
          placeholder="Описание"
        />
        <p>Важность</p>
        <select
          className="todo-select"
          value={props.currentImportance}
          onChange={props.handleImportanceChange}
        >
          <option value="высокая">Высокая</option>
          <option value="средняя">Средняя</option>
          <option value="низкая">Низкая</option>
        </select>
        <p>Дедлайн</p>
        <input
          className="todo-date"
          type="date"
          value={props.currentDate}
          onChange={props.handleDateChange}
        />
        <input className="todo-submit" type="submit" value="Добавить" />
      </form>
    </div>
  );
};
