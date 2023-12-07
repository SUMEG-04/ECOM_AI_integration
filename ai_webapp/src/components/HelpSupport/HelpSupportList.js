// HelpSupportList.js

import React from 'react';
import PropTypes from 'prop-types';
import HelpSupportItem from './HelpSupportItem'; // Import the HelpSupportItem component

const HelpSupportList = ({ supportData=[] }) => {
    
  return (
    <div className="help-support-list">
      {supportData && supportData.map((item) => (
        <HelpSupportItem
          key={item.id} // Assuming each item in supportData has a unique ID
          user={item.user}
          message={item.message}
          timestamp={item.timestamp}
        />
      ))}
      
    </div>
  );
};

HelpSupportList.propTypes = {
  supportData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HelpSupportList;
