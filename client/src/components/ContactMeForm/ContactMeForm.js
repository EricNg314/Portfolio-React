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
      typeOfProf: 'N/A',
      typeOfProfVal: '',
      typeOfProfOther: '',
      typeOfProfOtherVal: '',
      message: '',
      messageCnt: 0,
      messageVal: '',
      contactResponse: '',
      recaptchaResp: '',
      recaptchaRespVal: false
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeProf = this.handleChangeProf.bind(this);
    this.handleChangeProfOther = this.handleChangeProfOther.bind(this);

  }

  loadCaptcha() {
    console.log("testing load captcha")
    let script = document.createElement('script');
    script.onload = function () {
    //do stuff with the script
    console.log("doing stuff in onload")
    };
    script.type = "text/javascript";
    script.src = "https://www.google.com/recaptcha/api.js";
    // script.async = true;
    // script.defer = true;
    document.body.appendChild(script);
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

  handleChangeProf(event) {
    this.setState({
      typeOfProf: event.target.value,
      typeOfProfOther: ""
    })
    if (event.target.value === "Other"){
      document.getElementById('profOtherId').style.display="block"
    } else {
      document.getElementById('profOtherId').style.display="none"
    }
  }

  handleChangeProfOther(event) {
    const limitProfOther = event.target.value.slice(0, 50);
    this.setState({
      typeOfProfOther: limitProfOther
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
      let data = {
        recaptcha: this.state.recaptchaResp,
        name: this.state.name,
        email: this.state.email,
        typeOfProfOther: this.state.typeOfProfOther,
        typeOfProf: this.state.typeOfProf,
        message: this.state.message
      }

      // Sending post.
      let response = await postContactForm(data);
      let resData = response.data;
      resetRecaptcha();
      console.log(resData)
      if (resData.statusCode === 200) {
        if (resData.body.success === true) {
          console.log("Message sucessfully sent. To be updated.")
        } else {
          console.log("Failed to send. To be updated.")
        }
      } else {
        console.log("Error from server.")
      }

      this.setState({
        recaptchaRespVal: false,
        contactResponse: `Hi ${this.state.name}. Thank you for reaching out to me, I have sent you an email and will follow up regarding your message.`
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
        <div className="d-flex justify-content-center ">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <small className="text-secondary">All fields are required.</small>
              <div className="d-flex">
              <div id="formColumn1Id" className="col-sm-12 col-md-6 px-0 d-inline-block">
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
              </div>
              <div id="formColumn2Id" className="col-sm-12 col-md-6 px-0 d-inline-block">
                <div className="form-group">
                  <label className='d-block'>
                    <span>Profession: </span>
                    <select className="form-control d-inline-block"                       
                      style={{width: 'auto', height: 'auto'}}
                      value={this.state.typeOfProf}
                      onChange={this.handleChangeProf}>
                      <option value="N/A">N/A</option>
                      <option value="Recruiter">Recruiter</option>
                      <option value="Educational">Educational</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Other">Other</option>
                    </select>
                    <span className="ml-1 text-danger">
                      {this.state.typeOfProfVal}
                    </span>
                  </label>
                </div>
                <div id="profOtherId" className="form-group"
                style={{display: 'none'}}>
                  <label>
                    <span>Other: </span>
                    <input
                      type="text"
                      value={this.state.typeOfProfOther}
                      onChange={this.handleChangeProfOther}
                    />
                    <span className="ml-1 text-danger">
                      {this.state.typeOfProfOtherVal}
                    </span>
                  </label>
                </div>
              </div>
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
              onloadCallback={this.loadCaptcha}
              />
              <input type="submit" value="Submit" />
            </form>
            <span>
              {this.state.contactResponse}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactMeForm;
