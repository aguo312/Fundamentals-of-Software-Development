import React from "react";
import PropTypes from "prop-types";

export default class ErrorMessage extends React.Component {
  render() {
    const errors = this.props.errors;
    return (
      <div className="errorMessage">
        {errors.map((msg) => (
          <React.Fragment key={msg}>
            {msg}
            <br />
          </React.Fragment>
        ))}
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.array,
};
