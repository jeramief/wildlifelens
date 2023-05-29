// mongoose allows the use of schemas and makes MongoDB somewhat easier
const mongoose = require('mongoose')

// used in server.js
const connectDB = async () => {
	try {
		// sets up Mongo with
		const conn = await mongoose.connect(
			process.env.DB_STRING,
			{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})

		console.log(`DB: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
}

module.exports = connectDB
