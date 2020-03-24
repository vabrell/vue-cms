const express = require('express'),
	router = express.Router(),
  sqlite = require('sqlite')
  
/**
 * Get all categories
 * @return {Array} Categories
 */
router.get( '/categories', async ( request, response ) => {
  // Open database connection
  const db = await sqlite.open( process.env.DATABASE, { Promise } ),

  // Get all categoried
  categories = db.all( 'SELECT * FROM categories' )

  // Return all categories
  response.send( categories )
})

module.exports = router