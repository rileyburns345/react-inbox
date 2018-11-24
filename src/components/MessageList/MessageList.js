import React from 'react'
import Message from '../Message/Message'

const MessageList = ({ messages, onStarClick }) => (
  messages.map((message, idx) => {
    return <Message key={idx} onStarClick={onStarClick} message={message}/>
  })
)

export default MessageList
