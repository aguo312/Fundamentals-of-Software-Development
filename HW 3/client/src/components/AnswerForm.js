import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      user: "",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleClickPostAnswer = this.handleClickPostAnswer.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleUserChange(e) {
    this.setState({ user: e.target.value });
  }

  handleClickPostAnswer() {
    const emptyText = this.state.text.length == 0;
    const emptyUser = this.state.user.length == 0;
    const invalidUser = this.state.user.length > 15;
    const text = this.state.text;
    const user = this.state.user;
    if (emptyText || emptyUser || invalidUser) {
      const errorMessages = [];
      if (emptyText) {
        errorMessages.push("Answer Text cannot be empty!");
      }
      if (emptyUser) {
        errorMessages.push("Username cannot be empty!");
      }
      if (invalidUser) {
        errorMessages.push("Username cannot be more than 15 characters!");
      }
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      var newAnswer = {
        text: text,
        ans_by: user,
      };
      axios
        .post("http://localhost:8000/newanswer", newAnswer)
        .then((res) => {
          newAnswer = res.data;
          axios
            .put("http://localhost:8000/addanswertoquestion", [
              newAnswer,
              this.props.qid,
            ])
            .then((res) => {
              const error = {
                value: false,
                errors: "",
              };
              this.props.onFormError(error);
              this.props.onOneQuestionTableClick(this.props.qid);
            })
            .catch(function (err) {
              console.log(err);
            });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="answerForm">
          <label>
            <div>Answer Text</div>
            <br />
          </label>
          <textarea
            id="aText"
            name="aText"
            value={this.state.text}
            onChange={this.handleTextChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Username</div>
            Should not be more than 15 characters.
            <br />
          </label>
          <textarea
            id="aUser"
            name="aUser"
            value={this.state.user}
            onChange={this.handleUserChange}
          ></textarea>
          <br />
          <br />
          <input
            type="button"
            id="postAnswerButton"
            value="Post Answer"
            onClick={this.handleClickPostAnswer}
          ></input>
        </form>
      </React.Fragment>
    );
  }
}

AnswerForm.propTypes = {
  qid: PropTypes.string,
  onFormError: PropTypes.func,
  onOneQuestionTableClick: PropTypes.func,
};
