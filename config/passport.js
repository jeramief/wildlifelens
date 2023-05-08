const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const User = require('../middleware/models/User')

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({ email: email.toLowerCase() },
				(err, user) => {
					if (err) {
						return done(err)
					}
					if (!user) {
						return done(null, false, { msg: `Email ${email} not found`})
					}
					if (!user.password) {
						return  done(null, false, {
							msg:
								"Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
						})
					}
					user.comparePassword(password, (err, isMatch) => {
						if (err) {
							return done(err)
						}
						if (isMatch) {
							return done(null, user)
						}
					})
				})
		})
	)
}