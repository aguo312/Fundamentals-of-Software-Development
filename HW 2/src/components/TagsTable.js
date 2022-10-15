import React from "react";
import PropTypes from "prop-types";
import TagsTableRow from "./TagsTableRow";

export default class TagsTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick(true);
  }

  handleClickSearchByTag(tagName) {
    this.props.onSearchByTagClick(true, tagName);
  }

  render() {
    const numTags = this.props.data.tags.length;

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
              data={this.props.data}
              onSearchByTagClick={this.handleClickSearchByTag}
            />
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

TagsTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onSearchByTagClick: PropTypes.func,
  data: PropTypes.func,
};
