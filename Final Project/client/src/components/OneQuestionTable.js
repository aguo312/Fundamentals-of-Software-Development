import axios from "axios";
import React from "react";
import OneQuestionTableRow from "./OneQuestionTableRow";
import PropTypes from "prop-types";
import DataTableRowTags from "./DataTableRowTags";
import OneCommentTable from "./OneCommentTable";
axios.defaults.withCredentials = true;

export default class OneQuestionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      question: {
        __v: 0,
        _id: "",
        answers: [],
        ask_date_time: "",
        asked_by: "",
        rating: 0,
        summary: "",
        tags: [],
        text: "",
        title: "",
        views: 0,
        comments: [],
        upvotes: [],
        downvotes: [],
      },
      username: {
        user: { _id: "", username: "guest", owner: "" },
        guest: false,
      },
      commentPage: 0,
    };
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
    this.handleClickPrevPage = this.handleClickPrevPage.bind(this);
    this.handleClickNextPage = this.handleClickNextPage.bind(this);
    this.handleClickCommentPrevPage =
      this.handleClickCommentPrevPage.bind(this);
    this.handleClickCommentNextPage =
      this.handleClickCommentNextPage.bind(this);
    this.handleFormError = this.handleFormError.bind(this);
    this.handleEnterComment = this.handleEnterComment.bind(this);
    this.handleClickUpvote = this.handleClickUpvote.bind(this);
    this.handleClickDownvote = this.handleClickDownvote.bind(this);
    this.handleClickUndoUpvote = this.handleClickUndoUpvote.bind(this);
    this.handleClickUndoDownvote = this.handleClickUndoDownvote.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/dataandquestion/" + this.props.qid)
      .then((res) => {
        this.setState({
          data: {
            questions: res.data[0],
            answers: res.data[1],
            tags: res.data[2],
          },
          question: res.data[3],
          username: {
            user: res.data[4],
            guest: res.data[5],
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick();
  }

  handleClickAnswerQuestion() {
    this.props.onAnswerQuestionClick();
  }

  handleClickPrevPage() {
    if (this.props.page > 0) {
      this.props.onPrevPageClick();
    }
  }

  handleClickNextPage() {
    const maxPage = Math.ceil(this.state.question.answers.length / 5);
    if (this.props.page < maxPage) {
      this.props.onNextPageClick();
    }
  }

  handleClickCommentPrevPage() {
    this.setState({
      commentPage: this.state.commentPage - 1,
    });
  }

  handleClickCommentNextPage() {
    this.setState({
      commentPage: this.state.commentPage + 1,
    });
  }

  handleFormError(error) {
    this.props.onFormError(error);
  }

  handleEnterComment() {
    axios
      .get("http://localhost:8000/dataandquestion/" + this.props.qid)
      .then((res) => {
        this.setState({
          question: res.data[3],
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleClickUpvote() {
    const questionId = this.state.question._id;
    const questionOwnerId = this.state.question.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/upvotequestion", [
        questionId,
        questionOwnerId,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandquestion/" + this.props.qid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              question: res.data[3],
              username: {
                user: res.data[4],
                guest: res.data[5],
              },
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

  handleClickDownvote() {
    const questionId = this.state.question._id;
    const questionOwnerId = this.state.question.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/downvotequestion", [
        questionId,
        questionOwnerId,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandquestion/" + this.props.qid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              question: res.data[3],
              username: {
                user: res.data[4],
                guest: res.data[5],
              },
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

  handleClickUndoUpvote() {
    const questionId = this.state.question._id;
    const questionOwnerId = this.state.question.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/undoupvotequestion", [
        questionId,
        questionOwnerId,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandquestion/" + this.props.qid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              question: res.data[3],
              username: {
                user: res.data[4],
                guest: res.data[5],
              },
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

  handleClickUndoDownvote() {
    const questionId = this.state.question._id;
    const questionOwnerId = this.state.question.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/undodownvotequestion", [
        questionId,
        questionOwnerId,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandquestion/" + this.props.qid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              question: res.data[3],
              username: {
                user: res.data[4],
                guest: res.data[5],
              },
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
      const question = this.state.question;
      const numAnswers = question.answers.length;
      const title = question.title;
      const numViews = question.views;
      const votes = question.upvotes.length + question.downvotes.length;
      const text = question.text;
      const askedBy = question.asked_by;
      const localDate = new Date(question.ask_date_time).toString();
      const askedOn =
        localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
      const askedAt = localDate.substring(16, 21);
      const filteredAnswers = this.state.data.answers.filter(
        (answersObject) => {
          return question.answers.includes(answersObject._id);
        }
      );
      const rows = [];
      filteredAnswers.forEach((answerObject, index) => {
        if (index >= 5 * this.props.page && index < 5 * (this.props.page + 1)) {
          rows.push(
            <OneQuestionTableRow
              key={answerObject._id}
              data={this.state.data}
              aid={answerObject._id}
              username={this.state.username}
              onFormError={this.handleFormError}
            ></OneQuestionTableRow>
          );
        }
      });

      let maxPage = Math.ceil(this.state.question.answers.length / 5);
      if (maxPage === 0) maxPage = 1;

      const prevButtonActive = () => {
        if (this.props.page > 0) {
          return <button onClick={this.handleClickPrevPage}>Prev</button>;
        }
      };

      const nextButtonActive = () => {
        if (
          this.props.page + 1 <
          Math.ceil(this.state.question.answers.length / 5)
        ) {
          return <button onClick={this.handleClickNextPage}>Next</button>;
        }
      };

      const answerQuestionButtonActive = () => {
        if (!this.state.username.guest) {
          return (
            <button
              id="oneQuestionButton"
              onClick={this.handleClickAnswerQuestion}
            >
              Answer Question
            </button>
          );
        } else {
          return (
            <button
              id="oneQuestionButton"
              hidden={true}
              onClick={this.handleClickAnswerQuestion}
            >
              Answer Question
            </button>
          );
        }
      };

      const voteActive = () => {
        const upvotes = this.state.question.upvotes;
        const downvotes = this.state.question.downvotes;
        const userId = this.state.username.user._id;
        if (this.state.username.user.reputation >= 100) {
          if (!upvotes.includes(userId) && !downvotes.includes(userId)) {
            return (
              <React.Fragment>
                <input
                  type="button"
                  id="upvoteButton"
                  value="Upvote"
                  onClick={this.handleClickUpvote}
                ></input>
                <br />
                <input
                  type="button"
                  id="downvoteButton"
                  value="Downvote"
                  onClick={this.handleClickDownvote}
                ></input>
              </React.Fragment>
            );
          } else if (upvotes.includes(userId)) {
            return (
              <input
                type="button"
                id="undoUpvoteButton"
                value="Undo Upvote"
                onClick={this.handleClickUndoUpvote}
              ></input>
            );
          } else if (downvotes.includes(userId)) {
            return (
              <input
                type="button"
                id="undoDownvoteButton"
                value="Undo Downvote"
                onClick={this.handleClickUndoDownvote}
              ></input>
            );
          }
        }
      };

      return (
        <React.Fragment>
          <table id="oneQuestion">
            <thead>
              <tr>
                <th>{voteActive()}</th>
                <th>{title}</th>
                <th>
                  {numAnswers} Answers
                  <br />
                  {numViews} Views
                  <br />
                  {votes} Votes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="leftColumn">
                  <div>
                    <DataTableRowTags
                      data={this.state.data}
                      question={this.state.question}
                    ></DataTableRowTags>
                  </div>
                </td>
                <td className="centerColumn">{text}</td>
                <td className="rightColumn">
                  Asked By {askedBy}
                  <br />
                  On {askedOn}
                  <br />
                  At {askedAt}
                </td>
              </tr>
              <OneCommentTable
                page={this.state.commentPage}
                data={this.state.question}
                did={this.state.question._id}
                dataType="question"
                onPrevPageClick={this.handleClickCommentPrevPage}
                onNextPageClick={this.handleClickCommentNextPage}
                onCommentEnter={this.handleEnterComment}
                onFormError={this.handleFormError}
              ></OneCommentTable>
              {rows}
            </tbody>
          </table>
          <br />
          <div className="answerFooter">
            {answerQuestionButtonActive()}
            <br />
            {prevButtonActive()} Answers Page {this.props.page + 1} of {maxPage}{" "}
            {nextButtonActive()}
          </div>
        </React.Fragment>
      );
    }
  }
}

OneQuestionTable.propTypes = {
  onAnswerQuestionClick: PropTypes.func,
  onAskQuestionClick: PropTypes.func,
  onFormError: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onOneQuestionTableClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
  onQuestionsTabClick: PropTypes.func,
  page: PropTypes.number,
  qid: PropTypes.string,
};
