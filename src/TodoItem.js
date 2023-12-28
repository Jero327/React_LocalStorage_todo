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
    <li>
      {isEdit ? (
        <div>
          <input
            type="text"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          />
          <button onClick={() => updateTodo()}>Update</button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={props.completed}
            onChange={() => props.toggleTodo(props.id)}
          />
          <span
            style={{
              textDecoration: props.completed ? "line-through" : "none",
            }}
          >
            {props.text}
          </span>
          <button onClick={() => toggleIsEditTodo()}>Edit</button>
          <button onClick={() => props.deleteTodo(props.id)}>Delete</button>
        </>
      )}
    </li>
  )
}

export default TodoItem
