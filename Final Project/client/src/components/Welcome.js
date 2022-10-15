import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
axios.defaults.withCredentials = true;

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickGuest = this.handleClickGuest.bind(this);
  }

  handleClickLogin() {
    this.props.onLoginClick();
  }

  handleClickRegister() {
    this.props.onRegisterClick();
  }

  handleClickGuest() {
    axios.post("http://localhost:8000/guestlogin").then((res) => {
      this.props.onGuestClick();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>Welcome to Fake Stack Overflow</div>
        <br />
        <div>
          <button onClick={this.handleClickLogin}>Login</button>
        </div>
        <br />
        <div>
          <button onClick={this.handleClickRegister}>Register</button>
        </div>
        <br />
        <div>
          <button onClick={this.handleClickGuest}>Continue As Guest</button>
        </div>
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  onGuestClick: PropTypes.func,
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
};
