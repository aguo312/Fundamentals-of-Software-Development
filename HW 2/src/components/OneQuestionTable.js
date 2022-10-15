import React from "react";
import PropTypes from "prop-types";
import OneQuestionTableRow from "./OneQuestionTableRow";

export default class OneQuestionTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick(true);
  }

  handleClickAnswerQuestion() {
    this.props.onAnswerQuestionClick(true);
  }

  render() {
    const question = this.props.question;
    const numAnswers = question.answers.length;
    const title = question.title;
    const numViews = question.views;
    const text = question.text;
    const askedBy = question.askedBy;
    const askedOn = question.askedOn;
    const askedAt = question.askedAt;
    const answers = this.props.data.answers;

    const rows = [];
    question.answers.sort(function (a, b) {
      return dateSort(a, b, answers);
    });
    question.answers.forEach((ansId) => {
      rows.push(
        <OneQuestionTableRow data={this.props.data} ansId={ansId} key={ansId} />
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

function dateSort(a, b, answers) {
  let objA = answers[0];
  let objB = answers[0];
  answers.forEach((answersObject) => {
    if (answersObject.aid == a) {
      objA = answersObject;
    }
    if (answersObject.aid == b) {
      objB = answersObject;
    }
  });
  const aYear = Number(objA.ansOn.substring(8));
  const aMonth = monthToNumber(objA.ansOn.substring(0, 3));
  const aDay = Number(objA.ansOn.substring(4, 6));
  const aHour = Number(objA.ansAt.substring(0, 2));
  const aMinute = Number(objA.ansAt.substring(3));
  const bYear = Number(objB.ansOn.substring(8));
  const bMonth = monthToNumber(objB.ansOn.substring(0, 3));
  const bDay = Number(objB.ansOn.substring(4, 6));
  const bHour = Number(objB.ansAt.substring(0, 2));
  const bMinute = Number(objB.ansAt.substring(3));
  if (aYear > bYear) {
    return -1;
  }
  if (aYear < bYear) {
    return 1;
  }
  if (aMonth > bMonth) {
    return -1;
  }
  if (aMonth < bMonth) {
    return 1;
  }
  if (aDay > bDay) {
    return -1;
  }
  if (aDay < bDay) {
    return 1;
  }
  if (aHour > bHour) {
    return -1;
  }
  if (aHour < bHour) {
    return 1;
  }
  if (aMinute > bMinute) {
    return -1;
  }
  if (aMinute > bMinute) {
    return 1;
  }
  return 0;
}

function monthToNumber(monthName) {
  if (monthName == "Jan") {
    return 1;
  }
  if (monthName == "Feb") {
    return 2;
  }
  if (monthName == "Mar") {
    return 3;
  }
  if (monthName == "Apr") {
    return 4;
  }
  if (monthName == "May") {
    return 5;
  }
  if (monthName == "Jun") {
    return 6;
  }
  if (monthName == "Jul") {
    return 7;
  }
  if (monthName == "Aug") {
    return 8;
  }
  if (monthName == "Sep") {
    return 9;
  }
  if (monthName == "Oct") {
    return 10;
  }
  if (monthName == "Nov") {
    return 11;
  }
  return 12;
}

OneQuestionTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onAnswerQuestionClick: PropTypes.func,
  question: PropTypes.object,
  data: PropTypes.object,
  answers: PropTypes.array,
};
