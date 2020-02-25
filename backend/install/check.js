const fs = require('fs')

module.exports = (request, response) => {
	fs.exists(process.env.DATABASE, exists => {
		response.status(200).send({ databaseExists: exists })
	})
}
