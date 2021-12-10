import React, { useState } from "react";
import { TodoContext } from "./todo-context";

export const TodoProvider = ({ children }) => {
  const [todoState, setTodoState] = useState({
    todos: [],
    total: 0,
    loading: false,
    success: false,
    message: null,
  });

  const deleteTodo = (status) => {
    if ((status = "success")) {
      setTodoState({
        todos: todoState.todos,
        total: todoState.total,
        loading: todoState.loading,
        success: todoState.success,
        message: { message: "Todo item deleted", type: "success" },
      });
    } else {
      setTodoState({
        todos: todoState.todos,
        total: todoState.total,
        loading: todoState.loading,
        success: todoState.success,
        message: { message: "An error occured", type: "error" },
      });
    }
  };

  const createTodo = (value) => {
    console.log(value);
    setTodoState({
      loading: false,
      success: true,
      total: todoState.total,
      todos: [value, ...todoState.todos],
      message: { message: "created", type: "success" },
    });
  };

  const updateTodoState = (values) => {
    console.log(values)
    setTodoState(values)
  }

  return (
    <TodoContext.Provider
      value={{ todoState, deleteTodo, createTodo, updateTodoState }}
    >
      {children}
    </TodoContext.Provider>
  );
};
