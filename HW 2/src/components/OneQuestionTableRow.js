import React from "react";
import PropTypes from "prop-types";

export default class OneQuestionTableRow extends React.Component {
  render() {
    const targetAnswer = this.props.data.answers.filter((answerObject) => {
      return answerObject.aid == this.props.ansId;
    });

    const text = targetAnswer[0].text;
    const ansBy = targetAnswer[0].ansBy;
    const ansOn = targetAnswer[0].ansOn;
    const ansAt = targetAnswer[0].ansAt;

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
  data: PropTypes.object,
  ansId: PropTypes.string,
};
