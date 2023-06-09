const cloudinary = require('../middleware/cloudinary')
const Post = require('../middleware/models/Post')
// const Comment = require('../middleware/models/Post')

// exports the functions into main and posts routes
module.exports = {
	// used in main routes
	getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
	},
	// used in main routes
	getFeed: async (req, res) => {
		try {
			const posts = await Post.find().sort({ createdAt: 'desc' }).lean()
			res.render('feed.ejs', { posts: posts })
		} catch (err) {
			console.log(err)
		}
	},
	// used in posts routes
	getPost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id).populate('user', 'userName')
			const postUser = post.user.userName

			res.render('post.ejs', { post: post, user: req.user, postUser: postUser, /* comments: comments */ })
		} catch (err) {
			console.error(err)
		}
	},
	// used in posts routes
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
	// used in posts routes
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
	// used in posts routes
	deletePost: async (req, res) => {
		// find post by id
		let post = await Post.findById({ _id: req.params.id })
		// delete image from cloudinary
		await cloudinary.uploader.destroy(post.cloudinaryId)
		// delete post from db
		await Post.deleteOne({ _id: req.params.id })
		console.log("Deleted Post")
		res.redirect('/profile')
		try {
		} catch (err) {
			console.error(err)
		}
	}
}
