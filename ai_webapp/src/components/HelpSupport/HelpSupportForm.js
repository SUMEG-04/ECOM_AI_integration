// HelpSupportForm.js

import React, { useEffect, useState } from 'react';
import './HelpSupportForm.css'; // Import the corresponding CSS file
import { useAuth } from '../useAuth/useAuth';

const HelpSupportForm = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
    
      const { user } = useAuth();
    
      useEffect(() => {
        if (user) {
          // Ensure that user is not null before setting userData
          setUserData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            message: ""
          });
        }
      }, [user]);
    
      const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData({ ...userData, [name]: value });
      }
    
      const handleSendMessage = async () => {
        try {
          // Construct the message data
          const messageData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            message: userData.message,
          };
    
          // Send the message to the backend
          const response = await fetch('http://localhost:3000/api/contact/message', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any authorization headers if required
            },
            body: JSON.stringify(messageData),
          });
    
          if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message);
            // Message saved successfully
            console.log('Message sent successfully');
          } else {
            // Handle the error
            console.error('Error saving the message');
          }
        } catch (error) {
          console.error('An error occurred while sending the message', error);
        }
      };
    
      return (
        <div className='help-support-form-container'>
          <form className="help-support-form"  action='https://formspree.io/f/xqkvjlnd' method="POST">
            <h2>Help and Support</h2>
            <div>
                <label>
                 Your Name:
                  <input
                    className='info'
                    name='firstName'
                    placeholder='First name'
                    required
                    type="text"
                    onChange={handleInput}
                    value={`${userData.firstName} ${userData.lastName}`}
                  />
                </label>
                {/* Add more user data fields as needed */}
              </div>
              <div>
                <label>
                    Your Message:
                    <textarea
                    className="message-input className='info'"
                    name='message'
                    placeholder="Type your message here"
                    value={userData.message}
                    onChange={handleInput}
                    />
                </label>
              </div>
            <button className="send-button" onClick={handleSendMessage}>Send Message</button>
    
          </form>
        </div>
      );
};

export default HelpSupportForm;
