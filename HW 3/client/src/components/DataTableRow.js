import axios from "axios";
import React from "react";
import DataTableRowTags from "./DataTableRowTags";
import PropTypes from "prop-types";

export default class DataTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpenQuestion = this.handleClickOpenQuestion.bind(this);
  }

  handleClickOpenQuestion() {
    const question = this.props.question;
    axios
      .put("http://localhost:8000/questionclick", question)
      .then((res) => this.props.onOneQuestionClick(res.data))
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const question = this.props.question;
    const views = question.views;
    const answers = question.answers.length;
    const title = question.title;
    const askedBy = question.asked_by;
    const localDate = new Date(question.ask_date_time).toString();
    const askedOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const askedAt = localDate.substring(16, 21);
    return (
      <tr>
        <td className="leftColumn">
          {views} Views <br />
          {answers} Answers
        </td>
        <td className="centerColumn">
          <a
            href="#"
            className="titleLink"
            onClick={this.handleClickOpenQuestion}
          >
            {title}
          </a>
          <div>
            <DataTableRowTags
              data={this.props.data}
              question={question}
            ></DataTableRowTags>
          </div>
        </td>
        <td className="rightColumn">
          Asked By {askedBy}
          <br />
          On {askedOn}
          <br />
          At {askedAt}
        </td>
      </tr>
    );
  }
}

DataTableRow.propTypes = {
  data: PropTypes.object,
  question: PropTypes.object,
  onOneQuestionClick: PropTypes.func,
};
