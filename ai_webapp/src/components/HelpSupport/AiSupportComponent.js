// AiSupportComponent.js
import React, { useEffect, useRef, useState } from 'react';
import './AiSupportComponent.css'; // Import the CSS file
import { BiSend } from "react-icons/bi";
import { useAuth } from '../useAuth/useAuth';
import axios from 'axios';

function formatResponse(response) {
  // Replace double backslashes with a single backslash and then add line breaks
  const formattedResponse = response.replace(/\\n/g, '\n\n');


  return `
${formattedResponse}
`;
}


const AiSupportComponent = ({ onhandleSendMessage }) => {
  const {user}=useAuth();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [summary, setSummary] = useState(' ');
  const chatContainerRef = useRef(null);

  const userChat = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/help/getchat', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Extract JSON data from the response
      const { chat, summary } = await response.json();
  
      setChat(chat);
      setSummary(summary);
    } catch (error) {
      console.error('Error fetching chat details:', error);
    }
  };
  
  

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    userChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return; // Prevent sending empty messages
    }

    try {
      const res = await fetch('http://localhost:3000/api/help/chat', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage:message,prevSummary:summary }),
      });
      console.log(res)
      const data = await res.json();
      if (!data) {
        console.log('Failed to send the message');
      } else {
        console.log(data)
        alert('User message sent');
        setMessage('');
        userChat();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
    <div className="chat-gpt-container">
      <div className="chat-gpt-history" ref={chatContainerRef} id='chat-container'>
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message`}
          >
           <div className="user">user:<p>{message.user}</p></div>
            <div className="ai">ai:<p>{formatResponse(message.assistant)}</p></div>
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="send-button">
          <BiSend className='send-icon'/>
        </button>
      </div>
    </div>
    </>
  );
};

export default AiSupportComponent;
