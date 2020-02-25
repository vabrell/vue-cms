const ENV = require('dotenv').config(),
	express = require('express'),
	app = express(),
	installApp = require('./install'),
	installCheck = require('./install/check'),
	users = require('./users'),
	products = require('./products')

app.use(express.json())

// Return 404 for API root
app.get('/', (request, response) => {
	response.status(404).send()
})

// Install routes
app.get('/install', installApp)
app.get('/install-check', installCheck)

// Products routes
app.use(products)

app.listen(3000)
