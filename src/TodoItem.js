import React, {useState} from 'react';
import axios from 'axios'
import EditTodo from './EditTodo'

const TodoItem = ({todo, handleToggle, handleDelete, editTodo}) =>{

  const [editToggle, setEditToggle] = useState(true)

  //Updates database with checked complete items
  const onClickComplete = async (e) => {
    handleToggle(e.target.id)
    await axios.put(`/todos/${todo.id}`, {...todo, isDone: !todo.isDone})
    .catch(e => {
        console.log(e);
    });
  }

  //Updates database with deleted items
  const onClickDelete = async (e) => {
    handleDelete(e.target.id)
    await axios.delete(`/todos/${todo.id}`)
    .catch(e => {
        console.log(e);
    });

  }

  return (
    <li className = "ToDoListItem" key = {todo.id}>
        <input  id = {todo.id} type="checkbox"  onChange = {onClickComplete} checked = {todo.isDone}></input>
        {editToggle ? (
            <label className = {todo.isDone? "ToDoListItem-Label-Strike" : "ToDoListItem-Label"} onDoubleClick={() =>{setEditToggle(false)}} >{todo.content}</label>
          ) :
          (<EditTodo todo = {todo} editTodo = {editTodo} setEditToggle = {setEditToggle}/>)}
        <div className = "ToDoListItem-Delete" id = {todo.id} onClick = {onClickDelete}> x </div>
    </li>

  )
}

export default TodoItem
