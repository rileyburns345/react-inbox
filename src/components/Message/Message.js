import React from 'react'

const Message = ({ message, onStarClick, onBoxCheck }) => {
   console.log("message: ", message);
   return (

  <div className={`row message ${message.read ? 'read' : 'unread'} ${message.selected ? 'selected' : ''}`}>
    <div className="col-xs-1">
      <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" checked={message.selected || false} onClick={function() {onBoxCheck(message.id)}} />
      </div>
      <div className="col-xs-2">
        <i onClick={function() {onStarClick(message.id)}} className={`${message.starred ? 'star fa fa-star' : 'star fa fa-star-o'}`}></i>
      </div>
      </div>
    </div>

    <div className="col-xs-11">
      {message.labels.map((label, idx) => {
        return <span key={idx} className="label label-warning">{label}</span>
      })}
      <a href="#">
        {message.subject}
      </a>
    </div>


  </div>
)
}


export default Message
