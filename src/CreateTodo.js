import axios from 'axios';
import React from 'react';

class CreateTodo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({text: e.target.value})
  }

  async onSubmit(e){
    e.preventDefault()
    await axios.post('/todos', {content: this.state.text, isDone: false})
    .then(response => {
        this.setState({text: ""})
    })
    .catch(e => {
        console.log(e);
        this.setState({...this.state});
    });
  }

  render(){
    return(
      <form onSubmit = {this.onSubmit}>
        <input type = "text" value = {this.state.text} placeholder = "What needs to be done?" onChange = {this.onChange} ></input>
      </form>
    )
  }
}

export default CreateTodo
