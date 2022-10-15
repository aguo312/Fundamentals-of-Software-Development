import axios from "axios";
import React from "react";
import OneQuestionTableRow from "./OneQuestionTableRow";
import PropTypes from "prop-types";

export default class OneQuestionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: { questions: [], answers: [], tags: [] },
      // question: {
      //   __v: 0,
      //   _id: "",
      //   answers: [],
      //   ask_date_time: "",
      //   asked_by: "",
      //   tags: [],
      //   text: "",
      //   title: "",
      //   views: 0,
      // },
      question: {
        qid: 0,
        title: "",
        text: "",
        ask_date_time: "",
        asked_by: "",
        views: 0,
      },
      answers: [],
    };
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/onequestiondata/" + this.props.qid)
      .then((res) => {
        this.setState({
          question: res.data[0][0],
          answers: res.data[1],
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

  render() {
    const question = this.state.question;
    const numAnswers = this.state.answers.length;
    const title = question.title;
    const numViews = question.views;
    const text = question.text;
    const askedBy = question.asked_by;
    const localDate = new Date(question.ask_date_time).toString();
    const askedOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const askedAt = localDate.substring(16, 21);
    const rows = [];
    this.state.answers.forEach((answerObject) => {
      rows.push(
        <OneQuestionTableRow
          key={answerObject.aid}
          answer={answerObject}
        ></OneQuestionTableRow>
      );
    });
    return (
      <React.Fragment>
        <table id="oneQuestion">
          <thead>
            <tr>
              <th>{numAnswers} Answers</th>
              <th>{title}</th>
              <th>
                <button onClick={this.handleClickAskQuestion}>
                  Ask A Question
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="leftColumn">{numViews} Views</td>
              <td className="centerColumn">{text}</td>
              <td className="rightColumn">
                Asked By {askedBy}
                <br />
                On {askedOn}
                <br />
                At {askedAt}
              </td>
            </tr>
            {rows}
          </tbody>
        </table>
        <br />
        <button id="oneQuestionButton" onClick={this.handleClickAnswerQuestion}>
          Answer Question
        </button>
      </React.Fragment>
    );
  }
}

OneQuestionTable.propTypes = {
  qid: PropTypes.number,
  onAskQuestionClick: PropTypes.func,
  onAnswerQuestionClick: PropTypes.func,
};
