import React from "react";
import PropTypes from "prop-types";

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      tags: "",
      user: "",
      date: { on: "", at: "" },
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);
    this.handleClickPostQuestion = this.handleClickPostQuestion.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTagsChange(e) {
    this.setState({ tags: e.target.value });
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

  handleClickPostQuestion() {
    const emptyTitle = this.state.title.length == 0;
    const emptyText = this.state.text.length == 0;
    const emptyTags = this.state.tags.length == 0;
    const emptyUser = this.state.user.length == 0;
    const invalidTitle = this.state.title.length > 100;
    const invalidUser = this.state.user.length > 15;
    const title = this.state.title;
    const text = this.state.text;
    const tags = new Set(this.state.tags.toLowerCase().split(" "));
    const user = this.state.user;
    const qid = "q" + (this.props.data.questions.length + 1);
    const date = this.state.date;
    if (
      emptyTitle ||
      emptyText ||
      emptyTags ||
      emptyUser ||
      invalidTitle ||
      invalidUser
    ) {
      const errorMessages = [];
      if (emptyTitle) {
        errorMessages.push("Question Title cannot be empty!");
      }
      if (invalidTitle) {
        errorMessages.push(
          "Question Title cannot be more than 100 characters!"
        );
      }
      if (emptyText) {
        errorMessages.push("Question Text cannot be empty!");
      }
      if (emptyTags) {
        errorMessages.push("Tags cannot be empty!");
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
      const dataTagNames = [];
      this.props.data.tags.forEach((tagObject) => {
        dataTagNames.push(tagObject.name);
      });
      tags.forEach((tagName) => {
        if (!dataTagNames.includes(tagName)) {
          this.props.data.tags.push({
            tid: "t" + (this.props.data.tags.length + 1),
            name: tagName,
          });
          dataTagNames.push(tagName);
        }
      });
      const tagsIds = [];
      tags.forEach((tagName) => {
        const singleTag = this.props.data.tags.filter((tagObject) => {
          return tagObject.name == tagName;
        });
        tagsIds.push(singleTag[0].tid);
      });
      const newQuestion = {
        qid: qid,
        title: title,
        text: text,
        tagIds: tagsIds,
        askedBy: user,
        askedOn: date.on,
        askedAt: date.at,
        answers: [],
        views: 0,
      };
      const data = this.props.data;
      data.questions.unshift(newQuestion);
      const error = {
        value: false,
        errors: "",
      };
      this.props.onFormError(error);
      this.props.onQuestionsTabClick(true);
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="questionForm">
          <label>
            <div>Question Title</div>
            Title should not be more than 100 characters.
            <br />
          </label>
          <textarea
            id="qTitle"
            name="qTitle"
            value={this.state.title}
            onChange={this.handleTitleChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Question Text</div>
            Add Details
            <br />
          </label>
          <textarea
            id="qText"
            name="qText"
            value={this.state.text}
            onChange={this.handleTextChange}
          ></textarea>
          <br />
          <br />
          <br />
          <label>
            <div>Tags</div>
            Add Keywords separated by whitespace.
            <br />
          </label>
          <textarea
            id="qTags"
            name="qTags"
            value={this.state.tags}
            onChange={this.handleTagsChange}
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
            id="qUser"
            name="qUser"
            value={this.state.user}
            onChange={this.handleUserChange}
          ></textarea>
          <br />
          <br />
          <input
            type="button"
            id="postQuestionButton"
            value="Post Question"
            onMouseDown={this.handleSetDate}
            onClick={this.handleClickPostQuestion}
          ></input>
        </form>
      </React.Fragment>
    );
  }
}

QuestionForm.propTypes = {
  data: PropTypes.object,
  onFormError: PropTypes.func,
  onQuestionsTabClick: PropTypes.func,
};
