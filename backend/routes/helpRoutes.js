const express = require('express');
const router = express.Router();
const helpController=require("../controllers/helpController")
const authMiddleware = require('../middleware/authMiddleware');

router.post('/chat',authMiddleware.verifyToken,helpController.generateResponse)

router.get('/getchat',authMiddleware.verifyToken, helpController.getChat);

module.exports = router 