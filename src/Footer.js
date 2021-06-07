import React from 'react';
import axios from 'axios';
const Footer = ({itemCount, clearCompleted, todos, anyCompleted, changeFilter}) =>{

  const onClearCompleted =  async () => {
    let updatedTodos = [...todos]
    clearCompleted()
    for(let todo of updatedTodos){
      if(todo.isDone){
        await axios.delete(`/todos/${todo.id}`)
        .catch(e => {
            console.log(e);
        });
      }
    }
  }

  const onFilter = (e) => {
    changeFilter(e.target.name)
  }

  return(
    <div>
      <div>{itemCount} Items Left</div>
      <div>
        <button onClick = {onFilter} name = "All">All</button>
        <button onClick = {onFilter} name = "Active">Active</button>
        <button onClick = {onFilter} name = "Completed">Completed</button>
      </div>
      <button onClick = {onClearCompleted} className = {anyCompleted? "" : "hidden"}>Clear Completed</button>
    </div>
  )
}

export default Footer
