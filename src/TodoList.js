import React from 'react';
import TodoItem from './TodoItem'

const TodoList = ({todos, handleToggle, handleDelete}) =>{

  return(
    <ul>
      {todos.map(todo => {
        return (<TodoItem todo = {todo} handleToggle = {handleToggle} handleDelete = {handleDelete}/>)
      })
      }
    </ul>
  )
}

export default TodoList
