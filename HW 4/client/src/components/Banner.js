import React from "react";
import PropTypes from "prop-types";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
    };
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
  }

  handleClickQuestionsTab() {
    this.props.onQuestionsTabClick();
  }

  handleClickTagsTab() {
    this.props.onTagsTabClick();
  }

  handleSearchTextChange(e) {
    this.setState({ searchBox: e.target.value });
  }

  handleSearchTextEnter(e) {
    if (e.keyCode == 13) {
      this.props.onSearchTextEnter(this.state.searchBox);
    }
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
        <b>Fake Stack Overflow</b>
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
  state: PropTypes.object,
  onQuestionsTabClick: PropTypes.func,
  onTagsTabClick: PropTypes.func,
  onSearchTextEnter: PropTypes.func,
};
