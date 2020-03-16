const express = require('express'),
	path = require( 'path' ),
	router = express.Router(),
	sqlite = require('sqlite'),
	multer = require('multer'),
	storage = multer.diskStorage({
		destination: (request, file, cb) => {
			cb(null, 'public/uploads/images/')
		},
		filename: (request, file, cb) => {
			cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`)
		}
	})
upload = multer({
	storage: storage
})
/**
 * ---------------------
 * Get a setting by name query
 * ---------------------
 */
router.get('/settings', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, {
				Promise
			}),
			// Try to get the setting
			setting = await db.get("SELECT * FROM settings WHERE name=?", [request.query.name])

		// Return the setting
		response.status(200).send(setting)
	} catch (err) {
		response.status(500).send({
			error: err.message
		})
	}
})

/**
 * ---------------------
 * Get all settings
 * ---------------------
 */
router.get('/settings/all', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, {
				Promise
			}),
			// try to get the setting
			setting = await db.all("SELECT * FROM settings"),
			settings = {}

		setting.forEach(set => {
			settings[set.name] = set.value
		})

		// return the settings
		response.status(200).send(settings)
	} catch (err) {
		response.status(500).send({
			error: err.message
		})
	}
})

/**
 * ---------------
 * Update settings
 * ---------------
 */
router.put('/settings', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, {
			Promise
		})
		// Update each settings
		request.body.forEach(async setting => {
			try {
				await db.run("UPDATE settings SET value=? WHERE name=?", [setting.value, setting.key])
			} catch (err) {
				response.status(500).send({
					error: err.message
				})
			}
		})

		// Return update success
		response.status(200).send({
			status: 'Sucess'
		})
	} catch (err) {
		response.status(500).send({
			error: err.message
		})
	}
})

router.post('/settings/frontpage', upload.single('file'), async (request, response, next) => {
	const errors = []

	const db = await sqlite.open(process.env.DATABASE, {
		Promise
	})
	if (request.file) {
		await db.run(
			"UPDATE settings set value = ? WHERE name = 'frontPageHero'",
			[
				request.file.destination.replace('public', '') + request.file.filename
			]
		)
	}
	await db.run(
		"UPDATE settings set value = ? WHERE name = 'frontPageText'",
		[
			request.body.text
		]
	)
	await db.run(
		"UPDATE settings set value = ? WHERE name = 'brandName'",
		[
			request.body.brand
		]
	)

})

module.exports = router
