import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

// const initialData = [
//   {
//     id: uuid(),
//     label: "Buy groceries",
//     checked: false,
//   },
//   {
//     id: uuid(),
//     label: "Reboot computer",
//     checked: false,
//   },
//   {
//     id: uuid(),
//     label: "Ace CoderPad interview",
//     checked: true,
//   },
// ];



function App() {
  const data = JSON.parse(localStorage.getItem("todos")) || [];
  const sortedData = data.sort(function (x, y) {
    return x.checked > y.checked ? 1 : -1;
  });

  const [todos, setTodos] = useState(sortedData);

  // ADD ITEMS INTO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((label) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ]);
  }, []);


// CHECK/UNCHECK TODOS
  const handleChange = useCallback(
    (checked, id) => {
      // handle the check/uncheck logic
      let newTask = todos.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      });
      setTodos(newTask);
    },
    [todos]
  );

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem {...todo} onChange={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
