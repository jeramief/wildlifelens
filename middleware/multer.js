// multer is being used for file types
const multer = require('multer')
const path = require('path')

// used in posts routes
module.exports = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname).toLowerCase()
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
			cb(new Error("File type is not supported"), false)
			return
		}
		cb(null, true)
	},
})
