const express = require('express'),
	app = express(),
	installApp = require('./install'),
	installCheck = require('./install/check'),
	users = require('./users'),
	products = require('./products'),
	settings = require('./settings'),
  orders = require('./orders'),
  categories = require( './categories' )

require('dotenv').config()

app.use(express.json())

// Prevent Express CORS problems
app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*')
	response.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

// Return 404 for API root
app.get('/', (request, response) => {
	response.status(404).send()
})

// Install routes
app.get('/install', installApp)
app.get('/install-check', installCheck)

// Users routes
app.use(users)

// Products routes
app.use(products)

// Settings routes
app.use(settings)

// Orders routes
app.use(orders)

// Categories routes
app.use( categories )

app.listen(3000)
