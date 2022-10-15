import axios from "axios";
import React from "react";
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
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/answer/" + this.props.aid)
      .then((res) => {
        this.setState({ answer: res.data[0] });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const answer = this.state.answer;
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
  data: PropTypes.object,
  aid: PropTypes.string,
};
