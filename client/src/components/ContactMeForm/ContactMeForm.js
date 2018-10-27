import React, { Component } from 'react';
import "./ContactMeForm.css";

class ContactMeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameValidation: '',
      email: '',
      emailValidation: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });

  }

  handleSubmit(event) {
    let emailCheck = this.validateEmail(this.state.email);
    let nameCheck = (this.state.name.length > 0);

    if (!nameCheck) {
      this.setState({ nameValidation: "Please enter a valid name." })
    } else {
      this.setState({ nameValidation: "" })  
    };

    if (!emailCheck) {
      this.setState({ emailValidation: "Please enter a valid email address." })
    } else {
      this.setState({ emailValidation: "" })
    };

    if (nameCheck && emailCheck) {
      alert(`Hi ${this.state.name}. Contact page is under construction. In the mean time please visit eric-ng.io, sorry for the inconvenience. Or contact me at my email hello@eric-ng.io`);
    }

    event.preventDefault();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    return (
      <div id="contactMeId" className="parallax-bg contactMe_bg-img1 py-5">
        <h2 className="text-center pb-5">Message Me!</h2>
        <div className="row justify-content-center ">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <label className='d-block'>
                Name:
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChangeName}
                />
                <span className="ml-1 text-danger">
                  {this.state.nameValidation}
                </span>
              </label>
              <label className='d-block'>
                Email:
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
                <span className="ml-1 text-danger">
                  {this.state.emailValidation}
                </span>
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactMeForm;
