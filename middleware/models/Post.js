const mongoose = require('mongoose')

// model schema for new post
const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	cloudinaryId: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// formats date and time to current
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

// MongoDB's collection named here - will give lowercase plural of name - used in posts controller
module.exports = mongoose.model('Post', PostSchema)
