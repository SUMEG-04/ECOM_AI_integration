const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcrypt');

// Function to create a new user (user registration)
const createUser = async (req, res) => {

  // Extract user registration data from the request body
  const { firstName, lastName, email,contact, password,cpassword } = req.body;

  if (!firstName || !lastName || !email || !contact || !password || !cpassword) {
    return res.status(422).json({ error: 'All fields are required.' });
  }

  try {

    // Check if the user already exists by checking the email
    const existingUser = await User.findOne({ email });


    if (existingUser) {
      console.log(existingUser)
      return res.status(422).json({path:"email", error: 'Email is already registered.' });
    }


    // Create a new user with the hashed password
    const user = new User({
      firstName,
      lastName,
      email,
      contact,
      password,
      cpassword,
    });

    // Save the user to the database
    await user.save();
 
    // Optionally, you can generate a JWT token and send it back as a response for user authentication

    return res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    // Handle the error
    console.error('Error in user registration:', error);
    return res.status(500).json({ error: 'An error occurred during user registration' });
  }
};


// Function to log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }

    const token=await user.generateAuthToken();
    res.cookie('jwtoken', token, {
      httpOnly: false,
      sameSite: 'none',
      secure: true, // Mark as secure if using HTTPS
    });

    // console.log(user)
    res.status(200).json({user,token});
  } catch (error) {
    // Handle errors
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};


// In your userController.js
const getUserProfile = async (req, res) => {
  try {
    // Fetch the user data based on the authenticated user (you can use the user ID from the JWT token)
    res.send(req.rootUser)

  } catch (error) {
    console.error('Error in getting user profile:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};


const updateUserProfile = async (req, res) => {
  try {
    // Extract the updated user data from the request body
    const { firstName, lastName, email, address } = req.body;

    // Assume you have a user model/schema in your database
    // You should use a database query to update the user's profile
    const userId = req.rootUser._id; // Assuming you have access to the authenticated user's ID

    try {
      // Find the user by their unique identifier, e.g., user ID
      const user = await User.findOne({ _id: userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's data with the new values
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      // Update the user's address
      if (address) {
        user.address = address;
      }

      // Save the updated user data to the database
      await user.save();

      const updatedUser = await User.findOne({ _id: userId });

      // Optionally, you can send back the updated user data as a response
      return res.status(201).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error in getting user profile:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = updateUserProfile;


module.exports = updateUserProfile;


module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
