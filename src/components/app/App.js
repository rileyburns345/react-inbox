import React, { Component } from 'react';
import './App.css';
import MessageList from '../MessageList/MessageList'
import Toolbar from '../Toolbar/Toolbar'
import ComposeForm from '../ComposeForm/ComposeForm'

const API = 'gschool-api.herokuapp.com/api/messages'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      compose: false
    }
  }

  async componentDidMount() {
    const response = await fetch(`${API}`)
    const json = await response.json()
    this.setState({
      ...this.state,
      messages: json
    })
  }

  onStarClick = async (id) => {

    const response = await fetch(`${API}`, {
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

  markAsRead = async () => {

    const ids = this.state.messages.filter(message => {
      return message.selected === true
    }).map(message => {
      return message.id
    })

    const response = await fetch(`${API}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        messageIds: ids,
        command: 'read',
        read: true
      })
    })

    const newList = await response.json()

    this.setState({
      ...this.state,
      messages: newList
    })
  }

  markAsUnread = async () => {

    const ids = this.state.messages.filter(message => {
      return message.selected === true
    }).map(message => {
      return message.id
    })

    const response = await fetch(`${API}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        messageIds: ids,
        command: 'read',
        read: false
      })
    })

    const newList = await response.json()

    this.setState({
      ...this.state,
      messages: newList
    })
  }

  deleteMessage = async () => {

    const ids = this.state.messages.filter(message => {
      return message.selected === true
    }).map(message => {
      return message.id
    })

    const response = await fetch(`${API}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        messageIds: ids,
        command: 'delete'
      })
    })

    const newList = await response.json()

    this.setState({
      ...this.state,
      messages: newList
    })
  }

addLabel = async(label) => {

  const ids = this.state.messages.filter(message => {
    return message.selected === true
  }).map(message => {
    return message.id
  })

  const response = await fetch(`${API}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify({
      messageIds: ids,
      command: 'addLabel',
      label: label

    })
  })

  /// STOP HERE

    this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
         if (message.selected === true) {
           if (label === 'Apply label') {
             return message
           }
           else if (!message.labels.includes(label)) {
             message.labels.push(label)
              return message
           }
         }
       return message
       })
    })
  }

  addLabel2 = async (label2) => {

      const ids = this.state.messages.filter(message => {
        return message.selected === true
      }).map(message => {
        return message.id
      })

      const response = await fetch(`${API}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify({
          messageIds: ids,
          command: 'removeLabel',
          label: label2

        })
      })





      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
              if (message.selected === true) {
                if (message.labels.includes(label2)) {
                  let i = message.labels.indexOf(label2)
                  message.labels.splice(i,i+1)
                  return message
                }
              }
            return message
            })
      })
    }

  onComposeClick = () => {
    this.setState({
      ...this.state,
      compose: !this.state.compose
    })
  }

  onSendForm = async (sub, bod) => {
    console.log(this.state.messages);
    const response = await fetch(`${API}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify({
        subject: sub,
        body: bod,
        read: false,
        starred: false
      })
    })

    const newItem = await response.json()

    this.setState({
      ...this.state,
      compose: !this.state.compose,
      messages: [...this.state.messages, newItem]
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
            onComposeClick={this.onComposeClick}
            />
        <ComposeForm onComposeClick={this.onComposeClick} composing={this.state.compose} onSendForm={this.onSendForm}/>
        <MessageList messages={this.state.messages} onStarClick={this.onStarClick} onBoxCheck={this.onBoxCheck}/>
      </div>
    );
  }
}

export default App;
