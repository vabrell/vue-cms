const express = require('express'),
    path = require('path'),
    router = express.Router(),
    sqlite = require('sqlite')

/**
 * ****************
 * Get all orders
 * ****************
 */
router.get('/orders', async (request, response, next) => {
    try {
        const db = await sqlite.open(process.env.DATABASE, {
                Promise
            }),
            // Get all the orders from the database
            orders = await db.all('SELECT * FROM orders')

        // Return the found orders
        response.status(200).send(orders)
    } catch (err) {
        next(err)
    }
})

/**
 * ***************
 * Get one order
 * ***************
 */
router.get('/orders/:id', async (request, response, next) => {
    // Try to get the order to check if it exists
    try {
        const db = await sqlite.open(process.env.DATABASE, {
                Promise
            }),
            // Look for the product supplied
            orders = await db.get('SELECT * FROM orders WHERE id=?', [
                request.params.id
            ])

        // If there is no order, return an error
        if (orders.length < 1) {
            response.status(400).send({
                error: true,
                message: 'Ordern kunde inte hittas.'
            })

            // If the order exists, return the orders
        } else {
            response.status(200).send(orders)
        }
    } catch (err) {
        next(err)
    }
})

/**
 * *****************
 * Add a new order
 * *****************
 */

router.post('/orders', async (request, response, next) => {
    const errors = []

    // Check if a order status is supplied
    if (!request.body.status) {
        errors.push({
            field: 'status',
            message: 'En status på ordern måste fyllas i.'
        })
    }

    // Check if a shipping of the order have been supplied
    if (!request.body.shipping) {
        errors.push({
            field: 'shipping',
            message: 'Ett leveranssätt för produkten måste fyllas i.'
        })
    }

    // Check if details have been supplied
    if (!request.body.details) {
        errors.push({
            field: 'details',
            message: 'Addressuppgifter måste skickas med.'
        })
    }

    // Check if a products have been supplied
    if (!request.body.products) {
        errors.push({
            field: 'products',
            message: 'Produkter måste skickas med.'
        })
    }

    // Check if a payment method have been supplied
    if (!request.body.payment) {
        errors.push({
            field: 'payment',
            message: 'Betalningsmetod måste skickas med.'
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
            const db = await sqlite.open(process.env.DATABASE, {
                Promise
            })
            // Add the order to the database
            await db.run(
                'INSERT INTO orders(status, shipping, products, details, payment) VALUES(?, ?, ?, ?, ?)',
                [
                    request.body.status,
                    request.body.shipping,
                    request.body.products,
                    request.body.details,
					request.body.payment
                ]
            )

					const lastOrder = await db.get( 'SELECT * FROM orders ORDER BY id DESC LIMIT 1' )

            // Return created status
            response.status(201).send({
                error: false,
                message: 'Ordern har lagts till.',
								order: lastOrder
            })
        } catch (err) {
            next(err)
        }
    }
})

/**
 * *****************
 * Update a order
 * *****************
 */

router.put('/orders/:id', async (request, response, next) => {
    const errors = []

    // Check if a order status is supplied
    if (!request.body.status) {
        console.log(request.body)
        errors.push({
            field: 'status',
            message: 'En status måste fyllas i.'
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
            const db = await sqlite.open(process.env.DATABASE, {
                Promise
            })
            await db.run(
                'UPDATE orders SET status=? WHERE id=?',
                [
                    request.body.status,
                    request.params.id
                ]
            )

            // Return created status
            response.status(201).send({
                error: false,
                message: 'Ordern har uppdaterats.'
            })
        } catch (err) {
            next(err)
        }
    }
})


module.exports = router
