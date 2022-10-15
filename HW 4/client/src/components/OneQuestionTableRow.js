import React from "react";
import PropTypes from "prop-types";

export default class OneQuestionTableRow extends React.Component {
  render() {
    const answer = this.props.answer;
    const text = answer.text;
    const ansBy = answer.ans_by;
    const localDate = new Date(answer.ans_date_time).toString();
    const ansOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const ansAt = localDate.substring(16, 21);
    return (
      <tr>
        <td colSpan="2" className="leftColumn">
          {text}
        </td>
        <td className="rightColumn">
          Ans By {ansBy}
          <br />
          On {ansOn}
          <br />
          At {ansAt}
        </td>
      </tr>
    );
  }
}

OneQuestionTableRow.propTypes = {
  answer: PropTypes.object,
};
