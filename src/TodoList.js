import React from 'react';
import TodoItem from './TodoItem'

const TodoList = ({todos, handleToggle, handleDelete, filter, editTodo}) =>{
  //todos list is fist filtered if the filter is selected in the state before
  //displaying all appropriate todos.
  let filteredTodos = [...todos]
  if(filter === "Completed"){
    filteredTodos = todos.filter(todo => {
      return todo.isDone;
    });
  }

  if(filter === "Active"){
    filteredTodos = todos.filter(todo => {
      return !todo.isDone;
    });
  }

  return(
    <ul className = "TodoList">
      {filteredTodos.map(todo => {
        return (<TodoItem todo = {todo} handleToggle = {handleToggle} handleDelete = {handleDelete} editTodo = {editTodo}/>)
      })
      }
    </ul>
  )
}

export default TodoList
