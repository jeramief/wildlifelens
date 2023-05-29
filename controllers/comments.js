const Comment = require('../model/Comment')

module.exports = {
	// creates and exports the createComment function
	createComment: async (req, res) => {
		console.log(req.params)
		console.log(req.body)
		try {
			// create a new schema
			await Comment.create({
				comment: req.body.comment,
				likes: 0,
				post: req.params.id,
			})
			console.log("Post has been added!")
			res.redirect("/post/" + req.params.id)
		} catch(err) {
			console.error(err)
		}
	}
}
