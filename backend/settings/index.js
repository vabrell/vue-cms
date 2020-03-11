const express = require('express'),
	router = express.Router(),
	sqlite = require('sqlite')

/**
 * ---------------------
 * Get the show_stock setting
 * ---------------------
 */
router.get('/settings/show_stock', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// Try to get the setting
			setting = await db.get("SELECT * FROM settings WHERE name = 'show_stock'")

		if (setting === undefined) {
			setting = { name: 'show_stock', value: false }
		}

		// return the setting
		response.status(200).send(setting)
	} catch (err) {
		response.status(500).send({ error: err.message })
	}
})

/**
 * ---------------------
 * Get all settings
 * ---------------------
 */
router.get('/settings/all', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// try to get the setting
			setting = await db.all("SELECT * FROM settings"),
			settings = {}

		setting.forEach(set => {
			settings[set.name] = set.value
		})

		// return the settings
		response.status(200).send(settings)
	} catch (err) {
		response.status(500).send({ error: err.message })
	}
})

/**
 * ---------------
 * Update settings
 * ---------------
 */
router.put('/settings', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise })
			// Update each settings
			request.body.forEach(async setting => {
				try {
					await db.run("UPDATE settings SET value=? WHERE name=?", [ setting.value, setting.key ])
				}
				catch (err) {
					response.status(500).send({ error: err.message })
				}
			})
		
		// Return update success
		response.status(200).send({ status: 'Sucess' })
	}
	catch (err) {
		response.status(500).send({ error: err.message })
	}
})

module.exports = router
