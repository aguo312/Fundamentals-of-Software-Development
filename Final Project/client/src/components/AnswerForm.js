import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      user: "",
      username: { user: { _id: "", username: "guest" }, guest: false },
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClickPostAnswer = this.handleClickPostAnswer.bind(this);
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
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleClickPostAnswer() {
    if (
      this.state.username.user === null ||
      this.state.username.user._id === ""
    ) {
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
      const user = this.state.user;
      if (emptyText) {
        const errorMessages = [];
        if (emptyText) {
          errorMessages.push("Answer Text cannot be empty!");
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
          owner: this.state.username.user._id,
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
