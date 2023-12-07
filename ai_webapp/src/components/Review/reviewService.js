const API_URL = 'http://localhost:3000/api/reviews';

const updateReview = async (userId,updatedReview) => {
    try {
      const response = await fetch(`${API_URL}/update/${userId}`, {
        method: 'PUT',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error.message);
      throw error;
    }
};

export const addReview = async (newReview) => {
    try {
      const response = await fetch(`${API_URL}/create-review`, {
        method: 'POST',
        credentials: "include",
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
  
      const addedReview = await response.json();
      return addedReview;
    } catch (error) {
      console.error('Error adding review:', error.message);
      throw error;
    }
  };
  
