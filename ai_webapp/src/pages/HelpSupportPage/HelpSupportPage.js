// HelpSupportPage.js

import React, { useState, useEffect } from 'react';
import HelpSupportList from '../../components/HelpSupport/HelpSupportList'; // Import your HelpSupportList component
import HelpSupportForm from '../../components/HelpSupport/HelpSupportForm'; // Import your HelpSupportForm component
import {fetchHelpSupportData,postHelpSupportMessage} from '../../components/HelpSupport/HelpSupportService'
import './HelpSupportPage.css'; // Import the CSS file
import ToggleButtons from '../../components/HelpSupport/ToggleButtons';
import AiSupportComponent from '../../components/HelpSupport/AiSupportComponent';

const HelpSupportPage = () => {
  const [helpSupportData, setHelpSupportData] = useState([]);
  const [activeView, setActiveView] = useState('ai');

    const handleToggle = (button) => {
        // Handle the toggle event here
        console.log('Toggle button:', button);
        setActiveView(button);
        // You can add more logic based on the active button, such as showing/hiding components.
      };

  // Fetch help and support data when the page mounts
  useEffect(() => {
    const fetchHelpSupportData = async () => {
      try {
        const data = await fetchHelpSupportData();
        setHelpSupportData(data);
      } catch (error) {
        console.error('Error fetching help and support data:', error.message);
      }
    };

    fetchHelpSupportData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle submitting a new help and support message
  const handleSubmitMessage = async (newMessage) => {
    try {
      await postHelpSupportMessage(newMessage);
      // Assuming you want to refresh the list after posting a message
      const updatedData = await fetchHelpSupportData();
      setHelpSupportData(updatedData);
    } catch (error) {
      console.error('Error submitting help and support message:', error.message);
    }
  };

  return (
    <div className="help-support-page">
      <h1>Help and Support</h1>
      <ToggleButtons onToggle={handleToggle} />
      <HelpSupportList helpSupportData={helpSupportData} />
      {activeView === 'ai' && <AiSupportComponent />}
      {activeView === 'form' && <HelpSupportForm onSubmit={handleSubmitMessage} />}
      
    </div>
  );
};

export default HelpSupportPage;
