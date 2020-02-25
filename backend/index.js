const express = require('express'),
	app = express()

app.get('/', (request, response) => {
	response.send('Hello from API')
})

app.listen(3000)
