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

  const handleToggle = (id) => {
    let updatedTodos = todos.map(todo => {
      return todo.id === Number(id) ? { ...todo, isDone: !todo.isDone } : { ...todo};
    });
    setTodos(updatedTodos);
  }

  const addTodo = (newTodo) => {
    let copy = [...todos];
    copy = [...copy, { ...newTodo }];
    setTodos(copy);

  }

  const deleteTodo = (id) => {
    let updatedTodos = todos.filter(todo => {
      return todo.id !== Number(id);
    });
    setTodos(updatedTodos);
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

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

  const clearCompleted = () => {
    let updatedTodos = todos.filter(todo => {
      return !todo.isDone;
    });
    setTodos(updatedTodos);
  }

  const findCount = () => {
    let count = 0;
    for(let elem of todos){
      if(!elem.isDone){count++}
    }
    return count;
  }

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
      <div>
        <FiChevronDown onClick = {checkAll}/>
        <CreateTodo addTodo = {addTodo}/>
      </div>
      <TodoList todos = {todos} handleToggle = {handleToggle} handleDelete = {deleteTodo} filter = {filter} editTodo = {editTodo}/>
      <Footer filter = {filter} checkAll = {checkAll} itemCount = {findCount()} clearCompleted = {clearCompleted} todos = {todos} anyCompleted = {anyCompleted()} changeFilter = {changeFilter}/>
    </div>
  );
}

export default App;
