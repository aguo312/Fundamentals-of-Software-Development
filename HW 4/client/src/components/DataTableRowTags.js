import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default class DataTableRowTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTags: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/onequestiontagnames/" + this.props.qid)
      .then((res) => {
        this.setState({
          questionTags: res.data[0],
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const questionTags = this.state.questionTags;
    const tagRows = [];
    let counter = 0;
    for (let i = 0; i < Math.ceil(questionTags.length / 4); i++) {
      const tagSubRow = [];
      while (counter < questionTags.length) {
        tagSubRow.push(
          <div key={questionTags[counter].tid}>
            {questionTags[counter].name}
          </div>
        );
        counter++;
        if (tagSubRow.length === 4) {
          break;
        }
      }
      tagRows.push(
        <div className="questionsTag" key={tagRows.length}>
          {tagSubRow}
        </div>
      );
    }
    return <div>{tagRows}</div>;
  }
}

DataTableRowTags.propTypes = {
  qid: PropTypes.number,
};
