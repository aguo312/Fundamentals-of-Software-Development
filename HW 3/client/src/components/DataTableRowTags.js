import React from "react";
import PropTypes from "prop-types";

export default class DataTableRowTags extends React.Component {
  render() {
    const questionTags = this.props.question.tags;
    const dataTags = this.props.data.tags;
    const tagRows = [];
    let counter = 0;
    for (let i = 0; i < Math.ceil(questionTags.length / 4); i++) {
      const tagSubRow = [];
      while (counter < questionTags.length) {
        for (let j = 0; j < dataTags.length; j++) {
          if (questionTags[counter] == dataTags[j]._id) {
            tagSubRow.push(<div key={dataTags[j]._id}>{dataTags[j].name}</div>);
            break;
          }
        }
        if (tagSubRow.length == 4) {
          counter++;
          break;
        }
        counter++;
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
  data: PropTypes.object,
  question: PropTypes.object,
};
