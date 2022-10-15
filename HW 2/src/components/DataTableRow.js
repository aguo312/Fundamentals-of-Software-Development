import React from "react";
import PropTypes from "prop-types";
import DataTableRowTags from "./DataTableRowTags";

export default class DataTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOpenQuestion2 = this.handleClickOpenQuestion2.bind(this);
  }

  handleClickOpenQuestion2() {
    const question = this.props.question;
    question.views++;
    this.props.onOneTableQuestionClick2(true, question);
  }

  render() {
    const question = this.props.question;
    const views = question.views;
    const answers = question.answers.length;
    const title = question.title;
    const askedBy = question.askedBy;
    const askedOn = question.askedOn;
    const askedAt = question.askedAt;

    return (
      <tr>
        <td className="leftColumn">
          {views} Views
          <br />
          {answers} Answers
        </td>
        <td className="centerColumn">
          <a
            className="titleLink"
            href="#"
            onClick={this.handleClickOpenQuestion2}
          >
            {title}
          </a>
          <div>
            <DataTableRowTags data={this.props.data} question={question} />
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
  question: PropTypes.object,
  onOneTableQuestionClick2: PropTypes.func,
  data: PropTypes.object,
};
