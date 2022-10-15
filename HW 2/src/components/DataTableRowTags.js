import React from "react";
import PropTypes from "prop-types";

export default class DataTableRowTags extends React.Component {
  render() {
    const questionTags = this.props.question.tagIds;
    const dataTags = this.props.data.tags;
    const tagRows = [];
    let counter = 0;
    for (let j = 0; j < Math.ceil(questionTags.length / 4); j++) {
      const tagSubRow = [];
      while (counter < questionTags.length) {
        for (let k = 0; k < dataTags.length; k++) {
          if (questionTags[counter] == dataTags[k].tid) {
            tagSubRow.push(<div key={dataTags[k].tid}>{dataTags[k].name}</div>);
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
  question: PropTypes.object,
  data: PropTypes.object,
};
