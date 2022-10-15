import React from "react";
import PropTypes from "prop-types";

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      user: "",
      date: { on: "", at: "" },
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleClickPostAnswer = this.handleClickPostAnswer.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleUserChange(e) {
    this.setState({ user: e.target.value });
  }

  handleSetDate() {
    const date = new Date();
    const month = date.toLocaleDateString("default", { month: "short" });
    let day = date.getDate().toString();
    const year = date.getFullYear();
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    if (day.length == 1) {
      day = "0" + day;
    }
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    if (minute.length == 1) {
      minute = "0" + minute;
    }
    const newDate = {
      on: month + " " + day + ", " + year,
      at: hour + ":" + minute,
    };
    this.setState({ date: newDate });
  }

  handleClickPostAnswer() {
    const emptyText = this.state.text.length == 0;
    const invalidUser = this.state.user.length > 15;
    const text = this.state.text;
    const user = this.state.user;
    const aid = "a" + (this.props.data.answers.length + 1);
    const date = this.state.date;
    if (emptyText || invalidUser) {
      const errorMessages = [];

      if (emptyText) {
        errorMessages.push("Question Text cannot be empty!");
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
      const newAnswer = {
        aid: aid,
        ansAt: date.at,
        ansBy: user,
        ansOn: date.on,
        text: text,
      };
      const data = this.props.data;
      data.answers.unshift(newAnswer);
      const error = {
        value: false,
        errors: "",
      };
      this.props.question.answers.unshift(newAnswer.aid);
      this.props.onFormError(error);
      this.props.onOneQuestionTableClick(true, this.props.question);
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="answerForm">
          <label>
            <div>Answer Text</div>
            Title should not be more than 100 characters.
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
            onMouseDown={this.handleSetDate}
            onClick={this.handleClickPostAnswer}
          ></input>
        </form>
      </React.Fragment>
    );
  }
}

AnswerForm.propTypes = {
  data: PropTypes.object,
  onFormError: PropTypes.func,
  question: PropTypes.object,
  onOneQuestionTableClick: PropTypes.object,
};
