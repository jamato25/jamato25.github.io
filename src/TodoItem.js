import React from 'react';

const TodoItem = ({todo}) =>{
  return (
    <form>
      <input type="checkbox" ></input>
      <label> {todo.content}</label>
      <input type="checkbox" ></input>
    </form>
  )
}

export default TodoItem
