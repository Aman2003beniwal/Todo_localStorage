
import { useState } from "react";
import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [{
        id: 1,
        todo: "todoMsg",
        complete: false
    }],
    createTodo: (todo) => { },
    editTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    completeTodo: (id) => { }

});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}