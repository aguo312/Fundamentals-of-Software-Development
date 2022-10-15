import React from "react";
import PropTypes from "prop-types";
import AnswerForm from "./AnswerForm.js";
import Banner from "./Banner.js";
import DataTable from "./DataTable.js";
import ErrorMessage from "./ErrorMessage.js";
import OneQuestionTable from "./OneQuestionTable.js";
import QuestionForm from "./QuestionForm.js";
import TagsTable from "./TagsTable.js";

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: { value: false, tagsOnly: false, search: [] },
      showQuestionsTab: true,
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showOneQuestionTable: { value: false, question: "" },
      errorMsg: { value: false, errors: [] },
    };
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.handleNewQuestion = this.handleNewQuestion.bind(this);
  }

  handleSearchTextEnter(value, search) {
    this.setState({
      searchText: { value: value, tagsOnly: false, search: search },
      showQuestionsTab: value,
      showTagsTab: !value,
      showQuestionForm: !value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: !value },
      errorMsg: { value: !value, errors: [] },
    });
  }

  handleClickSearchByTag(value, search) {
    this.setState({
      searchText: { value: value, tagsOnly: true, search: search },
      showQuestionsTab: value,
      showTagsTab: !value,
      showQuestionForm: !value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: !value },
      errorMsg: { value: !value, errors: [] },
    });
  }

  handleClickQuestionsTab(value) {
    this.setState({
      searchText: { value: !value },
      showQuestionsTab: value,
      showTagsTab: !value,
      showQuestionForm: !value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: !value },
      errorMsg: { value: !value, errors: [] },
    });
  }

  handleClickTagsTab(value) {
    this.setState({
      searchText: { value: !value },
      showQuestionsTab: !value,
      showTagsTab: value,
      showQuestionForm: !value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: !value },
      errorMsg: { value: !value, errors: [] },
    });
  }

  handleClickAskQuestion(value) {
    this.setState({
      searchText: { value: !value },
      showQuestionsTab: !value,
      showTagsTab: !value,
      showQuestionForm: value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: !value },
    });
  }

  handleClickAnswerQuestion(value) {
    this.setState({
      searchText: { value: !value },
      showQuestionsTab: !value,
      showTagsTab: !value,
      showQuestionForm: !value,
      showAnswerForm: value,
      showOneQuestionTable: {
        value: !value,
        question: this.state.showOneQuestionTable.question,
      },
    });
  }

  handleClickOneQuestionTable(value, question) {
    this.setState({
      searchText: { value: !value },
      showQuestionsTab: !value,
      showTagsTab: !value,
      showQuestionForm: !value,
      showAnswerForm: !value,
      showOneQuestionTable: { value: value, question: question },
    });
  }

  handleErrorMsg(error) {
    this.setState({
      errorMsg: error,
    });
  }

  handleNewQuestion() {}

  render() {
    const showQuestionsTab = this.state.showQuestionsTab;
    const questionsActive = () => {
      if (showQuestionsTab) {
        return (
          <DataTable
            data={this.props.data}
            searchText={this.state.searchText}
            onSearchTextEnter={this.handleSearchTextEnter}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
          />
        );
      }
    };

    const showTagsTab = this.state.showTagsTab;
    const tagsActive = () => {
      if (showTagsTab) {
        return (
          <TagsTable
            data={this.props.data}
            searchText={this.state.searchText}
            onSearchTextEnter={this.handleSearchTextEnter}
            onSearchByTagClick={this.handleClickSearchByTag}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
          />
        );
      }
    };

    const showQuestionForm = this.state.showQuestionForm;
    const questionFormActive = () => {
      if (showQuestionForm) {
        return (
          <QuestionForm
            data={this.props.data}
            searchText={this.state.searchText}
            onSearchTextEnter={this.handleSearchTextEnter}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
            onFormError={this.handleErrorMsg}
            onNewQuestion={this.handleNewQuestion}
          />
        );
      }
    };

    const showAnswerForm = this.state.showAnswerForm;
    const answerFormActive = () => {
      if (showAnswerForm) {
        return (
          <AnswerForm
            data={this.props.data}
            question={this.state.showOneQuestionTable.question}
            searchText={this.state.searchText}
            onSearchTextEnter={this.handleSearchTextEnter}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
            onFormError={this.handleErrorMsg}
          />
        );
      }
    };

    const showOneQuestionTable = this.state.showOneQuestionTable.value;
    const oneQuestionTableActive = () => {
      if (showOneQuestionTable) {
        return (
          <OneQuestionTable
            data={this.props.data}
            question={this.state.showOneQuestionTable.question}
            searchText={this.state.searchText}
            onSearchTextEnter={this.handleSearchTextEnter}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
          />
        );
      }
    };

    const showErrorMsg = this.state.errorMsg.value;
    const errorMsgActive = () => {
      if (showErrorMsg) {
        return <ErrorMessage errors={this.state.errorMsg.errors} />;
      }
    };

    return (
      <React.Fragment>
        <Banner
          state={this.state}
          searchText={this.state.searchText}
          onSearchTextEnter={this.handleSearchTextEnter}
          onQuestionsTabClick={this.handleClickQuestionsTab}
          onTagsTabClick={this.handleClickTagsTab}
        />
        <div id="main" className="main">
          {questionsActive()}
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

FakeStackOverflow.propTypes = {
  data: PropTypes.object,
};
