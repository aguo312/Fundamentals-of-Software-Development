import React from "react";
import DataTableRow from "./DataTableRow";
import PropTypes from "prop-types";
import axios from "axios";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [], questionTagNames: [] },
    };
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
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
            questionTagNames: res.data[3],
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

  handleClickOneQuestionTable(qid) {
    this.props.onOneQuestionTableClick(qid);
  }

  render() {
    const searchText = this.props.searchText;
    const rows = [];

    if (searchText.value) {
      const searchTargets = searchText.search.toLowerCase().split(" ");
      this.state.data.questions.forEach((questionObject) => {
        const questionTags = [];
        //   questionObject.tags.forEach((tid) => {
        //     for (let i = 0; i < this.state.data.tags.length; i++) {
        //       if (this.state.data.tags[i]._id === tid) {
        //         questionTags.push("[" + this.state.data.tags[i].name + "]");
        //         break;
        //       }
        //     }
        //   });
        this.state.data.questionTagNames.forEach((tagObject) => {
          if (tagObject.qid == questionObject.qid) {
            questionTags.push("[" + tagObject.name + "]");
          }
        });
        const questionTitle = questionObject.title.toLowerCase().split(" ");
        const questionText = questionObject.text.toLowerCase().split(" ");
        const questionWordAndTag = questionTitle
          .concat(questionText)
          .concat(questionTags);
        const intersect = searchTargets.filter((search) =>
          questionWordAndTag.includes(search)
        );
        if (intersect.length > 0) {
          rows.push(
            <DataTableRow
              key={questionObject.qid}
              data={this.state.data}
              question={questionObject}
              onOneQuestionClick={this.handleClickOneQuestionTable}
            ></DataTableRow>
          );
        }
      });
    } else {
      this.state.data.questions.forEach((questionObject) => {
        rows.push(
          <DataTableRow
            key={questionObject.qid}
            data={this.state.data}
            question={questionObject}
            onOneQuestionClick={this.handleClickOneQuestionTable}
          ></DataTableRow>
        );
      });
    }

    const numQuestions = rows.length;
    if (rows.length === 0) {
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
  searchText: PropTypes.object,
  onAskQuestionClick: PropTypes.func,
  onOneQuestionTableClick: PropTypes.func,
};
