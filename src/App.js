import './App.css';
import TodoList from './TodoList'
import CreateTodo from './CreateTodo'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [ todos, setTodos ] = useState([]);

  useEffect(() => {
    axios.get('/todos')
    .then(response => {
      setTodos(response.data)
    })
    .catch(e => {
        console.log(e);
        setTodos(todos)
    });
  })

  return (
    <div className="App">
      <CreateTodo />
      <TodoList todos = {todos}/>
    </div>
  );
}

export default App;
