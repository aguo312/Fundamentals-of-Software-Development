import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
axios.defaults.withCredentials = true;

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
      username: { user: { username: "guest " }, guest: false },
    };
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleClickProfileTab = this.handleClickProfileTab.bind(this);
    this.handleClickAskQuestion = this.handleClickAskQuestion.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickLogOut = this.handleClickLogOut.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/alldata")
      .then((res) => {
        this.setState({
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

  handleClickQuestionsTab() {
    this.props.onQuestionsTabClick();
  }

  handleClickTagsTab() {
    this.props.onTagsTabClick();
  }

  handleClickProfileTab() {
    if (!this.state.username.guest) {
      this.props.onProfileTabClick();
    }
  }

  handleClickAskQuestion() {
    this.props.onAskQuestionClick();
  }

  handleSearchTextChange(e) {
    this.setState({ searchBox: e.target.value });
  }

  handleSearchTextEnter(e) {
    if (e.keyCode === 13) {
      this.props.onSearchTextEnter(this.state.searchBox);
    }
  }

  handleClickLogOut() {
    localStorage.removeItem("name");
    axios
      .post("http://localhost:8000/logout")
      .then((res) => this.props.onLogOutClick());
  }

  render() {
    const questionClass =
      this.props.state.showQuestionsTab && !this.props.state.searchText.value
        ? "currentTab"
        : "notCurrentTab";
    const tagClass =
      this.props.state.showTagsTab && !this.props.state.searchText.value
        ? "currentTab"
        : "notCurrentTab";
    const profileClass = this.state.username.guest
      ? "notCurrentTab2"
      : this.props.state.showProfileTab && !this.props.state.searchText.value
      ? "currentTab"
      : "notCurrentTab";
    let username = "Guest User";
    if (!this.state.username.guest) {
      username = this.state.username.user.username + "'s Profile";
    }
    const askQuestionButtonActive = () => {
      if (!this.state.username.guest) {
        return (
          <input
            type="button"
            value="Ask A Question"
            onClick={this.handleClickAskQuestion}
          ></input>
        );
      }
    };
    return (
      <div id="banner" className="banner">
        <a
          href="#"
          id="showQuestionsButton"
          className={questionClass}
          onClick={this.handleClickQuestionsTab}
        >
          Questions
        </a>
        <a
          href="#"
          id="showTagsButton"
          className={tagClass}
          onClick={this.handleClickTagsTab}
        >
          Tags
        </a>
        <a
          href="#"
          id="showProfileButton"
          className={profileClass}
          onClick={this.handleClickProfileTab}
        >
          {username}
        </a>
        <b>Fake Stack Overflow</b>
        <input
          type="button"
          value="Log Out"
          onClick={this.handleClickLogOut}
        ></input>
        {askQuestionButtonActive()}
        <input
          type="text"
          id="searchBox"
          placeholder="Search ..."
          onChange={this.handleSearchTextChange}
          onKeyUp={this.handleSearchTextEnter}
        ></input>
      </div>
    );
  }
}

Banner.propTypes = {
  onAskQuestionClick: PropTypes.func,
  onLogoutClick: PropTypes.func,
  onProfileTabClick: PropTypes.func,
  onQuestionsTabClick: PropTypes.func,
  onSearchTextEnter: PropTypes.func,
  onTagsTabClick: PropTypes.func,
  state: PropTypes.object,
};
