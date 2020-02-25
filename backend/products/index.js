const express = require('express'),
	router = express.Router(),
	sqlite = require('sqlite')

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
			product = await db.all(
				`SELECT * FROM products WHERE id='${request.params.id}'`
			)

		// If there is no product, return an error
		if (product.length < 1) {
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
router.post('/products', async (request, response, next) => {
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
			const db = await sqlite.open(process.env.DATABASE, { Promise }),
				// Add the product to the database
				addProduct = await db.all(
					`INSERT INTO products(name, description, price, stock) VALUES('${request.body.name}', '${request.body.description}', '${request.body.price}', '${request.body.stock}')`
				)

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
router.put('/products/:id', async (request, response, next) => {
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
			const db = await sqlite.open(process.env.DATABASE, { Promise }),
				// Add the product to the database
				addProduct = await db.all(
					`UPDATE products SET name='${request.body.name}', description='${request.body.description}', price='${request.body.price}', stock='${request.body.stock}' WHERE id='${request.params.id}'`
				)

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
			product = await db.all(
				`SELECT id FROM products WHERE id='${request.params.id}'`
			)

		if (product.length < 1) {
			response.status(400).send({
				error: true,
				message: 'Produkten som försöktes tas bort, existerar inte.'
			})
		} else {
			const removeProduct = await db.all(
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
