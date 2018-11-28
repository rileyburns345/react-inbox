import React, { Component } from 'react'

class Toolbar extends Component {
  constructor(props) {
    super(props)
  }

  valueGetter = () => {
    let label = ''
    let x = document.getElementById("mySelect").selectedIndex
    label = document.getElementsByTagName("option")[x].value
    return this.props.addLabel(label)
  }

  valueGetter2 = () => {
    let label2 = ''
    let x = document.getElementById("mySelect2").selectedIndex
    label2 = document.getElementsByTagName("option")[x].value
    return this.props.addLabel2(label2)
  }



    render() {
      const { messages, selectAll, selected, unselected, markAsRead, markAsUnread, deleteMessage, onComposeClick } = this.props
      return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
            {messages.filter((message) => {
              return !message.read
            }).length} </span>
              unread messages </p>

          <a className="btn btn-danger" onClick={function () {onComposeClick()}}>
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={function() {selectAll()}} className="btn btn-default">
            <i className={!selected ? 'fa fa-square-o'
                              : !unselected ? 'fa fa-check-square-o' : 'fa fa-minus-square-o'}></i>
          </button>

          <button onClick={function() {markAsRead()}} className="btn btn-default" disabled={!selected ? 'disabled' : false}>
            Mark As Read
          </button>

          <button onClick={function() {markAsUnread()}} className="btn btn-default" disabled={!selected ? 'disabled' : false}>
            Mark As Unread
          </button>

          <select id="mySelect" onChange={() => {this.valueGetter()}} className="form-control label-select" disabled={!selected ? 'disabled' : false}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select id="mySelect2" onChange={() => {this.valueGetter2()}} className="form-control label-select" disabled={!selected ? 'disabled' : false}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={function() {deleteMessage()}} className="btn btn-default" disabled={!selected ? 'disabled' : false}>
            <i className="fa fa-trash-o"></i>
          </button>

     </div>
    </div>
    )
  }
}

export default Toolbar
