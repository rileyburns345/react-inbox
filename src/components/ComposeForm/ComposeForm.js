import React, { Component } from 'react'

class ComposeForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      ...this.state,
      formSubject: '',
      body: ''
    }
  }

onButtonClick = (e) => {
  e.preventDefault()
  let sub = document.getElementById('subject').value
  let bod = document.getElementById('body').value

  this.setState({
      ...this.state,
      formSubject: sub,
      body: bod
    })

    this.props.onSendForm(sub, bod)
  }

  render () {
    const {composing, onComposeClick, onSendForm} = this.props
    return (
      <form className="form-horizontal well" className={`${composing ? '' : 'hidden'}`}>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label for="subject" className="col-sm-2 control-label">Subject</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject">
          </input>
        </div>
      </div>
      <div className="form-group">
        <label for="body" className="col-sm-2 control-label">Body</label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" onClick={this.onButtonClick}>
          </input>
        </div>
      </div>
      </form>
    )
  }
}



export default ComposeForm
