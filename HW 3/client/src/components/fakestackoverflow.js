import React from "react";
import AnswerForm from "./AnswerForm.js";
import Banner from "./Banner.js";
import DataTable from "./DataTable.js";
import ErrorMessage from "./ErrorMessage.js";
import OneQuestionTable from "./OneQuestionTable.js";
import QuestionForm from "./QuestionForm.js";
import TagsTable from "./TagsTable.js";
import axios from "axios";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      searchText: { value: false, tagsOnly: false, search: [] },
      showQuestionsTab: true,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false, qid: "" },
      errorMsg: { value: false, errors: [] },
    };
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
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

  handleClickQuestionsTab() {
    this.setState({
      searchText: { value: false },
      showQuestionsTab: true,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickTagsTab() {
    this.setState({
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: true,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleSearchTextEnter(search) {
    this.setState({
      searchText: { value: true, tagsOnly: false, search: search },
      showQuestionsTab: true,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickAskQuestion() {
    this.setState({
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showQuestionForm: true,
      showAnswerForm: false,
      showOneQuestionTable: { value: false },
    });
  }

  handleClickOneQuestionTable(qid) {
    this.setState({
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: true, qid: qid },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickAnswerQuestion() {
    this.setState({
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: true,
      showOneQuestionTable: {
        value: false,
        qid: this.state.showOneQuestionTable.qid,
      },
    });
  }

  handleClickSearchByTag(search) {
    this.setState({
      searchText: { value: true, tagsOnly: true, search: search },
      showQuestionsTab: true,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleErrorMsg(error) {
    this.setState({
      errorMsg: error,
    });
  }

  render() {
    const showQuestionsTab = this.state.showQuestionsTab;
    const questionActive = () => {
      if (showQuestionsTab) {
        return (
          <DataTable
            searchText={this.state.searchText}
            onAskQuestionClick={this.handleClickAskQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
          ></DataTable>
        );
      }
    };

    const showTagsTab = this.state.showTagsTab;
    const tagsActive = () => {
      if (showTagsTab) {
        return (
          <TagsTable
            onAskQuestionClick={this.handleClickAskQuestion}
            onSearchByTagClick={this.handleClickSearchByTag}
          ></TagsTable>
        );
      }
    };

    const showQuestionForm = this.state.showQuestionForm;
    const questionFormActive = () => {
      if (showQuestionForm) {
        return (
          <QuestionForm
            data={this.state.data}
            onFormError={this.handleErrorMsg}
            onQuestionsTabClick={this.handleClickQuestionsTab}
          ></QuestionForm>
        );
      }
    };

    const showAnswerForm = this.state.showAnswerForm;
    const answerFormActive = () => {
      if (showAnswerForm) {
        return (
          <AnswerForm
            qid={this.state.showOneQuestionTable.qid}
            onFormError={this.handleErrorMsg}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
          ></AnswerForm>
        );
      }
    };

    const showOneQuestionTable = this.state.showOneQuestionTable.value;
    const oneQuestionTableActive = () => {
      if (showOneQuestionTable) {
        return (
          <OneQuestionTable
            qid={this.state.showOneQuestionTable.qid}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
          ></OneQuestionTable>
        );
      }
    };

    const showErrorMsg = this.state.errorMsg.value;
    const errorMsgActive = () => {
      if (showErrorMsg) {
        return (
          <ErrorMessage errors={this.state.errorMsg.errors}></ErrorMessage>
        );
      }
    };

    return (
      <React.Fragment>
        <Banner
          state={this.state}
          onQuestionsTabClick={this.handleClickQuestionsTab}
          onTagsTabClick={this.handleClickTagsTab}
          onSearchTextEnter={this.handleSearchTextEnter}
        ></Banner>
        <div id="main" className="main">
          {questionActive()}
          {tagsActive()}
          {oneQuestionTableActive()}
          {errorMsgActive()}
        </div>
        {questionFormActive()}
        {answerFormActive()}
      </React.Fragment>
    );
  }
}
