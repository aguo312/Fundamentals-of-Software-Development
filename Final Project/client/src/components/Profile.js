import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
axios.defaults.withCredentials = true;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      username: { user: { username: "guest " }, guest: false },
      showEditForm: false,
    };
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        this.setState({
          data: {
            questions: res.data[0],
            answers: res.data[1],
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

  handleClickEdit(dataType, did) {
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
      this.props.onEditClick(dataType, did);
    }
  }

  render() {
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
      const username = this.state.username.user.username;
      const localDate = new Date(
        this.state.username.user.time_created
      ).toString();
      const created =
        localDate.substring(4, 10) +
        ", " +
        localDate.substring(11, 15) +
        " at " +
        localDate.substring(16, 21);
      const reputation = this.state.username.user.reputation;
      const filteredQuestions = this.state.data.questions.filter(
        (questionObject) => {
          return questionObject.owner === this.state.username.user._id;
        }
      );
      const filteredAnswers = this.state.data.answers.filter((answerObject) => {
        return answerObject.owner === this.state.username.user._id;
      });
      const filteredTags = this.state.data.tags.filter((tagObject) => {
        return tagObject.owner === this.state.username.user._id;
      });
      const questionsRow = [];
      filteredQuestions.forEach((questionObject) => {
        questionsRow.push(
          <tr key={questionObject._id}>
            <td>{questionObject.title}</td>
            <td>
              <button
                onClick={() =>
                  this.handleClickEdit("question", questionObject._id)
                }
              >
                Edit
              </button>
            </td>
          </tr>
        );
      });
      const numQuestions = questionsRow.length;
      if (numQuestions === 0) {
        questionsRow.push(
          <tr key={"none"}>
            <td colSpan="2">No Questions Created</td>
          </tr>
        );
      }
      const answersRow = [];
      filteredAnswers.forEach((answerObject) => {
        answersRow.push(
          <tr key={answerObject._id}>
            <td>{answerObject.text}</td>
            <td>
              <button
                onClick={() => this.handleClickEdit("answer", answerObject._id)}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      });
      const numAnswers = answersRow.length;
      if (numAnswers === 0) {
        answersRow.push(
          <tr key={"none"}>
            <td colSpan="2">No Answers Created</td>
          </tr>
        );
      }
      const tagsRow = [];
      filteredTags.forEach((tagObject) => {
        tagsRow.push(
          <tr key={tagObject._id}>
            <td>{tagObject.name}</td>
            <td>
              <button
                onClick={() => this.handleClickEdit("tag", tagObject._id)}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      });
      const numTags = tagsRow.length;
      if (numTags === 0) {
        tagsRow.push(
          <tr key={"none"}>
            <td colSpan="2">No Tags Created</td>
          </tr>
        );
      }

      return (
        <React.Fragment>
          <h1>{username}'s Profile</h1>
          <div>Account Created: {created}</div>
          <div>Reputation: {reputation}</div>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  <h2>Created Questions: ({numQuestions})</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Question Title</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {questionsRow}
            </tbody>
          </table>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  <h2>Created Answers: ({numAnswers})</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Answer Text</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {answersRow}
            </tbody>
          </table>
          <br />
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  <h2>Created Tags: ({numTags})</h2>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h3>Tag Name</h3>
                </td>
                <td>
                  <h3>Edit</h3>
                </td>
              </tr>
              {tagsRow}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

Profile.propTypes = {
  onEditClick: PropTypes.func,
  onFormError: PropTypes.func,
};
