import './App.css';
import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer'
import {FiChevronDown} from 'react-icons/fi'

function App() {
  const [ todos, setTodos ] = useState([]);
  const [filter, setFilter ] = useState("All")

  //Fetch initial data from database for the app to load.
  useEffect( () => {
    async function fetchData(){
        await axios.get('/todos')
        .then(response => {
          setTodos(response.data)
        })
        .catch(e => {
            console.log(e);
            setTodos(todos)
        });
    }
      fetchData()

  }, [])

  //toggles the checkbox on and off for completed tasks in the state.
  const handleToggle = (id) => {
    let updatedTodos = todos.map(todo => {
      return todo.id === Number(id) ? { ...todo, isDone: !todo.isDone } : { ...todo};
    });
    setTodos(updatedTodos);
  }
  //adds todo to the state
  const addTodo = (newTodo) => {
    let copy = [...todos];
    copy = [...copy, { ...newTodo }];
    setTodos(copy);

  }

  //deletes a single todo from the state
  const deleteTodo = (id) => {
    let updatedTodos = todos.filter(todo => {
      return todo.id !== Number(id);
    });
    setTodos(updatedTodos);
  }

  //sets the state variable "filter" to whichever filter is clicked.
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  //handles state change for marking all tasks as complete when the
  //chevron  button is clicked
  const checkAll = () => {
    let updatedTodos = [...todos]
    let allCompleted = true;
    for(let elem of updatedTodos){
      if(!elem.isDone){allCompleted = false}
      elem.isDone = true;
    }
    if(allCompleted){
      for(let elem of updatedTodos){
        elem.isDone = false;
      }
    }
    setTodos(updatedTodos);
  }

  //handles state change for deleting all completed tasks
  //when the clear completed button is clicked
  const clearCompleted = () => {
    let updatedTodos = todos.filter(todo => {
      return !todo.isDone;
    });
    setTodos(updatedTodos);
  }

  //Calculates the total completed tasks for display in the footer
  const findCount = () => {
    let count = 0;
    for(let elem of todos){
      if(!elem.isDone){count++}
    }
    return count;
  }

  //Determines if any tasks are currently completed.
  //Needed to toggle the "clear completed" button from visible to hidden
  const anyCompleted = () => {
    let anyComplete = false;
    for(let elem of todos){
      if(elem.isDone){
        anyComplete = true;
        break;
      }
    }
    return anyComplete
  }

  //handles state change for edited tasks
  const editTodo = (id, text) => {
    let updatedTodos = [...todos]
    for(let todo of updatedTodos){
      if(todo.id === Number(id)){
        todo.content = text
      }
    }
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <h1 className = "Title">todos</h1>
      <div className = "TodoListContainer">
        <div className = "CreateTodoUpper">
          <FiChevronDown onClick = {checkAll}/>
          <CreateTodo addTodo = {addTodo}/>
        </div>
        <TodoList  todos = {todos} handleToggle = {handleToggle} handleDelete = {deleteTodo} filter = {filter} editTodo = {editTodo}/>
        <Footer className = "Footer" filter = {filter} checkAll = {checkAll} itemCount = {findCount()} clearCompleted = {clearCompleted} todos = {todos} anyCompleted = {anyCompleted()} changeFilter = {changeFilter}/>
      </div>

    </div>
  );
}

export default App;
