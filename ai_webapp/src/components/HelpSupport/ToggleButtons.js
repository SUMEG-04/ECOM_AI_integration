// ToggleButtons.js
import React, { useState } from 'react';
import { AiOutlineQuestionCircle, AiOutlineForm } from 'react-icons/ai';
import './ToggleButtons.css'; // Import the CSS file

const ToggleButtons = ({ onToggle }) => {
  const [activeButton, setActiveButton] = useState('ai'); // Initial active button

  const handleButtonClick = (button) => {
    setActiveButton(button);
    onToggle(button); // Notify the parent component about the button change
  };

  return (
    <div className="toggle-buttons">
      <button
        className={`toggle-button ${activeButton === 'ai' ? 'active' : ''}`}
        onClick={() => handleButtonClick('ai')}
      >
        <AiOutlineQuestionCircle />
        AI Support
      </button>
      <button
        className={`toggle-button ${activeButton === 'form' ? 'active' : ''}`}
        onClick={() => handleButtonClick('form')}
      >
        <AiOutlineForm />
        Help & Support Form
      </button>
    </div>
  );
};

export default ToggleButtons;
