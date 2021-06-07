import axios from 'axios';
import React, {useState} from 'react';

//Component
const CreateTodo = ({addTodo}) => {


  const [text, setText ] = useState("")

  const onChange = (e) =>{
    setText(e.target.value)
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    await axios.post('/todos', {content: text, isDone: false})
    .then(response => {
        addTodo(response.data)
        setText("")
    })
    .catch(e => {
        console.log(e);
        setText(text)
    });
  }

  return(
    <form className = "CreateTodoUpper-form" onSubmit = {onSubmit}>
      <input className = "CreateTodoUpper-form-input" type = "text" value = {text} placeholder = "What needs to be done?" onChange = {onChange} ></input>
    </form>
  )
}

export default CreateTodo
