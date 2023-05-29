const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const postsController = require('../controllers/posts')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// post routes
router.get('/:id', ensureAuth, postsController.getPost)

// enables user to create post with cloudinary for media uploads
router.post('/createPost', upload.single('file'), postsController.createPost)

// enables user to like post. in controller, uses POST model to update by 1
router.put('/likePost/:id', postsController.likePost)

// enables user to delete post. in controller, uses POST model to delete post from MongoDB collection
router.delete('/deletePost/:id', postsController.deletePost)

// used in server.js
module.exports = router
