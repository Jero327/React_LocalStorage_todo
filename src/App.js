import { useState, useEffect } from "react"
import TodoItem from "./TodoItem"

function App() {
  // Get todo list from local storage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || []

  const [todos, setTodos] = useState(savedTodos)
  const [newTodo, setNewTodo] = useState("")

  // Update local storage when todo list changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Handle add new todo
  function addTodo() {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  // Handle mark todo as completed
  function toggleTodo(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  // Handle delete todo
  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            setTodos={setTodos}
            todos={todos}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
