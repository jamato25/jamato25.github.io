import React from 'react';
import axios from 'axios';

//Component displays the filtering, item count, and clear component buttons on bottom of app
const Footer = ({itemCount, clearCompleted, todos, anyCompleted, changeFilter, filter}) =>{

  //clears all completed tasks in database and moves state back up to app.js
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
      <div className = "Footer">
        <div>{itemCount} Items Left</div>
        <div className = "Footer-Filter-Btn-Container">
          <button className = {filter === "All" ? "Footer-Filter-Btn-Selected" : "Footer-Filter-Btn"} onClick = {onFilter} name = "All">All</button>
          <button className = {filter === "Active" ? "Footer-Filter-Btn-Selected" : "Footer-Filter-Btn"} onClick = {onFilter} name = "Active">Active</button>
          <button className = {filter === "Completed" ? "Footer-Filter-Btn-Selected" : "Footer-Filter-Btn"} onClick = {onFilter} name = "Completed">Completed</button>
        </div>
        <button onClick = {onClearCompleted} className = {anyCompleted? "Footer-Clear-Completed-Btn" : "Footer-Clear-Completed-Btn-hidden"}>Clear Completed</button>
      </div>
    </div>
  )
}

export default Footer
