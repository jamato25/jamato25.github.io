import './App.css';
import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer'

function App() {
  const [ todos, setTodos ] = useState([]);
  const [itemCount, setItemCount] = useState(0)

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

  return (
    <div className="App">
      <CreateTodo addTodo = {addTodo}/>
      <TodoList todos = {todos} handleToggle = {handleToggle} handleDelete = {deleteTodo}/>
      <Footer />
    </div>
  );
}

export default App;
