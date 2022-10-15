import React from "react";
import PropTypes from "prop-types";

export default class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBox: "",
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchTextEnter = this.handleSearchTextEnter.bind(this);
    this.handleClickQuestionsTab = this.handleClickQuestionsTab.bind(this);
    this.handleClickTagsTab = this.handleClickTagsTab.bind(this);
  }

  handleSearchTextChange(e) {
    this.setState({ searchBox: e.target.value });
  }

  handleSearchTextEnter(e) {
    if (e.keyCode == 13) {
      this.props.onSearchTextEnter(true, this.state.searchBox);
    }
  }

  handleClickQuestionsTab() {
    this.props.onQuestionsTabClick(true);
  }

  handleClickTagsTab() {
    this.props.onTagsTabClick(true);
  }

  render() {
    const questionClass =
      this.props.state.showQuestionsTab && !this.props.searchText.value
        ? "currentTab"
        : "notCurrentTab";
    const tagClass =
      this.props.state.showTagsTab && !this.props.searchText.value
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
  onSearchTextEnter: PropTypes.func,
  onQuestionsTabClick: PropTypes.func,
  onTagsTabClick: PropTypes.func,
  state: PropTypes.object,
  searchText: PropTypes.object,
};
