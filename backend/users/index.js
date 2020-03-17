const express = require('express'),
  router = express.Router(),
  sqlite = require('sqlite'),
  bcrypt = require('bcrypt')

const router = express()

router.use(express.json())

/**
 * *****************
 * Get all the users
 * *****************
 */
router.get('/users', async (request, response, next) => {
  try {
    const db = await sqlite.open(process.env.DATABASE, { Promise }),
      // Get all the users from the database
      users = await db.all('SELECT * FROM users')

    response.status(200).send(users)
  } catch (err) {
    next(err)
  }
})

/**
 * ************
 * Get one user
 * ************
 */
let database

sqlite.open('database.sqlite').then(database_ => {
  database = database_
})

router.post('/users/login', (request, response) => {

  database.all('SELECT * FROM users WHERE name = ? AND password = ?', [request.body.name, bcrypt.hashSync(request.body.password, 10)]).then(users => {
    if (users.length === 0) {
      reponse.status(401).send(alert('Fel, Kontrollera ditt användarnamn eller lösenord'))
    } else {
      response.send(alert('Du har loggat in!'))
    }
  })
})

router.get('/users/:id', async (request, response, next) => {
  try {
    const db = await sqlite.open(process.env.DATABASE, { Promise }),
      // Find the user with the supplied ID
      user = await db.get('SELECT * FROM users where id=?', [request.params.id])

    if (user.length < 1) {
      response.status(400).send({
        error: true,
        message: "The user doesn't exist."
      })
    } else {
      response.status(200).send(user)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * *****************
 * Create a new user
 * *****************
 */
router.post('/users', async (request, response, next) => {
  const errors = []

  // Check if a name have been supplied
  if (!request.body.name) {
    errors.push({
      field: 'name',
      message: 'Namn måste anges.'
    })
  }

  // Check if an e-mail have been supplied
  if (!request.body.email) {
    errors.push({
      field: 'email',
      message: 'En e-post måste anges.'
    })
  }

  // Check if a password have been supplied
  if (!request.body.password) {
    errors.push({
      field: 'password',
      message: 'Ett lösenord måste anges.'
    })
  }

  // Check if confirmation password have been supplied
  if (!request.body.confirmPassword) {
    errors.push({
      field: 'passwordConfirm',
      message: 'Lösenordet måste upprepas.'
    })
  }

  // Check if the password and confirmation password is the same
  if (
    request.body.confirmPassword &&
    request.body.confirmPassword &&
    request.body.password !== request.body.confirmPassword
  ) {
    errors.push({
      field: 'password',
      message: 'Lösenorden måste stämma överrens.'
    })
  }

  // If there is any errors, send them back
  if (errors.length > 0) {
    response.status(400).send(errors)
  } else {
    // Generate encrypted password
    const password = bcrypt.hashSync(request.body.password, 10)

    // Set if the user should be admin
    let admin = request.body.admin ? Number(request.body.admin) : 0

    try {
      const db = await sqlite.open(process.env.DATABASE, { Promise }),
        // Add the new user
        addUser = await db.run(
          'INSERT INTO users(name, email, password, admin) VALUES(?, ?, ?, ?)',
          [request.body.name, request.body.email, request.body.password, admin]
        )

      response.status(201).send({
        error: false,
        message: 'Användaren har skapats.'
      })
    } catch (err) {
      next(err)
    }
  }
})

module.exports = router
