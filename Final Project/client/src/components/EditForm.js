import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      text: "",
      tags: "",
      name: "",
      username: { user: { _id: "", username: "guest", reputation: 0 } },
      data: { questions: [], answers: [], tags: [] },
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSummaryChange = this.handleSummaryChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClickUpdateQuestion = this.handleClickUpdateQuestion.bind(this);
    this.handleClickDeleteQuestion = this.handleClickDeleteQuestion.bind(this);
    this.handleClickUpdateAnswer = this.handleClickUpdateAnswer.bind(this);
    this.handleClickDeleteAnswer = this.handleClickDeleteAnswer.bind(this);
    this.handleClickUpdateTag = this.handleClickUpdateTag.bind(this);
    this.handleClickDeleteTag = this.handleClickDeleteTag.bind(this);
  }

  componentDidMount() {
    let username = { user: "", guest: false };
    let data = { questions: [], answers: [], tags: [] };
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        username = { user: res.data[3], guest: res.data[4] };
        data = {
          questions: res.data[0],
          answers: res.data[1],
          tags: res.data[2],
        };
        if (this.props.dataType === "question") {
          axios
            .get("http://localhost:8000/question/" + this.props.did)
            .then((res) => {
              const dataTagNames = res.data[0].tags;
              const tagNames = [];
              dataTagNames.forEach((tagObject) => {
                tagNames.push(tagObject.name);
              });
              const tagNamesString = tagNames.join(" ");
              this.setState({
                title: res.data[0].title,
                summary: res.data[0].summary,
                text: res.data[0].text,
                tags: tagNamesString,
                username: username,
                data: data,
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        }
        if (this.props.dataType === "answer") {
          axios
            .get("http://localhost:8000/answer/" + this.props.did)
            .then((res) => {
              this.setState({
                text: res.data[0].text,
                username: username,
                data: data,
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        }
        if (this.props.dataType === "tag") {
          axios
            .get("http://localhost:8000/tag/" + this.props.did)
            .then((res) => {
              this.setState({
                name: res.data[0].name,
                username: username,
                data: data,
              });
            })
            .catch(function (err) {
              console.log(err);
            });
        }
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

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleClickUpdateQuestion() {
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
                  };
                  axios
                    .put("http://localhost:8000/updatequestion", [
                      this.props.did,
                      newQuestion,
                    ])
                    .then((res) => {
                      const error = {
                        value: false,
                        errors: "",
                      };
                      this.props.onFormError(error);
                      this.props.onProfileTabClick();
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

  handleClickDeleteQuestion() {
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
      axios
        .put("http://localhost:8000/deletequestion", [this.props.did])
        .then((res) => {
          const commentId = res.data[0];
          const tagId = res.data[1];
          const answerId = res.data[2];
          axios
            .put("http://localhost:8000/deletecomment", commentId)
            .then((res) => {
              axios
                .put("http://localhost:8000/deleteemptytag", tagId)
                .then((res) => {
                  axios
                    .put("http://localhost:8000/deleteanswer", answerId)
                    .then((res) => {
                      axios
                        .put("http://localhost:8000/deletecomment", res.data)
                        .then((res) => {
                          const error = {
                            value: false,
                            errors: "",
                          };
                          this.props.onFormError(error);
                          this.props.onProfileTabClick();
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

  handleClickUpdateAnswer() {
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
      const emptyText = this.state.text.length === 0;
      const text = this.state.text;
      if (emptyText) {
        const errorMessages = [];
        errorMessages.push("Answer Text cannot be empty!");
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        axios
          .put("http://localhost:8000/updateanswer", [this.props.did, text])
          .then((res) => {
            const error = {
              value: false,
              errors: "",
            };
            this.props.onFormError(error);
            this.props.onProfileTabClick();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }

  handleClickDeleteAnswer() {
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
      axios
        .put("http://localhost:8000/deleteanswer", [this.props.did])
        .then((res) => {
          const commentId = res.data;
          axios
            .put("http://localhost:8000/deletecomment", commentId)
            .then((res) => {
              const error = {
                value: false,
                errors: "",
              };
              this.props.onFormError(error);
              this.props.onProfileTabClick();
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

  handleClickUpdateTag() {
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
      const emptyName = this.state.name.length === 0;
      const name = this.state.name;
      if (emptyName) {
        const errorMessages = [];
        errorMessages.push("Tag Name cannot be empty!");
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        axios
          .put("http://localhost:8000/updatetag", [this.props.did, name])
          .then((res) => {
            const check = res.data;
            if (check === "fail") {
              const errorMessages = [];
              errorMessages.push("Tag Name already exists!");
              const error = {
                value: true,
                errors: errorMessages,
              };
              this.props.onFormError(error);
            }
            if (check === "done") {
              const error = {
                value: false,
                errors: "",
              };
              this.props.onFormError(error);
              this.props.onProfileTabClick();
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }

  handleClickDeleteTag() {
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
      axios
        .put("http://localhost:8000/deletetag", [this.props.did])
        .then((res) => {
          const error = {
            value: false,
            errors: "",
          };
          this.props.onFormError(error);
          this.props.onProfileTabClick();
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  render() {
    const editQuestionActive = () => {
      if (this.props.dataType === "question") {
        return (
          <React.Fragment>
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
              Add details
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
              Add keywords separated by whitespace.
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
              id="updateQuestionButton"
              value="Update Question"
              onClick={this.handleClickUpdateQuestion}
            ></input>
            <br />
            <br />
            <input
              type="button"
              id="deleteQuestionButton"
              value="Delete Question"
              onClick={this.handleClickDeleteQuestion}
            ></input>
          </React.Fragment>
        );
      }
    };

    const editAnswerActive = () => {
      if (this.props.dataType === "answer") {
        return (
          <React.Fragment>
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
            <input
              type="button"
              id="updateAnswerButton"
              value="Update Answer"
              onClick={this.handleClickUpdateAnswer}
            ></input>
            <br />
            <br />
            <input
              type="button"
              id="deleteAnswerButton"
              value="Delete Answer"
              onClick={this.handleClickDeleteAnswer}
            ></input>
          </React.Fragment>
        );
      }
    };

    const editTagActive = () => {
      if (this.props.dataType === "tag") {
        return (
          <React.Fragment>
            <label>
              <div>Tag Name</div>
              <br />
            </label>
            <textarea
              id="tName"
              name="tName"
              value={this.state.name}
              onChange={this.handleNameChange}
            ></textarea>
            <br />
            <br />
            <input
              type="button"
              id="updateTagButton"
              value="Update Tag"
              onClick={this.handleClickUpdateTag}
            ></input>
            <br />
            <br />
            <input
              type="button"
              id="deleteTagButton"
              value="Delete Tag"
              onClick={this.handleClickDeleteTag}
            ></input>
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        <form id="editForm">
          {editQuestionActive()}
          {editAnswerActive()}
          {editTagActive()}
        </form>
      </React.Fragment>
    );
  }
}

EditForm.propTypes = {
  dataType: PropTypes.string,
  did: PropTypes.string,
  onFormError: PropTypes.func,
  onProfileTabClick: PropTypes.func,
};
