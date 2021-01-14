import React, { Component } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';

class App extends Component {
  state = {
    characters: []
  }

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
      if (callResult){
        if (callResult.status === 201){
          this.setState({ characters: [...this.state.characters, callResult.data.user] });
        }
      }
    });
  }

  makePostCall(character){
    return axios.post('http://localhost:5000/users', character)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      })
  }

  makeDeleteCall(character){
    return axios.delete('http://localhost:5000/users', { data: character })
      .then(function (response) {
        return (response.status === 200);
      })
      .catch(function (error){
        return false;
      })
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
        if(i === index){
          this.makeDeleteCall(character).then( callResult => {
            if (callResult){
              return false;
            }
          });
        } else{
        return true;
        }
      }),
    })
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