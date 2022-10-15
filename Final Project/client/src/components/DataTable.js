import React from "react";
import DataTableRow from "./DataTableRow";
import PropTypes from "prop-types";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      username: { user: { username: "guest" }, guest: false },
    };
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
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
          username: {
            user: res.data[3],
            guest: res.data[4],
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

  handlePrevPage() {
    if (this.props.page > 0) {
      this.props.onPrevPageClick();
    }
  }

  handleNextPage(searchedQuestions) {
    const numQuestions = this.props.searchText.value
      ? searchedQuestions.length
      : this.state.data.questions.length;
    const maxPage = Math.ceil(numQuestions / 5);
    if (this.props.page < maxPage) {
      this.props.onNextPageClick();
    }
  }

  render() {
    const searchText = this.props.searchText;
    const rows = [];
    const searchedQuestions = [];
    if (searchText.value) {
      const searchTargets = searchText.search.toLowerCase().split(" ");
      this.state.data.questions.forEach((questionObject) => {
        const questionTags = [];
        questionObject.tags.forEach((tid) => {
          for (let i = 0; i < this.state.data.tags.length; i++) {
            if (this.state.data.tags[i]._id == tid) {
              questionTags.push("[" + this.state.data.tags[i].name + "]");
              break;
            }
          }
        });
        const questionTitle = questionObject.title.toLowerCase().split(" ");
        const questionSummary = questionObject.summary.toLowerCase().split(" ");
        const questionText = questionObject.text.toLowerCase().split(" ");
        const questionWordAndTag = questionTitle
          .concat(questionSummary)
          .concat(questionText)
          .concat(questionTags);
        const intersect = searchTargets.filter((search) =>
          questionWordAndTag.includes(search)
        );
        if (intersect.length > 0) {
          searchedQuestions.push(questionObject);
        }
      });
    }
    if (searchText.value) {
      searchedQuestions.forEach((questionObject, index) => {
        if (index >= 5 * this.props.page && index < 5 * (this.props.page + 1)) {
          rows.push(
            <DataTableRow
              key={questionObject._id}
              data={this.state.data}
              question={questionObject}
              onOneQuestionClick={this.handleClickOneQuestionTable}
            ></DataTableRow>
          );
        }
      });
    } else {
      this.state.data.questions.forEach((questionObject, index) => {
        if (index >= 5 * this.props.page && index < 5 * (this.props.page + 1)) {
          rows.push(
            <DataTableRow
              key={questionObject._id}
              data={this.state.data}
              question={questionObject}
              onOneQuestionClick={this.handleClickOneQuestionTable}
            ></DataTableRow>
          );
        }
      });
    }

    const numQuestions = searchText.value
      ? searchedQuestions.length
      : this.state.data.questions.length;
    if (rows.length == 0) {
      rows.push(
        <tr key={"none"}>
          <td width="20%"></td>
          <td width="60%">No Questions Found</td>
          <td width="20%"></td>
        </tr>
      );
    }

    const tableTitle = searchText.value
      ? searchText.tagsOnly
        ? "Questions tagged " + searchText.search
        : "Search Results"
      : "All Questions";

    let maxPage = searchText.value
      ? Math.ceil(searchedQuestions.length / 5)
      : Math.ceil(this.state.data.questions.length / 5);
    if (maxPage === 0) maxPage = 1;

    const askQuestionButtonActive = () => {
      if (!this.state.username.guest) {
        return (
          <button onClick={this.handleClickAskQuestion}>Ask A Question</button>
        );
      } else {
        return (
          <button hidden={true} onClick={this.handleClickAskQuestion}>
            Ask A Question
          </button>
        );
      }
    };

    const prevButtonActive = () => {
      if (this.props.page > 0) {
        return <button onClick={this.handlePrevPage}>Prev</button>;
      }
    };
    const nextButtonActive = () => {
      if (searchText.value) {
        if (this.props.page + 1 < Math.ceil(searchedQuestions.length / 5)) {
          return (
            <button
              onClick={() => {
                this.handleNextPage(searchedQuestions);
              }}
            >
              Next
            </button>
          );
        }
      } else {
        if (
          this.props.page + 1 <
          Math.ceil(this.state.data.questions.length / 5)
        ) {
          return (
            <button
              onClick={() => {
                this.handleNextPage(searchedQuestions);
              }}
            >
              Next
            </button>
          );
        }
      }
    };

    return (
      <React.Fragment>
        <table id="questions">
          <thead>
            <tr>
              <th>{numQuestions} Questions</th>
              <th>{tableTitle}</th>
              <th>{askQuestionButtonActive()}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div className="questionFooter">
          {prevButtonActive()} Questions Page {this.props.page + 1} of {maxPage}{" "}
          {nextButtonActive()}
        </div>
      </React.Fragment>
    );
  }
}

DataTable.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onOneQuestionTableClick: PropTypes.func,
  onPrevPageClick: PropTypes.func,
  page: PropTypes.number,
  searchText: PropTypes.object,
};
