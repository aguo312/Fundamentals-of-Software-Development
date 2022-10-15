import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
axios.defaults.withCredentials = true;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClickLogin() {
    const email = this.state.email;
    const password = this.state.password;
    axios.get("http://localhost:8000/users/" + email).then((res) => {
      if (!res.data) {
        const errorMessages = [];
        errorMessages.push("Unregistered Email!");
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        axios
          .post("http://localhost:8000/login", [email, password])
          .then((res) => {
            if (!res.data) {
              const errorMessages = [];
              errorMessages.push("Incorrect Password!");
              const error = {
                value: true,
                errors: errorMessages,
              };
              this.props.onFormError(error);
            } else {
              const error = {
                value: false,
                errors: "",
              };
              this.props.onFormError(error);
              this.props.onLoggedIn();
            }
          });
      }
    });
  }

  handleClickBack() {
    this.props.onBackClick();
  }

  render() {
    return (
      <React.Fragment>
        <form id="loginForm">
          <label>
            Email: <br />
          </label>
          <input
            id="lEmail"
            name="lEmail"
            type="text"
            onChange={this.handleEmailChange}
          ></input>
          <br />
          <br />
          <label>
            Password: <br />
          </label>
          <input
            id="lPassword"
            name="lPassword"
            type="password"
            onChange={this.handlePasswordChange}
          ></input>
          <br />
          <br />
          <input
            type="button"
            id="loginButton"
            value="Login"
            onClick={this.handleClickLogin}
          ></input>
          <br />
          <br />
          <button onClick={this.handleClickBack}>Back</button>
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  onBackClick: PropTypes.func,
  onFormError: PropTypes.func,
  onLoggedIn: PropTypes.func,
};
