import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
axios.defaults.withCredentials = true;

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleVerifyPasswordChange =
      this.handleVerifyPasswordChange.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleVerifyPasswordChange(e) {
    this.setState({ verifyPassword: e.target.value });
  }

  handleClickRegister() {
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const verifyPassword = this.state.verifyPassword;
    const emptyUsername = username.length === 0;
    const emptyEmail = email.length === 0;
    const emptyPassword = password.length === 0;
    const emptyVerifyPassword = verifyPassword.length === 0;
    const emailSplit = email.split("@");
    const emailDomain = (() => {
      if (emailSplit.length == 2) {
        return emailSplit[1];
      }
    })();
    const emailDomainSplit = (() => {
      if (emailDomain) {
        return emailDomain.split(".");
      }
    })();
    const emailDomainSplitSize = (() => {
      if (emailDomainSplit) {
        return emailDomainSplit.every((s) => s.length > 0);
      }
    })();
    const emailDomainSplitEnd = (() => {
      if (emailDomainSplit && emailDomainSplit.length >= 2) {
        return emailDomainSplit[emailDomainSplit.length - 1];
      }
    })();
    const emailDomainSplitEndSize = (() => {
      if (emailDomainSplitEnd) {
        return emailDomainSplitEnd.length >= 2;
      }
    })();
    const invalidPassword =
      password.includes(username) || password.includes(emailSplit[0]);
    const nonMatchPassword = password !== verifyPassword;
    if (
      emptyUsername ||
      emptyEmail ||
      emptyPassword ||
      emptyVerifyPassword ||
      emailSplit.length !== 2 ||
      !emailDomainSplitSize ||
      !emailDomainSplitEnd ||
      !emailDomainSplitEndSize ||
      invalidPassword ||
      nonMatchPassword
    ) {
      const errorMessages = [];
      if (emptyUsername) {
        errorMessages.push("Username is empty!");
      }
      if (emptyEmail) {
        errorMessages.push("Email is empty!");
      } else if (
        emailSplit.length !== 2 ||
        !emailDomainSplitSize ||
        !emailDomainSplitEnd ||
        !emailDomainSplitEndSize
      ) {
        errorMessages.push("Email is invalid!");
      }
      if (emptyPassword) {
        errorMessages.push("Password is empty!");
      } else if (invalidPassword) {
        errorMessages.push("Password contains the username or email id!");
      }
      if (emptyVerifyPassword) {
        errorMessages.push("Verify Password is empty!");
      }
      if (nonMatchPassword) {
        errorMessages.push("Passwords are not matching!");
      }
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      axios.get("http://localhost:8000/users/" + email).then((res) => {
        if (res.data) {
          const errorMessages = [];
          errorMessages.push("Email is already used by another user!");
          const error = {
            value: true,
            errors: errorMessages,
          };
          this.props.onFormError(error);
        } else {
          const newUser = [];
          newUser.push(username);
          newUser.push(email);
          newUser.push(password);
          axios.post("http://localhost:8000/register", newUser).then((res) => {
            const error = {
              value: false,
              errors: "",
            };
            this.props.onFormError(error);
            this.props.onLoginClick();
          });
        }
      });
    }
  }

  handleClickBack() {
    this.props.onBackClick();
  }

  render() {
    return (
      <React.Fragment>
        <form id="registerForm">
          <label>
            Username: <br />
          </label>
          <input
            id="rUsername"
            name="rUsername"
            type="text"
            onChange={this.handleUsernameChange}
          ></input>
          <br />
          <br />
          <label>
            Email: <br />
          </label>
          <input
            id="rEmail"
            name="rEmail"
            type="text"
            onChange={this.handleEmailChange}
          ></input>
          <br />
          <br />
          <label>
            Password: <br />
          </label>
          <input
            id="rPassword"
            name="rPassword"
            type="password"
            onChange={this.handlePasswordChange}
          ></input>
          <br />
          <br />
          <label>
            Verify Password: <br />
          </label>
          <input
            id="rVerifyPassword"
            name="rVerifyPassword"
            type="password"
            onChange={this.handleVerifyPasswordChange}
          ></input>
          <br />
          <br />
          <input
            type="button"
            id="registerButton"
            value="Register"
            onClick={this.handleClickRegister}
          ></input>
          <br />
          <br />
          <button onClick={this.handleClickBack}>Back</button>
        </form>
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = {
  onBackClick: PropTypes.func,
  onFormError: PropTypes.func,
  onLoginClick: PropTypes.func,
};
