import React, { Component } from 'react';
import './App.css';
import MessageList from '../MessageList/MessageList'
import Toolbar from '../Toolbar/Toolbar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({
      ...this.state,
      messages: json
    })
  }



  onStarClick = async (id) => {

    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        messageIds: [id],
        command: 'star'
      })
    })

    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.starred = !message.starred
        }
        return message
      })
    })
  }

  onBoxCheck = (id) => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if (message.id === id) {
          message.selected ? delete message.selected : message.selected = true
        }
        return message
      })
    })
  }

  selectAll = () => {
    let selected = this.state.messages.filter(message => { return message.selected}).length
    if (this.state.messages.length === selected) {
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
        delete message.selected
        return message
        })
      })
    }
    else {
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
          message.selected = true
          return message
        })
      })
    }
  }

  markAsRead = () => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if (message.selected === true) {
          message.read = true
        }
        return message
      })
    })
  }

  markAsUnread = () => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if (message.selected === true) {
          message.read = false
        }
        return message
      })
    })
  }

  deleteMessage = () => {
    this.setState({
      ...this.state,
      messages: this.state.messages.filter(message => {
        if (!message.selected === true) {
          return message
        }
      })
    })
  }

addLabel = (label) => {
  let newMessages = this.state.messages.map(message => {
      if (message.selected === true) {
        if (!message.labels.includes(label)) {
          let newMessage = {...message}
          newMessage.labels = [...message.labels, label]
          return newMessage
        }
      }
    return message
    })
    this.setState({
      ...this.state,
      messages: newMessages
    })
  }

  addLabel2 = (label2) => {
    let newMessages = this.state.messages.map(message => {
        if (message.selected === true) {
          if (message.labels.includes(label2)) {
            let newMessage = {...message}

            console.log(newMessage.lables)

            let i = newMessage.labels.indexOf(label2)
            newMessage.labels.splice(i,i+1)

            return newMessage
          }
        }
      return message
      })
      this.setState({
        ...this.state,
        messages: newMessages
      })
    }



  render() {
    return (
      <div className="App">
        <Toolbar messages={this.state.messages} selectAll={this.selectAll}
            selected={this.state.messages.filter(message => { return message.selected}).length}
            unselected={this.state.messages.filter(message => { return !message.selected}).length}
            markAsRead={this.markAsRead}
            markAsUnread={this.markAsUnread}
            deleteMessage={this.deleteMessage}
            addLabel={this.addLabel}
            addLabel2={this.addLabel2}
            />
        <MessageList messages={this.state.messages} onStarClick={this.onStarClick} onBoxCheck={this.onBoxCheck}/>
      </div>
    );
  }
}

export default App;
