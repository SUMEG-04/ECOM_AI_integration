// HelpSupportService.js

// Assume you have an API endpoint for help and support
const API_ENDPOINT = 'https://your-api.com/help-support';

// Function to fetch help and support data from the backend
export const fetchHelpSupportData = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching help and support data:', error.message);
    throw error; // Rethrow the error for handling in the component or caller
  }
};

// Function to post a new help and support message
export const postHelpSupportMessage = async (newMessage) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting help and support message:', error.message);
    throw error;
  }
};
