import React from "react";
import AnswerForm from "./AnswerForm.js";
import Banner from "./Banner.js";
import DataTable from "./DataTable";
import ErrorMessage from "./ErrorMessage.js";
import OneQuestionTable from "./OneQuestionTable";
import QuestionForm from "./QuestionForm";
import TagsTable from "./TagsTable.js";
import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";
import Welcome from "./Welcome.js";
import axios from "axios";
import Profile from "./Profile.js";
import EditForm from "./EditForm.js";

axios.defaults.withCredentials = true;

export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { questions: [], answers: [], tags: [] },
      username: { user: { username: "guest" }, guest: false },
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      searchText: { value: false, tagsOnly: false, search: [] },
      showQuestionsTab: { value: false, page: 0 },
      showTagsTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false, dataType: "", did: "" },
      showOneQuestionTable: { value: false, page: 0, qid: "" },
      errorMsg: { value: false, errors: [] },
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickGuest = this.handleClickGuest.bind(this);
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickProfileTab = this.handleClickProfileTab.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleClickOneQuestionTable =
      this.handleClickOneQuestionTable.bind(this);
    this.handleClickSearchByTag = this.handleClickSearchByTag.bind(this);
    this.handleErrorMsg = this.handleErrorMsg.bind(this);
    this.handleClickAnswerQuestion = this.handleClickAnswerQuestion.bind(this);
    this.handleLoggedIn = this.handleLoggedIn.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
    this.handleClickQuestionPrevPage =
      this.handleClickQuestionPrevPage.bind(this);
    this.handleClickQuestionNextPage =
      this.handleClickQuestionNextPage.bind(this);
    this.handleClickAnswerPrevPage = this.handleClickAnswerPrevPage.bind(this);
    this.handleClickAnswerNextPage = this.handleClickAnswerNextPage.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        if (res.data[3]) {
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
            showWelcome: false,
            showBanner: true,
            showQuestionsTab: { value: true, page: 0 },
          });
        } else {
          this.setState({
            data: {
              questions: res.data[0],
              answers: res.data[1],
              tags: res.data[2],
            },
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  handleClickLogin() {
    this.setState({
      showWelcome: false,
      showLoginForm: true,
      showRegisterForm: false,
      showBanner: false,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickRegister() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: true,
      showBanner: false,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickBack() {
    this.setState({
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickGuest() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: { value: true, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickQuestionsTab() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: { value: true, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickTagsTab() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: true,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickProfileTab() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: true,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleSearchTextEnter(search) {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: true, tagsOnly: false, search: search },
      showQuestionsTab: { value: true, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickAskQuestion() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: true,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
    });
  }

  handleClickOneQuestionTable(qid) {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: true, page: 0, qid: qid },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickAnswerQuestion() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: true,
      showEditForm: { value: false },
      showOneQuestionTable: {
        value: false,
        page: this.state.showOneQuestionTable.page,
        qid: this.state.showOneQuestionTable.qid,
      },
    });
  }

  handleClickSearchByTag(search) {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: true, tagsOnly: true, search: search },
      showQuestionsTab: { value: true, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleErrorMsg(error) {
    this.setState({
      errorMsg: error,
    });
  }

  handleLoggedIn() {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: { value: true, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickLogOut() {
    this.setState({
      showWelcome: true,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: false,
      searchText: { value: false },
      showQuestionsTab: { value: false, page: 0 },
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: false },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  handleClickQuestionPrevPage() {
    this.setState({
      showQuestionsTab: {
        value: true,
        page: this.state.showQuestionsTab.page - 1,
      },
    });
  }

  handleClickQuestionNextPage() {
    this.setState({
      showQuestionsTab: {
        value: true,
        page: this.state.showQuestionsTab.page + 1,
      },
    });
  }

  handleClickAnswerPrevPage() {
    this.setState({
      showOneQuestionTable: {
        value: true,
        page: this.state.showOneQuestionTable.page - 1,
        qid: this.state.showOneQuestionTable.qid,
      },
    });
  }

  handleClickAnswerNextPage() {
    this.setState({
      showOneQuestionTable: {
        value: true,
        page: this.state.showOneQuestionTable.page + 1,
        qid: this.state.showOneQuestionTable.qid,
      },
    });
  }

  handleClickEdit(dataType, did) {
    this.setState({
      showWelcome: false,
      showLoginForm: false,
      showRegisterForm: false,
      showBanner: true,
      searchText: { value: false },
      showQuestionsTab: false,
      showTagsTab: false,
      showProfileTab: false,
      showQuestionForm: false,
      showAnswerForm: false,
      showEditForm: { value: true, dataType: dataType, did: did },
      showOneQuestionTable: { value: false },
      errorMsg: { value: false, errors: [] },
    });
  }

  render() {
    const showWelcome = this.state.showWelcome;
    const welcomeActive = () => {
      if (showWelcome) {
        return (
          <Welcome
            onLoginClick={this.handleClickLogin}
            onRegisterClick={this.handleClickRegister}
            onGuestClick={this.handleClickGuest}
          ></Welcome>
        );
      }
    };

    const showLoginForm = this.state.showLoginForm;
    const loginFormActive = () => {
      if (showLoginForm) {
        return (
          <LoginForm
            onBackClick={this.handleClickBack}
            onLoggedIn={this.handleLoggedIn}
            onFormError={this.handleErrorMsg}
          ></LoginForm>
        );
      }
    };

    const showRegisterForm = this.state.showRegisterForm;
    const registerFormActive = () => {
      if (showRegisterForm) {
        return (
          <RegisterForm
            onBackClick={this.handleClickBack}
            onLoginClick={this.handleClickLogin}
            onFormError={this.handleErrorMsg}
          ></RegisterForm>
        );
      }
    };

    const showBanner = this.state.showBanner;
    const bannerActive = () => {
      if (showBanner) {
        return (
          <Banner
            state={this.state}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onTagsTabClick={this.handleClickTagsTab}
            onProfileTabClick={this.handleClickProfileTab}
            onAskQuestionClick={this.handleClickAskQuestion}
            onSearchTextEnter={this.handleSearchTextEnter}
            onLogOutClick={this.handleClickLogOut}
          ></Banner>
        );
      }
    };

    const showQuestionsTab = this.state.showQuestionsTab.value;
    const questionActive = () => {
      if (showQuestionsTab) {
        return (
          <DataTable
            searchText={this.state.searchText}
            page={this.state.showQuestionsTab.page}
            onAskQuestionClick={this.handleClickAskQuestion}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
            onPrevPageClick={this.handleClickQuestionPrevPage}
            onNextPageClick={this.handleClickQuestionNextPage}
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

    const showProfileTab = this.state.showProfileTab;
    const profileActive = () => {
      if (showProfileTab) {
        return (
          <Profile
            onEditClick={this.handleClickEdit}
            onFormError={this.handleErrorMsg}
          ></Profile>
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

    const showEditForm = this.state.showEditForm.value;
    const editFormActive = () => {
      if (showEditForm) {
        return (
          <EditForm
            dataType={this.state.showEditForm.dataType}
            did={this.state.showEditForm.did}
            onFormError={this.handleErrorMsg}
            onProfileTabClick={this.handleClickProfileTab}
          ></EditForm>
        );
      }
    };

    const showOneQuestionTable = this.state.showOneQuestionTable.value;
    const oneQuestionTableActive = () => {
      if (showOneQuestionTable) {
        return (
          <OneQuestionTable
            qid={this.state.showOneQuestionTable.qid}
            page={this.state.showOneQuestionTable.page}
            onQuestionsTabClick={this.handleClickQuestionsTab}
            onOneQuestionTableClick={this.handleClickOneQuestionTable}
            onAskQuestionClick={this.handleClickAskQuestion}
            onAnswerQuestionClick={this.handleClickAnswerQuestion}
            onPrevPageClick={this.handleClickAnswerPrevPage}
            onNextPageClick={this.handleClickAnswerNextPage}
            onFormError={this.handleErrorMsg}
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
        {welcomeActive()}
        {bannerActive()}
        <div id="main" className="main">
          {questionActive()}
          {tagsActive()}
          {errorMsgActive()}
          {profileActive()}
          {oneQuestionTableActive()}
        </div>
        {loginFormActive()}
        {registerFormActive()}
        {questionFormActive()}
        {answerFormActive()}
        {editFormActive()}
      </React.Fragment>
    );
  }
}
