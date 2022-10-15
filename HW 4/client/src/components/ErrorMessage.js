import React from "react";
import PropTypes from "prop-types";

export default class ErrorMessage extends React.Component {
  render() {
    const errors = this.props.errors;
    return (
      <React.Fragment>
        {errors.map((msg) => (
          <React.Fragment key={msg}>
            {msg}
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.array,
};
