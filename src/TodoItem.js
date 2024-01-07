import { useState } from "react"

function TodoItem(props) {
  const [isEdit, setIsEdit] = useState(false)
  const [updatedTodo, setUpdatedTodo] = useState(props.text)

  // Toggle editing status
  function toggleIsEditTodo() {
    setIsEdit(true)
  }

  // Handle update todo
  function updateTodo() {
    if (updatedTodo.trim() !== "") {
      const updatedTodos = props.todos.map((todo) =>
        todo.id === props.id ? { ...todo, text: updatedTodo } : todo
      )
      props.setTodos(updatedTodos)
    }
    setIsEdit(false)
  }

  return (
    <li className="todo-item">
      {isEdit ? (
        <div className="edit-todo-container">
          <input
            type="text"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
            className="edit-todo-input"
          />
          <button onClick={() => updateTodo()} className="update-todo-button">
            Update
          </button>
        </div>
      ) : (
        <div className="view-todo-container">
          <input
            type="checkbox"
            checked={props.completed}
            onChange={() => props.toggleTodo(props.id)}
          />
          <span className={`todo-text ${props.completed ? "completed" : ""}`}>
            {props.text}
          </span>
          <button onClick={() => toggleIsEditTodo()} className="edit-button">
            Edit
          </button>
          <button
            onClick={() => props.deleteTodo(props.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}

export default TodoItem
