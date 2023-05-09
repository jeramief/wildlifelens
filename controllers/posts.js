const cloudinary = require('../middleware/cloudinary')
const Post = require('../middleware/models/Post')
// const Comment = require('../middleware/models/Post')

module.exports = {
	getProfile: async (req, res) => {
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //Grabbing just the posts of the logged-in user
      //console.log(req.user) to see everything
      const posts = await Post.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
	},
	getPost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)
			res.render('post.ejs', { post: post, user: req.user, /* comments: comments */ })
		} catch (err) {
			console.error(err)
		}
	},
	createPost: async (req, res) => {
		try {
		// 	upload image to cloudinary
			const result = await cloudinary.uploader.upload(req.file.path)

		// 	media is stored on cloudinary - the above request responds ith url to media id that you will need when deleting content
			await Post.create({
				title: req.body.title,
				image: result.secure_url,
				cloudinaryId: result.public_id,
				caption: req.body.caption,
				likes: 0,
				user: req.user.id,
			})
			console.log("Post has been added!")
			res.redirect('/profile')
		} catch (err) {
			console.log(err)
		}
	},
	likePost: async (req, res) => {
		try {
			await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$inc: { likes: 1 }
				},
			)
			console.log("Likes +1")
			res.redirect(`/post/${req.params.id}`)
		} catch (err) {
			console.error(err)
		}
	},
	deletePost: async (req, res) => {
		// find post by id
		let post = await Post.findById({ _id: req.params.id })
		// delete image from cloudinary
		await cloudinary.uploader.destroy(post.cloudinaryId)
		// delete post from db
		await Post.remove({ _id: req.params.id })
		console.log("Deleted Post")
		res.redirect('/profile')
		try {
		} catch (err) {
			console.error(err)
		}
	}
}