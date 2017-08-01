import React from "react";
import PropTypes from "prop-types";
import "./messages.css";
const Messages = ({ messages, type }) => {
  return (
    <div className="message-container">
      {messages.map(message => {
        return (
          <p className={`message ${type}`}>
            {message}
          </p>
        );
      })}
    </div>
  );
};
Messages.prototype = {
  messages: PropTypes.array.isRequired
};
export default Messages;
