const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/comments')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// post routes
router.post('/createComment/:id', ensureAuth, commentsController.createComment)

// used in server.js
module.exports = router
