const helpSupport = require("../aisupport/cutomerservice");
const User = require('../models/user');

exports.generateResponse = async (req, res) => {
    try {
        const { userMessage, prevSummary } = req.body;
        if (!userMessage || !prevSummary) {
            console.log('error in fetching data');
            return res.status(400).json({ error: 'Please enter your message' });
        }

        const user = await User.findOne({ _id: req.userID });

        if (user) {
            const { aiResponse, summary } = await helpSupport(userMessage, prevSummary);
            const Response = await user.addQuerry(userMessage, aiResponse, summary);

            if (!Response) {
                console.log('Error in adding message to user');
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                return res.status(200).json({ message: 'User message received' });
            }
        } else {
            console.log('user not found');
            return res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const { Types } = require('mongoose');

exports.getChat = async (req, res) => {
  try {
    // Assuming you have a user ID from the authenticated user
    console.log(req.userID);

    // Convert the string to ObjectId using mongoose.Types.ObjectId
    const userId =new Types.ObjectId(req.userID);

    // Find the user by ID and return the chat data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the chat data
    res.status(200).json({ chat: user.chat, summary: user.summary });
  } catch (error) {
    console.error('Error getting chat data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
