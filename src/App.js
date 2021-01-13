import React, { Component } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';

class App extends Component {
  state = {
    characters: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        this.setState({ characters })
      })
      .catch(function (error){
        //Not handling the error, just logging it in the console
        console.log(error);
      });
  }

  removeCharacter = index => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index
      }),
    })
  }

  handleSubmit = character => {
    this.setState({ characters: [...this.state.characters, character] })
  }

  render() {
    return (
      <div className="container">
        <Table characterData={this.state.characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}


export default App