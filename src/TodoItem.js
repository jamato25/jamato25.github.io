import React, {useState} from 'react';
import axios from 'axios'
import EditTodo from './EditTodo'

const TodoItem = ({todo, handleToggle, handleDelete, editTodo}) =>{

  const [editToggle, setEditToggle] = useState(true)

  const onClickComplete = async (e) => {
    handleToggle(e.target.id)
    await axios.put(`/todos/${todo.id}`, {...todo, isDone: !todo.isDone})
    .catch(e => {
        console.log(e);
    });
  }

  const onClickDelete = async (e) => {
    handleDelete(e.target.id)
    await axios.delete(`/todos/${todo.id}`)
    .catch(e => {
        console.log(e);
    });

  }

  return (
    <li>
      <div key = {todo.id} >
        <input id = {todo.id} type="checkbox"  onChange = {onClickComplete} checked = {todo.isDone}></input>
        {editToggle ? (
            <label className = {todo.isDone? "strike" : ""} onDoubleClick={() =>{setEditToggle(false)}} >{todo.content}</label>
          ) :
          (<EditTodo todo = {todo} editTodo = {editTodo} setEditToggle = {setEditToggle}/>)}
        <input id = {todo.id} type="checkbox" onChange = {onClickDelete}></input>
      </div>
    </li>

  )
}

export default TodoItem
