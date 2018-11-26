import React, { Component } from 'react';
import './App.css';
import MessageList from '../MessageList/MessageList'
import Toolbar from '../Toolbar/Toolbar'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": true,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "labels": []
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "labels": []
  }
]
    }
  }

  onStarClick = (id) => {
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
