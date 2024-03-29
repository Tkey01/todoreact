export const addTodo = (list, item) => {
  return list.concat(item);
};

export const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

// one liner functions:
// export const addTodo = (list, item) => list.concat(item)
// export const addTodo = (list, item) => [...list, item]

export const findById = (id, list) => {
  return list.find(item => item.id === id);
};

export const findEdit = (id, list, state1, state2) => {
  const list2 = [];
  list2.push(list.find(item => item.id === id));
  list2.push(state1);
  list2.push(state2);

  return list2;
};

export const toggleTodo = todo => ({
  ...todo,
  dateEnd: !todo.isComplete ? new Date().toLocaleString("ru") : "",
  isComplete: !todo.isComplete
});

export const editTodo = todo => ({
  ...todo[0],
  name: todo[1],
  text: todo[2]
});

export const updateTodo = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id);
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ];
};

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id);
  return [...list.slice(0, removeIndex), ...list.slice(removeIndex + 1)];
};

export const filterTodos = (list, route) => {
  switch (route) {
    case "/active":
      return list.filter(item => !item.isComplete);
    case "/complete":
      return list.filter(item => item.isComplete);
    default:
      return list;
  }
};
