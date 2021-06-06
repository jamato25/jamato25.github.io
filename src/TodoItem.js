import React from 'react';
import axios from 'axios'
const TodoItem = ({todo, handleToggle, handleDelete}) =>{

  const onClickComplete = async (e) => {
    handleToggle(e.target.id)
    await axios.put(`/todos/${todo.id}`, {...todo, isDone: !todo.isDone})
    .catch(e => {
        console.log(e);
    });
    console.log(e.target)
  }

  const onClickDelete = async (e) => {
    handleDelete(e.target.id)
    await axios.delete(`/todos/${todo.id}`)
    .catch(e => {
        console.log(e);
    });
    console.log(e.target)

  }

  return (
    <form key = {todo.id}>
      <input id = {todo.id} type="checkbox"  onChange = {onClickComplete} checked = {todo.isDone}></input>
      <label className = {todo.isDone? "strike" : ""}> {todo.content} </label>
      <input id = {todo.id} type="checkbox" onChange = {onClickDelete}></input>
    </form>
  )
}

export default TodoItem
