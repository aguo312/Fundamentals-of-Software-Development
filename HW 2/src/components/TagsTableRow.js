import React from "react";
import PropTypes from "prop-types";

export default class TagsTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
    };
    this.handleSetTagName = this.handleSetTagName.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
  }

  handleSetTagName(e) {
    this.setState({ tagName: "[" + e.currentTarget.id + "]" });
  }

  handleClickSearchByTag() {
    this.props.onSearchByTagClick(this.state.tagName);
  }

  render() {
    const tags = this.props.data.tags;

    const tagTable = [];
    let i = 0;
    while (i < tags.length) {
      const tagRow = [];

      for (let j = 0; j < 3; j++) {
        if (i < tags.length) {
          const name = tags[i].name;
          const id = tags[i].tid;
          const numQuestions = getNumQuestions(
            tags[i].tid,
            this.props.data.questions
          );
          tagRow.push(
            <td key={id}>
              <a
                href="#"
                id={name}
                onMouseDown={this.handleSetTagName}
                onClick={this.handleClickSearchByTag}
              >
                {name}
              </a>
              <div>{numQuestions} Questions</div>
            </td>
          );
          i++;
        }
      }
      tagTable.push(<tr key={tagTable.length}>{tagRow}</tr>);
    }
    return <React.Fragment>{tagTable}</React.Fragment>;
  }
}

function getNumQuestions(tagId, questions) {
  let sum = 0;
  questions.forEach((questionsObject) => {
    if (questionsObject.tagIds.includes(tagId)) {
      sum++;
    }
  });
  return sum;
}

TagsTableRow.propTypes = {
  onSearchByTagClick: PropTypes.func,
  data: PropTypes.object,
};
