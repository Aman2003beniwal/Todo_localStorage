import { useEffect, useState } from "react";
import { TodoProvider } from "./Context";
import "./App.css";
import { TodoForm, TodoItem } from "./Components";

function App() {
  const [todos, setTodo] = useState([]);
  const createTodo = (todo) => {
    setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const editTodo = (id, todo) => {
    setTodo((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const completeTodo = (id) => {
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, complete: !prevTodo.complete }
          : prevTodo
      )
    );
  };

  //loading the data in a local storage , it store the data in a string format but we need to convert data in a json format

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem("todolist"));
    if (todoList && todoList.length > 0) {
      setTodo(todoList);
    }
  }, []);

  ////get items from the local storage
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoProvider
      value={{ todos, createTodo, editTodo, deleteTodo, completeTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((items) => (
              <div key={items.id} className="w-full">
                <TodoItem todo={items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
