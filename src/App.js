import React, { Component } from "react";
import "./App.css";
import { TodoForm, TodoList } from "./components/todo";
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo,
  filterTodos
} from "./lib/todoHelpers";
import { pipe, partial } from "./lib/utils";
import { loadTodos, createTodo, saveTodo, deleteTodo } from "./lib/todoService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentTodo: "",
      currentTodoText: "",
      currentImportance: "высокая",
      currentDate: "",
      currentDeadline: false
    };
  }

  componentDidMount() {
    loadTodos().then(todos => this.setState({ todos }));
  }

  handleInputChange = e => {
    this.setState({
      currentTodo: e.target.value
    });
  };

  handleTextChange = e => {
    this.setState({
      currentTodoText: e.target.value
    });
  };

  handleImportanceChange = e => {
    this.setState({
      currentImportance: e.target.value
    });
  };

  handleDateChange = e => {
    this.setState({
      currentDate: e.target.value
    });
  };

  handleDeadline = e => {
    this.setState({
      currentDeadline: e.target.checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newId = generateId();
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      text: this.state.currentTodoText,
      importance: this.state.currentImportance,
      deadline: this.state.currentDate,
      isComplete: false
    };
    const updatedTodos = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodos,
      currentTodo: "",
      currentTodoText: "",
      currentImportance: "высокая",
      currentDate: "",
      currentDeadline: false,
      errorMessage: ""
    });
    createTodo(newTodo).then(() => this.showTempMessage("Todo added"));
  };

  showTempMessage = msg => {
    this.setState({
      message: msg
    });
    setTimeout(() => this.setState({ message: "" }), 1000);
  };

  handleEmptySubmit = e => {
    e.preventDefault();
    this.setState({
      errorMessage: "Please enter a valid todo"
    });
  };

  handleToggle = id => {
    const getToggleTodo = pipe(
      findById,
      toggleTodo
    );
    const updated = getToggleTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({
      todos: updatedTodos
    });
    saveTodo(updated).then(() =>
      this.showTempMessage("Todo updated in the server")
    );
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({
      todos: updatedTodos
    });
    deleteTodo(id).then(() => this.showTempMessage("Todo removed from server"));
  };

  render() {
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    const displayTodos = filterTodos(this.state.todos, this.context.route);

    return (
      <div className="app">
        <h1 className="todo-h">To-do List</h1>
        {this.state.errorMessage && (
          <p className="error">{this.state.errorMessage}</p>
        )}
        {this.state.message && <p className="success">{this.state.message}</p>}
        <TodoForm
          handleInputChange={this.handleInputChange}
          handleTextChange={this.handleTextChange}
          handleImportanceChange={this.handleImportanceChange}
          handleDateChange={this.handleDateChange}
          handleDeadline={this.handleDeadline}
          currentTodo={this.state.currentTodo}
          currentTodoText={this.state.currentTodoText}
          currentImportance={this.state.currentImportance}
          currentDate={this.state.currentDate}
          currentDeadline={this.state.currentDeadline}
          handleSubmit={submitHandler}
        />
        <TodoList
          handleToggle={this.handleToggle}
          todos={displayTodos}
          handleRemove={this.handleRemove}
        />
      </div>
    );
  }
}

export default App;
