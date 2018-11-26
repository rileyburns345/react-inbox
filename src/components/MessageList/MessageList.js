import React from 'react'
import Message from '../Message/Message'

const MessageList = ({ messages, onStarClick, onBoxCheck }) => (
  messages.map((message, idx) => {
    return <Message key={idx} onStarClick={onStarClick} onBoxCheck={onBoxCheck} message={message}/>
  })

)

export default MessageList
