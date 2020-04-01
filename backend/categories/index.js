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
  categories = await db.all( 'SELECT * FROM categories' )

  // Return all categories
  response.send( categories )
})

/**
 * Get one category
 * @param {Number} id Category ID
 * @return {Object} Category
 */
router.get( '/categories/:id', async ( request, response ) => {
  // Open database connection
  const db = await sqlite.open( process.env.DATABASE, { Promise } ),

  // Try to get the category from the database
  category = await db.get( 'SELECT * FROM categories WHERE id=?', [
    request.params.id
  ])

  if ( !category ) {
    response.status( 400 ).send( {
      error: true,
      message: 'Något gick fel. Kategorin kunde inte hittas!'
    })

    return
  }

  response.send( category )
})

/**
 * Add a new category
 * @return {Object} Success || Error
 */
router.post( '/categories', async ( request, response ) => {
  // Declare errors 
  const errors = {}

  // Check if a category name have been supplied
  if ( !request.body.name && request.body.name.length < 3 ) {
      errors['name'] = 'Ett kategorinamn måste fyllas i!'
  }

  // Check if any errors have been encountered
  if ( Object.keys(errors).length > 0 ) {
    response.status(400).send( {
      error: true,
      errors: errors
    })
    return
  }

  // If no errors have been encountered, create the category
  const db = await sqlite.open( process.env.DATABASE, { Promise } )

  // Add the category to the database
  await db.run( 'INSERT INTO categories ( name, options ) VALUES ( ?, ? )', [
    request.body.name,
    JSON.stringify( [] )
  ])

  // Return OK response
  response.send({
    error: false,
    message: 'Kategorin har skapats!'
  })
})

/**
 * Add options to category
 * @return {Object} success
 */
router.put( '/categories/:id', async ( request, response ) => {
  // Open database connection
  const db = await sqlite.open( process.env.DATABASE, { Promise } )

  // Update the category
  await db.run( 'UPDATE categories SET options=? WHERE id=?', [
    JSON.stringify(request.body.options),
    request.params.id
  ])

  let message = ''
  // Sett message
  if ( request.body.delete ) {
    message = 'Värdet har tagits bort!'
  }
  else {
    message = 'Värdet har lagts till!'
  }

  // Return success
  response.send( {
    message: message
  })
})

/**
 * Remove category
 * @return {Object} success
 */
router.delete( '/categories/:id', async ( request, response ) => {
  // Open database connection
  const db = await sqlite.open( process.env.DATABASE, { Promise } )

  // Delete category from database
  await db.run( 'DELETE FROM categories WHERE id=?', [
    request.params.id
  ])

  // Return success
  response.send( {
    message: 'Kategorin har tagits bort!'
  })
})


module.exports = router