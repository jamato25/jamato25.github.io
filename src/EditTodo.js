import axios from 'axios';
import React, {useState} from 'react';

//Component is used to edit tasks on a double click and submits changes to database

const EditTodo = ({todo, setEditToggle, editTodo}) =>  {

  const [text, setText ] = useState(todo.content)

  const onChange = (e) => {
    setText(e.target.value)
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    editTodo(e.target.id, text)
    await axios.put(`/todos/${e.target.id}`, {...todo, content: text})
    .catch(e => {
        console.log(e);
        setText(text)
    });
    setEditToggle(true)
  }

  return(
    <form className =  "ToDoListItem-Edit" onSubmit = {onSubmit} id = {todo.id}>
      <input type = "text" value = {text} onChange = {onChange}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setEditToggle(true)
            e.preventDefault()
            e.stopPropagation()
          }
        }}>
      </input>
    </form>
  )
}

export default EditTodo
