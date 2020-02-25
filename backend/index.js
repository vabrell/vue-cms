const ENV = require('dotenv').config(),
	express = require('express'),
	app = express(),
	installApp = require('./install'),
	installCheck = require('./install/check')

// Install routes
app.get('/install', installApp)
app.get('/install-check', installCheck)

app.listen(3000)
