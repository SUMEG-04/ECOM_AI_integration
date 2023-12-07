// Example code in contactController.js
const ContactMessage = require('../models/message');

exports.saveMessage = async (req, res) => {
  try {
    const {firstName,lastName,email, message } = req.body;
    console.log(req.body)
    // Save the message to the database
    const newMessage = new ContactMessage({ firstName,lastName,email, message });
    await newMessage.save();

    return res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while saving the message' });
  }
};
