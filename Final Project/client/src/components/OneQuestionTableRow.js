import axios from "axios";
import React from "react";
import OneCommentTable from "./OneCommentTable.js";
import PropTypes from "prop-types";

export default class OneQuestionTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {
        __v: 0,
        _id: "",
        ans_by: "",
        ans_date_time: "",
        text: "",
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
      .get("http://localhost:8000/dataandanswer/" + this.props.aid)
      .then((res) => {
        this.setState({
          data: {
            questions: res.data[0],
            answers: res.data[1],
            tags: res.data[2],
          },
          answer: res.data[3],
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
      .get("http://localhost:8000/answer/" + this.props.aid)
      .then((res) => {
        this.setState({ answer: res.data[0] });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleClickUpvote() {
    const answerId = this.state.answer._id;
    const answerOwner = this.state.answer.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/upvoteanswer", [
        answerId,
        answerOwner,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandanswer/" + this.props.aid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              answer: res.data[3],
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
    const answerId = this.state.answer._id;
    const answerOwner = this.state.answer.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/downvoteanswer", [
        answerId,
        answerOwner,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandanswer/" + this.props.aid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              answer: res.data[3],
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
    const answerId = this.state.answer._id;
    const answerOwner = this.state.answer.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/undoupvoteanswer", [
        answerId,
        answerOwner,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandanswer/" + this.props.aid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              answer: res.data[3],
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
    const answerId = this.state.answer._id;
    const answerOwner = this.state.answer.owner;
    const userId = this.state.username.user._id;
    axios
      .put("http://localhost:8000/undodownvoteanswer", [
        answerId,
        answerOwner,
        userId,
      ])
      .then((res) => {
        axios
          .get("http://localhost:8000/dataandanswer/" + this.props.aid)
          .then((res) => {
            this.setState({
              data: {
                questions: res.data[0],
                answers: res.data[1],
                tags: res.data[2],
              },
              answer: res.data[3],
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
    const answer = this.state.answer;
    const text = answer.text;
    const votes = answer.upvotes.length + answer.downvotes.length;
    const ansBy = answer.ans_by;
    const localDate = new Date(answer.ans_date_time).toString();
    const ansOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const ansAt = localDate.substring(16, 21);

    const voteActive = () => {
      const upvotes = this.state.answer.upvotes;
      const downvotes = this.state.answer.downvotes;
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
        <tr>
          <td className="leftColumn">
            {votes} Votes <br />
            {voteActive()}
          </td>
          <td className="centerColumn">{text}</td>
          <td className="rightColumn">
            Ans By {ansBy}
            <br />
            On {ansOn}
            <br />
            At {ansAt}
          </td>
        </tr>
        <OneCommentTable
          page={this.state.commentPage}
          data={this.state.answer}
          did={this.state.answer._id}
          dataType="answer"
          onPrevPageClick={this.handleClickCommentPrevPage}
          onNextPageClick={this.handleClickCommentNextPage}
          onCommentEnter={this.handleEnterComment}
          onFormError={this.handleFormError}
        ></OneCommentTable>
      </React.Fragment>
    );
  }
}

OneQuestionTableRow.propTypes = {
  aid: PropTypes.string,
  data: PropTypes.object,
  onFormError: PropTypes.func,
  username: PropTypes.object,
};
