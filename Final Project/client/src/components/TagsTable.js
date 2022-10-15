import React from "react";
import TagsTableRow from "./TagsTableRow";
import PropTypes from "prop-types";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class TagsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
    };
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        this.setState({
          data: {
            questions: res.data[0],
            answers: res.data[1],
            tags: res.data[2],
          },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick();
  }

  handleClickSearchByTag(tagName) {
    this.props.onSearchByTagClick(tagName);
  }

  render() {
    const numTags = this.state.data.tags.length;
    return (
      <React.Fragment>
        <table id="tags">
          <thead>
            <tr>
              <th>{numTags} Tags</th>
              <th>All Tags</th>
              <th>
                <button onClick={this.handleClickAskQuestion}>
                  Ask A Question
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <TagsTableRow
              data={this.state.data}
              onSearchByTagClick={this.handleClickSearchByTag}
            ></TagsTableRow>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

TagsTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onSearchByTagClick: PropTypes.func,
};
