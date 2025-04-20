import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todo";

export default function useTodos() {
    const [todos, setTodos] = useState(() => {
        const savedTodos: Todo[] = JSON.parse(
          localStorage.getItem("todos") || "[]"
        );
        return savedTodos.length > 0 ? savedTodos : dummyData;
      });
    
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);
    
      function setTodoCompleted(id: number, completed: boolean) {
        // always use prev to update: this will create new array with new reference which then trigger react update,
        // dont directly use todos, todos is OLD array, react detects same reference = won't trigger update!
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
        );
        alert(
          `Todo with ${id} is now ${completed ? "completed" : "incompleted"}. `
        );
      }
    
      function addTodo(title: string) {
        setTodos((prev) => [
          {
            id: Date.now(),
            title,
            completed: false,
          },
          ...prev,
        ]);
      }
    
      function deleteTodo(id: number) {
        setTodos((prev) => prev.filter((e) => e.id != id));
      }
    
      function deleteAllCompleted() {
        setTodos((prev) => prev.filter((e) => !e.completed));
      }
      return {
        todos,
        setTodoCompleted,
        addTodo,
        deleteTodo,
        deleteAllCompleted,
      }
}