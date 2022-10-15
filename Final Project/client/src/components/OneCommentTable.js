import axios from "axios";
import React from "react";
import OneCommentTableRow from "./OneCommentTableRow";
import PropTypes from "prop-types";

export default class OneCommentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      username: {
        user: { _id: "", username: "guest", reputation: 0 },
        guest: false,
      },
      user: "",
      data: { data: { comments: [], _id: "" }, comments: [] },
    };
    this.handleClickPrevPage = this.handleClickPrevPage.bind(this);
    this.handleClickNextPage = this.handleClickNextPage.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentEnter = this.handleCommentEnter.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        this.setState({
          username: {
            user: res.data[3],
            guest: res.data[4],
          },
          user: res.data[3].username,
          data: { comments: res.data[5] },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.comments.length !== this.props.data.comments.length) {
      axios
        .get("http://localhost:8000/alldata")
        .then((res) => {
          this.setState({
            data: { comments: res.data[5] },
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }

  handleClickPrevPage() {
    if (this.props.page > 0) {
      this.props.onPrevPageClick();
    }
  }

  handleClickNextPage() {
    const maxPage = Math.ceil(this.props.data.comments.length / 3);
    if (this.props.page < maxPage) {
      this.props.onNextPageClick();
    }
  }

  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }

  handleCommentEnter(e) {
    if (e.keyCode === 13) {
      const emptyComment = this.state.comment.length === 0;
      const invalidComment = this.state.comment.length > 140;
      const invalidReputation = this.state.username.user.reputation < 100;
      const comment = this.state.comment;
      const user = this.state.username;
      if (emptyComment || invalidComment) {
        const errorMessages = [];
        if (emptyComment) {
          errorMessages.push("Comment cannot be empty!");
        }
        if (invalidComment) {
          errorMessages.push("Comment cannot be more than 140 characters!");
        }
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else if (invalidReputation) {
        const errorMessages = [];
        errorMessages.push(
          "User needs at least 100 reputation to add a comment!"
        );
        const error = {
          value: true,
          errors: errorMessages,
        };
        this.props.onFormError(error);
      } else {
        var newComment = {
          text: comment,
          commented_by: user.user.username,
          owner: user.user._id,
        };
        axios
          .post("http://localhost:8000/newcomment", newComment)
          .then((res) => {
            newComment = res.data;
            const dataId = this.props.data._id;
            if (this.props.dataType === "question") {
              axios
                .put("http://localhost:8000/addcommenttoquestion", [
                  newComment,
                  dataId,
                ])
                .then((res) => {
                  const error = {
                    value: false,
                    errors: "",
                  };
                  this.props.onFormError(error);
                  this.props.onCommentEnter();
                })
                .catch(function (err) {
                  console.log(err);
                });
            } else if (this.props.dataType === "answer") {
              axios
                .put("http://localhost:8000/addcommenttoanswer", [
                  newComment,
                  dataId,
                ])
                .then((res) => {
                  const error = {
                    value: false,
                    errors: "",
                  };
                  this.props.onFormError(error);
                  this.props.onCommentEnter();
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
    }
  }

  render() {
    const dataCommentsLength = this.props.data.comments.length;
    let maxPage = Math.ceil(dataCommentsLength / 3);
    if (maxPage === 0) maxPage = 1;

    const filteredComments = this.state.data.comments.filter(
      (commentObject) => {
        return this.props.data.comments.includes(commentObject._id);
      }
    );

    const rows = [];
    filteredComments.forEach((commentObject, index) => {
      if (index >= 3 * this.props.page && index < 3 * (this.props.page + 1)) {
        rows.push(
          <OneCommentTableRow
            key={commentObject._id}
            cid={commentObject._id}
          ></OneCommentTableRow>
        );
      }
    });

    const prevButtonActive = () => {
      if (this.props.page > 0) {
        return <button onClick={this.handleClickPrevPage}>Prev</button>;
      }
    };

    const nextButtonActive = () => {
      if (
        this.props.page + 1 <
        Math.ceil(this.props.data.comments.length / 3)
      ) {
        return <button onClick={this.handleClickNextPage}>Next</button>;
      }
    };

    const addCommentActive = () => {
      if (!this.state.username.guest) {
        return (
          <React.Fragment>
            <label>Add comment: </label>
            <input
              id="comment"
              name="comment"
              type="text"
              size="50"
              placeholder="Press enter to add new comment ..."
              onChange={this.handleCommentChange}
              onKeyUp={this.handleCommentEnter}
            ></input>
          </React.Fragment>
        );
      }
    };

    return (
      <React.Fragment>
        {rows}
        <tr>
          <td colSpan="3">
            <table id="commentTable"></table>
            <br />
            <div>
              {prevButtonActive()} Comments Page {this.props.page + 1} of{" "}
              {maxPage} {nextButtonActive()}
            </div>
            {/* <form id="commentForm"> */}
            {addCommentActive()}
            {/* <input
                type="button"
                id="commentButton"
                value="Add Comment"
                onClick={this.handleClickAddComment}
              ></input> */}
            {/* </form> */}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

OneCommentTable.propTypes = {
  data: PropTypes.array,
  dataType: PropTypes.string,
  did: PropTypes.string,
  onCommentEnter: PropTypes.func,
  onFormError: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
  page: PropTypes.number,
};
