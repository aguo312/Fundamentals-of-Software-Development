import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
axios.defaults.withCredentials = true;

export default class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      text: "",
      tags: "",
      tagObj: [],
      username: {
        user: { _id: "", username: "guest", reputation: 0 },
        guest: false,
      },
      data: { tags: [] },
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleClickPostQuestion = this.handleClickPostQuestion.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        this.setState({
          data: {
            tags: res.data[2],
          },
          username: {
            user: res.data[3],
            guest: res.data[4],
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleSummaryChange(e) {
    this.setState({ summary: e.target.value });
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
    if (this.state.username.user === null) {
      const errorMessages = [];
      errorMessages.push(
        "Your current session has expired. Please log in again!"
      );
      const error = {
        value: true,
        errors: errorMessages,
      };
      this.props.onFormError(error);
    } else {
      const emptyTitle = this.state.title.length === 0;
      const emptySummary = this.state.summary.length === 0;
      const emptyText = this.state.text.length === 0;
      const emptyTags = this.state.tags.length === 0;
      const invalidTitle = this.state.title.length > 50;
      const invalidSummary = this.state.summary.length > 140;
      const invalidReputaion = this.state.username.user.reputation < 100;
      const title = this.state.title;
      const summary = this.state.summary;
      const text = this.state.text;
      const tags = Array.from(
        new Set(
          this.state.tags
            .toLowerCase()
            .split(" ")
            .filter((s) => s !== "")
        )
      );
      const dataTagNames = [];
      this.state.data.tags.forEach((tagObject) => {
        dataTagNames.push(tagObject.name);
      });
      const newTagObjects = [];
      tags.forEach((tagName) => {
        if (!dataTagNames.includes(tagName)) {
          const newTagObject = {
            name: tagName,
            owner: this.state.username.user._id,
          };
          newTagObjects.push(newTagObject);
          dataTagNames.push(tagName);
        }
      });

      if (invalidReputaion && newTagObjects.length > 0) {
        const errorMessages = [];
        errorMessages.push(
          "You do not have enough reputation to create new tags!"
        );
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        if (
          emptyTitle ||
          emptySummary ||
          emptyText ||
          emptyTags ||
          invalidTitle ||
          invalidSummary
        ) {
          const errorMessages = [];
          if (emptyTitle) {
            errorMessages.push("Question Title cannot be empty!");
          }
          if (invalidTitle) {
            errorMessages.push(
              "Question Title cannot be more than 50 characters!"
            );
          }
          if (emptySummary) {
            errorMessages.push("Question Summary cannot be empty!");
          }
          if (invalidSummary) {
            errorMessages.push(
              "Question Summary cannot be more than 140 characters!"
            );
          }
          if (emptyText) {
            errorMessages.push("Question Text cannot be empty!");
          }
          if (emptyTags) {
            errorMessages.push("Tags cannot be empty!");
          }
          const error = {
            value: true,
            errors: errorMessages,
          };
          this.props.onFormError(error);
        } else {
          axios
            .post("http://localhost:8000/newtag", newTagObjects)
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
                    summary: summary,
                    text: text,
                    tags: tagIds,
                    asked_by: this.state.username.user.username,
                    owner: this.state.username.user._id,
                  };
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
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="questionForm">
          <label>
            <div>Question Title</div>
            Title should not be more than 50 characters.
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
            <div>Question Summary</div>
            Summary should not be more than 140 characters.
            <br />
          </label>
          <textarea
            id="qSummary"
            name="qSummary"
            value={this.state.summary}
            onChange={this.handleSummaryChange}
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
