const fs = require('fs'),
	sqlite = require('sqlite')

module.exports = async (request, response) => {
	// Default return values
	let message = 'Database created.',
		created = true,
		status = 201

	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// Create database and tables
			tables = await db.migrate({
					force: process.env.ENVIRONMENT === 'development' ? 'last' : false
				})
			// Add default settings
			showStock = await db.run("INSERT INTO settings (name, value) VALUES ('show_stock', 'false')")

	}
	catch(err) {
		status = 500
		created = false
		message = err.message
	}

	// Send back status message
	response.status(status).send({
		message: message,
		created: created
	})
}
