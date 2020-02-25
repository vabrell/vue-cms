const fs = require('fs'),
	sqlite = require('sqlite')

module.exports = (request, response) => {
	// Default return values
	let message = 'Database created.',
		created = true,
		status = 201

	// Create database and tables
	const dbPromise = Promise.resolve()
		.then(() => sqlite.open(process.env.DATABASE, { Promise }))
		.then(db =>
			db.migrate({
				force: process.env.ENVIRONMENT === 'development' ? 'last' : false
			})
		)
		.catch(e => {
			status = 500
			created = false
			message = e.message
		})

	// Send back status message
	response.status(status).send({
		message: message,
		created: created
	})
}
