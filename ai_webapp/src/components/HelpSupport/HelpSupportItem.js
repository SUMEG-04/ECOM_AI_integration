// HelpSupportItem.js

import React from 'react';
import PropTypes from 'prop-types';

const HelpSupportItem = ({ user, message, timestamp }) => {
  return (
    <div className="help-support-item">
      <div className="user-info">
        <strong>{user}</strong>
        <span className="timestamp">{timestamp}</span>
      </div>
      <p className="support-message">{message}</p>
    </div>
  );
};

HelpSupportItem.propTypes = {
  user: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default HelpSupportItem;
