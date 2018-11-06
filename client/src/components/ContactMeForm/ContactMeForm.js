import React, { Component } from 'react';
import "./ContactMeForm.css";

class ContactMeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValidation: '',
      email: '',
      emailValidation: '',
      typeOfProf: '',
      typeOfProfValidation: '',
      typeOfProfOther: '',
      typeOfProfOtherValidation: '',
      message: '',
      messageCnt: 0,
      messageValidation: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // Updating name state for form submission.
  handleChangeName(event) {

    // Validating name to clear message if invalid occurred.
    const nameCheck = (event.target.value.length > 0);

    if (nameCheck) {
      this.setState({ nameValidation: "" })
    }

    this.setState({ name: event.target.value });
  }

  // Updating email state for form submission.
  handleChangeEmail(event) {

    // Validating email to clear message if invalid occurred.
    const emailCheck = this.validateEmail(this.state.email);
    if (emailCheck) {
      this.setState({ emailValidation: "" })
    };

    this.setState({ email: event.target.value });
  }

  // Updating message state for form submission.
  handleChangeMessage(event) {

    // Limiting message to 1000 characters.
    const limitMsg = event.target.value.slice(0, 1000);
    const messageLength = limitMsg.length;
    const maxMsg = (messageLength === 1000);

    this.maxMsgLenStyle(maxMsg);
    this.setState({
      message: limitMsg,
      messageCnt: messageLength,
      messageValidation: ''
    })
  }

  // Updating the message text with new styling if over limit.
  maxMsgLenStyle(maxMsg) {
    if (maxMsg) {
      document.getElementById('msgCounterId')
        .setAttribute('style', 'color:red; font-weight:bold;')
    } else {
      // setting text color back to normal.
      document.getElementById('msgCounterId')
        .setAttribute('style', 'color:inherit; font-weight:inherit;')
    }
  }


  handleSubmit(event) {
    // Additional validation
    const emailCheck = this.validateEmail(this.state.email);
    const nameCheck = (this.state.name.length > 0);
    const messageCheck = (this.state.message.length <= 1000 && this.state.message.length > 0);

    if (!nameCheck) {
      this.setState({ nameValidation: "Please enter a valid name." })
    };

    if (!emailCheck) {
      this.setState({ emailValidation: "Please enter a valid email address." })
    };

    if (!messageCheck) {
      this.setState({ messageValidation: "Please add a message." })
    }

    if (nameCheck && emailCheck && messageCheck) {
      alert(`Hi ${this.state.name}. Contact page is under construction. In the mean time please visit eric-ng.io, sorry for the inconvenience. Or contact me at my email hello@eric-ng.io`);
    }

    event.preventDefault();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    return (
      <div id="contactMeId" className="parallax-bg contactMe_bg-img1 py-5 min-h-100vh">
        <h2 className="text-center pb-5">Message Me!</h2>
        <div className="row justify-content-center ">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <small className="text-secondary">All fields are required.</small>
              <div className="form-group">
                <label className='d-block'>
                  <span>Name: </span>
                  <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                  />
                  <span className="ml-1 text-danger">
                    {this.state.nameValidation}
                  </span>
                </label>
              </div>
              <div className="form-group">
                <label className='d-block'>
                  <span>Email: </span>
                  <input
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                  />
                  <span className="ml-1 text-danger">
                    {this.state.emailValidation}
                  </span>
                </label>
              </div>
              <div className="form-group">
                <label className='d-block'>
                  <span>Message: </span>
                </label>
                <textarea className="w-100"
                  rows="8"
                  value={this.state.message}
                  onChange={this.handleChangeMessage}>
                </textarea>
                <span className="ml-1 text-danger">
                  {this.state.messageValidation}
                </span>
                <span id='msgCounterId' className="ml-1 float-right"
                >
                  Character Limit: {this.state.messageCnt}/1000
                </span>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactMeForm;
