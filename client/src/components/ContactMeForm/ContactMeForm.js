import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { postContactForm } from '../../utils/API';
import "./ContactMeForm.css";

// Variable to store recaptcha instance
let recaptchaInstance;

const resetRecaptcha = () => {
  recaptchaInstance.reset();
};

class ContactMeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameVal: '',
      email: '',
      emailVal: '',
      typeOfProf: '',
      typeOfProfVal: '',
      typeOfProfOther: '',
      typeOfProfOtherVal: '',
      message: '',
      messageCnt: 0,
      messageVal: '',
      underConstMsg: '',
      recaptchaResp: '',
      recaptchaRespVal: false
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
      this.setState({ nameVal: "" })
    }

    this.setState({ name: event.target.value });
  }

  // Updating email state for form submission.
  handleChangeEmail(event) {

    // Validating email to clear message if invalid occurred.
    const emailCheck = this.validateEmail(this.state.email);
    if (emailCheck) {
      this.setState({ emailVal: "" })
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
      messageVal: ''
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

  // Used to update state, rather than placing into element.
  updateCaptchaState(response){
    this.setState({ 
      recaptchaResp: response, 
      recaptchaRespVal: true
    })
  }

  handleSubmit = async (event) => {

    event.preventDefault();

    // Additional Validation
    const emailCheck = this.validateEmail(this.state.email);
    const nameCheck = (this.state.name.length > 0);
    const messageCheck = (this.state.message.length <= 1000 && this.state.message.length > 0);

    if (!nameCheck) {
      this.setState({ nameVal: "Please enter a valid name." })
    };

    if (!emailCheck) {
      this.setState({ emailVal: "Please enter a valid email address." })
    };

    if (!messageCheck) {
      this.setState({ messageVal: "Please add a message." })
    }

    if (nameCheck && emailCheck && messageCheck && this.state.recaptchaRespVal) {
      // Setting data to be posted.
      const data = {
        recaptcha: this.state.recaptchaResp,
        name: this.state.name,
        email: this.state.email,
        typeOfProfOther: this.state.typeOfProfOther,
        typeOfProf: this.state.typeOfProf,
        message: this.state.message
      }

      // Sending post.
      const response = await postContactForm(data);
      console.log('after response.')
      console.log(response.data)

      resetRecaptcha();

      this.setState({
        recaptchaRespVal: false,
        underConstMsg: `Hi ${this.state.name}. Sorry for the inconvenience, contact page is under construction. In the mean time please visit eric-ng.io or contact me at my email hello@eric-ng.io`
      })
    }
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
                    {this.state.nameVal}
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
                    {this.state.emailVal}
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
                  {this.state.messageVal}
                </span>
                <span id='msgCounterId' className="ml-1 float-right"
                >
                  Character Limit: {this.state.messageCnt}/1000
                </span>
              </div>
              <Recaptcha 
              className="my-3"
              ref={e => recaptchaInstance = e}
              sitekey="6Ld62nwUAAAAAOypm11zuUeXcCPVjMWAUiRAIRzc"
              render="explicit"
              verifyCallback={(response) => this.updateCaptchaState(response)}
              />
              {/* <div id="recaptchaId" className="g-recaptcha my-3" data-sitekey="6Ld62nwUAAAAAOypm11zuUeXcCPVjMWAUiRAIRzc" data-callback=""></div> */}
              <input type="submit" value="Submit" />
            </form>
            <span>
              {this.state.underConstMsg}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactMeForm;
