import axios from "axios";
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
      tagObj: [],
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
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

  handleClickPostQuestion() {
    const emptyTitle = this.state.title.length === 0;
    const emptyText = this.state.text.length === 0;
    const emptyTags = this.state.tags.length === 0;
    const invalidTitle = this.state.title.length > 100;
    const invalidUser = this.state.user.length > 15;
    const title = this.state.title;
    const text = this.state.text;
    const tags = Array.from(
      new Set(
        this.state.tags
          .toLowerCase()
          .split(" ")
          .filter((s) => s !== "")
      )
    );
    const user = this.state.user;
    if (emptyTitle || emptyText || emptyTags || invalidTitle || invalidUser) {
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
      const newTagNames = [];
      tags.forEach((tagName) => {
        if (!dataTagNames.includes(tagName)) {
          newTagNames.push(tagName);
          dataTagNames.push(tagName);
        }
      });
      axios
        .post("http://localhost:8000/newtag", newTagNames)
        .then((res) => {
          axios
            .get("http://localhost:8000/tags")
            .then((res) => {
              const dataTags = res.data;
              const tagIds = [];
              tags.forEach((tagName) => {
                const singleTag = dataTags.filter((tagObject) => {
                  return tagObject.name === tagName;
                });
                tagIds.push(singleTag[0]._id);
              });
              var newQuestion = {
                title: title,
                text: text,
                tags: tagIds,
              };
              if (user !== "") {
                newQuestion.asked_by = user;
              }
              axios
                .post("http://localhost:8000/newquestion", newQuestion)
                .then((res) => {
                  const error = {
                    value: false,
                    errors: "",
                  };
                  this.props.onFormError(error);
                  this.props.onQuestionsTabClick();
                })
                .catch(function (err) {
                  console.log(err);
                });
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
