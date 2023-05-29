// render index.ejs as the first page that loads imports into main.js
module.exports = {
	getIndex: (req, res) => {
		res.render('index.ejs')
	}
}
