import React from 'react';
import TodoItem from './TodoItem'

const TodoList = ({todos}) =>{

  return(
    <ul>
      {todos.map(todo => {
        return (<TodoItem todo = {todo}/>)
      })
      }
    </ul>
  )
}

export default TodoList
