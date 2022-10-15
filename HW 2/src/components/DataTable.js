import React from "react";
import PropTypes from "prop-types";
import DataTableRow from "./DataTableRow";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick(true);
  }

  handleClickOneQuestionTable(value, question) {
    this.props.onOneQuestionTableClick(value, question);
  }

  render() {
    const searchText = this.props.searchText;
    const rows = [];

    if (searchText.value) {
      const searchTargets = searchText.search.toLowerCase().split(" ");
      this.props.data.questions.forEach((questionObject) => {
        const questionTags = [];
        questionObject.tagIds.forEach((tid) => {
          for (let i = 0; i < this.props.data.tags.length; i++) {
            if (this.props.data.tags[i].tid == tid) {
              questionTags.push("[" + this.props.data.tags[i].name + "]");
              break;
            }
          }
        });
        const questionTitle = questionObject.title.toLowerCase().split(" ");
        const questionText = questionObject.text.toLowerCase().split(" ");
        const questionWordAndTag = questionTitle
          .concat(questionText)
          .concat(questionTags);
        const intersection = searchTargets.filter((search) =>
          questionWordAndTag.includes(search)
        );
        if (intersection.length > 0) {
          rows.push(
            <DataTableRow
              data={this.props.data}
              question={questionObject}
              key={questionObject.qid}
              onOneTableQuestionClick2={this.handleClickOneQuestionTable}
            />
          );
        }
      });
    } else {
      this.props.data.questions.forEach((question) => {
        rows.push(
          <DataTableRow
            data={this.props.data}
            question={question}
            key={question.qid}
            onOneTableQuestionClick2={this.handleClickOneQuestionTable}
          />
        );
      });
    }

    const numQuestions = rows.length;
    if (rows.length == 0) {
      rows.push(
        <tr key={"none"}>
          <td></td>
          <td>No Questions Found</td>
          <td></td>
        </tr>
      );
    }
    const tableTitle = searchText.value
      ? searchText.tagsOnly
        ? "Questions tagged " + searchText.search
        : "Search Results"
      : "All Questions";

    return (
      <React.Fragment>
        <table id="questions">
          <thead>
            <tr>
              <th>{numQuestions} Questions</th>
              <th>{tableTitle}</th>
              <th>
                <button onClick={this.handleClickAskQuestion}>
                  Ask A Question
                </button>
              </th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

DataTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onOneQuestionTableClick: PropTypes.func,
  searchText: PropTypes.object,
  data: PropTypes.object,
};
