const express = require('express'),
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
	}),
  upload = multer({ storage: storage })

/**
 * ****************
 * Get all products
 * ****************
 */
router.get('/products', async (request, response, next) => {
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// Get all the products from the database
			products = await db.all('SELECT * FROM products')

		// Return the found products
		response.status(200).send(products)
	} catch (err) {
		next(err)
	}
})

/**
 * ***************
 * Get one product
 * ***************
 */
router.get('/products/:id', async (request, response, next) => {
  // Try to get the product to check if it exists
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// Look for the product supplied
			product = await db.get('SELECT * FROM products WHERE id=?', [
				request.params.id
      ])
      
		// If there is no product, return an error
		if (!product) {
			response.status(400).send({
				error: true,
				message: 'Produkten kunde inte hittas.'
			})

			// If the product exists, return the product
		} else {
			response.status(200).send(product)
		}
	} catch (err) {
		next(err)
	}
})

/**
 * *****************
 * Add a new product
 * *****************
 */
router.post('/products', upload.single('file'), async (request, response, next) => {
	const errors = []

	// Check if a product name is supplied
	if (!request.body.name) {
		errors.push({
			field: 'name',
			message: 'Ett produktnamn måste fyllas i.'
		})
	}

	// Check if a description of the product have been supplied
	if (!request.body.description) {
		errors.push({
			field: 'description',
			message: 'En beskrivning om produkten måste fyllas i.'
		})
	}

	// Check if a price have been supplied
	if (!request.body.price) {
		errors.push({
			field: 'price',
			message: 'Ett pris måste fyllas i.'
		})
	}

	// Check if the price is a number
	if (request.body.price && isNaN(request.body.price)) {
		errors.push({
			field: 'price',
			message: 'Priset måste vara ett nummer.'
		})
	}

	// Check if a stock amount have been supplied
	if (!request.body.stock) {
		errors.push({
			field: 'stock',
			message: 'Lagerslado måste fyllas i.'
		})
	}

	// Check if the stock amount is a number
	if (request.body.stock && isNaN(request.body.stock)) {
		errors.push({
			field: 'stock',
			message: 'Lagerslado måste vara ett nummer.'
		})
	}

	// Check if there is any errors with the request
	if (errors.length > 0) {
		// Send back errors
		response.status(400).send({
			error: true,
			errors: errors
		})
	} else {
		try {
			const db = await sqlite.open(process.env.DATABASE, { Promise })
				// Add the product to the database
				
				// Check if a image have been uploaded
				if (request.file) {
					await db.run(
						'INSERT INTO products(name, description, image, price, stock, categories) VALUES(?, ?, ?, ?, ?, ?)',
						[
							request.body.name,
							request.body.description,
							request.file.destination.replace('public', '') + request.file.filename,
							request.body.price,
              request.body.stock,
              request.body.categories
						]
					)
				}
				else {
					await db.run(
						'INSERT INTO products(name, description, price, stock, categories) VALUES(?, ?, ?, ?, ?)',
						[
							request.body.name,
							request.body.description,
							request.body.price,
              request.body.stock,
              request.body.categories
						]
					)
				}


			// Return created status
			response.status(201).send({
				error: false,
				message: 'Produkten har lagts till.'
			})
		} catch (err) {
			next(err)
		}
	}
})

/**
 * *****************
 * Update a product
 * *****************
 */
router.put('/products/:id', upload.single('file'), async (request, response, next) => {
	const errors = []

	// Check if a product name is supplied
	if (!request.body.name) {
		errors.push({
			field: 'name',
			message: 'Ett produktnamn måste fyllas i.'
		})
	}

	// Check if a description of the product have been supplied
	if (!request.body.description) {
		errors.push({
			field: 'description',
			message: 'En beskrivning om produkten måste fyllas i.'
		})
	}

	// Check if a price have been supplied
	if (!request.body.price) {
		errors.push({
			field: 'price',
			message: 'Ett pris måste fyllas i.'
		})
	}

	// Check if the price is a number
	if (request.body.price && isNaN(request.body.price)) {
		errors.push({
			field: 'price',
			message: 'Priset måste vara ett nummer.'
		})
	}

	// Check if a stock amount have been supplied
	if (!request.body.stock) {
		errors.push({
			field: 'stock',
			message: 'Lagerslado måste fyllas i.'
		})
	}

	// Check if the stock amount is a number
	if (request.body.stock && isNaN(request.body.stock)) {
		errors.push({
			field: 'stock',
			message: 'Lagerslado måste vara ett nummer.'
		})
	}

	// Check if there is any errors with the request
	if (errors.length > 0) {
		// Send back errors
		response.status(400).send({
			error: true,
			errors: errors
		})
	} else {
		try {
			const db = await sqlite.open(process.env.DATABASE, { Promise })
				// Update the product in the database

				// Check if a new image have been uploaded
				if (request.file) {
					await db.run(
						'UPDATE products SET name=?, description=?, image=?, price=?, stock=?, categories=? WHERE id=?',
						[
							request.body.name,
							request.body.description,
							request.file.path.replace('public', ''),
							request.body.price,
              request.body.stock,
              request.body.categories[1],
							request.params.id
						]
					)
				}
				else {
					await db.run(
						'UPDATE products SET name=?, description=?, price=?, stock=?, categories=? WHERE id=?',
						[
							request.body.name,
							request.body.description,
							request.body.price,
							request.body.stock,
              request.body.categories[1],
							request.params.id
						]
					)
				}

			// Return created status
			response.status(201).send({
				error: false,
				message: 'Produkten har uppdaterats.'
			})
		} catch (err) {
			next(err)
		}
	}
})

/**
 * ****************
 * Delete a product
 * ****************
 */
router.delete('/products/:id', async (request, response, next) => {
	// Check if the product exists
	try {
		const db = await sqlite.open(process.env.DATABASE, { Promise }),
			// Look for a product with the supplied ID
			product = await db.get('SELECT id FROM products WHERE id=?', [
				request.params.id
			])

		if (product.length < 1) {
			response.status(400).send({
				error: true,
				message: 'Produkten som försöktes tas bort, existerar inte.'
			})
		} else {
			await db.run(
				`DELETE FROM products WHERE id='${request.params.id}'`
			)

			response.status(200).send({
				error: false,
				message: 'Produkten har tagits bort.'
			})
		}
	} catch (err) {
		next(err)
	}
})

module.exports = router
