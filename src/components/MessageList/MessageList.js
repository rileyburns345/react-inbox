import React from 'react'
import Message from '../Message/Message'

const MessageList = ({ messages }) => (
  messages.map((message, idx) => {
    return <Message key={idx} message={message}/>
  })
)

export default MessageList
