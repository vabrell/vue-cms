const fs = require('fs'),
	sqlite = require('sqlite')

module.exports = async (request, response) => {
	// Default return values
	let message = 'Database created.',
		created = true,
		status = 201

	try {
		const db = await sqlite.open(process.env.DATABASE, {
				Promise
			})
			// Create database and tables
			await db.migrate({
				force: process.env.ENVIRONMENT === 'development' ? 'last' : false
			})
    // Add default settings
      // Set show_stock to false
      await db.run("INSERT INTO settings (name, value) VALUES ('show_stock', 'false')")
      // Set frontPageHero to no-image.jpg
      await db.run("INSERT INTO settings (name, value) VALUES ('frontPageHero', '/no-image.jpg')")
      // Set frontPageText to Välkommen
      await db.run("INSERT INTO settings (name, value) VALUES ('frontPageText', 'Välkommen')")
      // Set brandName to Företag
      await db.run("INSERT INTO settings (name, value) VALUES ('brandName', 'Företag')")
      // Set companyName to Företag AB
      await db.run("INSERT INTO settings (name, value) VALUES ('companyName', 'Företag AB')")
      // Set companyAddress to Företagsgatan 123
      await db.run("INSERT INTO settings (name, value) VALUES ('companyAddress', 'Företagsgatan 123')")
      // Set companyPhone to +46-010-100 20 30
      await db.run("INSERT INTO settings (name, value) VALUES ('companyPhone', '+46-010-100 20 30')")
      // Set companyEmail to info@foretag.se
      await db.run("INSERT INTO settings (name, value) VALUES ('companyEmail', 'info@foretag.se')")

	} catch (err) {
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