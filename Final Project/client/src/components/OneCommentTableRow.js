import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

export default class OneCommentTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        __v: 0,
        _id: "",
        text: "",
        comment_date_time: "",
        commented_by: "",
        owner: "",
      },
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/comment/" + this.props.cid)
      .then((res) => {
        this.setState({ comment: res.data[0] });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const comment = this.state.comment;
    const text = comment.text;
    const commentBy = comment.commented_by;
    const localDate = new Date(comment.comment_date_time).toString();
    const commentOn =
      localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
    const commentAt = localDate.substring(16, 21);

    return (
      <tr>
        <td colSpan="2" className="leftColumn">
          <i>{text}</i>
        </td>
        <td className="rightColumn">
          Commented By {commentBy}
          <br />
          On {commentOn}
          <br />
          At {commentAt}
        </td>
      </tr>
    );
  }
}

OneCommentTableRow.propTypes = {
  cid: PropTypes.string,
};
