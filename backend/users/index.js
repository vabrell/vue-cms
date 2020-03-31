const express = require('express'),
  router = express.Router(),
  sqlite = require('sqlite'),
  bcrypt = require('bcrypt')

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

//  Hämtar databasen
router.post('/users/login', async (request, response, next) => {
  try {
    const database = await sqlite.open(process.env.DATABASE, { Promise })
    // hämta användaren från databasen
    const users = await database.all('SELECT * FROM users WHERE email = ?', [request.body.email])

    // Om de finns en användare
    if (users.length > 0) {
      // Kolla om lösenordet matchar
      const match = await bcrypt.compare(request.body.password, users[0].password)
      if (match) {
        const user = JSON.stringify({
          id: users[0].id,
          admin: users[0].admin
        })

        response.set('Set-Cookie', `login=${user}; path=/`)
        response.status(201).send(users[0])
        //om inte lösenordet stämmer överens med databasen
      } else {
        response.status(401).send({ error: true, messagePassword: 'Ogiltlig lösenord!' })
      }
    }
    // Om inte emailen hittas i databasen
    else {
      response.status(401).send({ error: true, messageEmail: 'Ogiltlig email!' })
    }


  } catch (err) {
    next(err)
  }
})
// Rensa cookie så att användaren loggat ut
router.get('/users/logout', async (request, response) => {
  response.set('Set-Cookie', 'login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
  response.send()
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
 * Forgotten password
 * *****************
 */

router.post('/users/passwordreset', async (request, response, next) => {
  try {
    const db = await sqlite.open(process.env.DATABASE, { Promise }),
      // Find the user with the supplied Email
      user = await db.all('SELECT * FROM users WHERE email=?', [request.body.email])
    if (user.length > 0) {
      if (user[0].securityQuestion === request.body.securityQuestion && user[0].securityAnswer === request.body.securityAnswer) {
        response.status(201).send({ error: false, user: user[0].id })
      } else {
        response.status(401).send({
          error: true,
          messageSecurityQuestion: 'Ogiltlig fråga eller svar!'
        })
      }
    } else {
      response.status(401).send({
        error: true,
        messageEmail: 'Ogiltlig email!'
      })

    }
  } catch (err) {
    next(err)
  }
})

/**
 * *****************
 * New password
 * *****************
 */

router.post('/users/newpassword', async (request, response, next) => {
  try {
    const db = await sqlite.open(process.env.DATABASE, { Promise }),
      // Find the user with the supplied ID
      hashedPassword = bcrypt.hashSync(request.body.password, 10),
      user = await db.run('UPDATE users SET password=? WHERE id=?', [hashedPassword, request.body.id])
    response.status(201).send({ message: 'Ditt lösenord har uppdaterats!' })
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

  //check if security question have been selected
  if (!request.body.securityQuestion) {
    errors.push({
      field: 'securityQuestion',
      message: 'Säkerhetsfrågan måste väljas.'
    })
  }

  //check if security question have been answered
  if (!request.body.securityAnswer) {
    errors.push({
      field: 'securityAnswer',
      message: 'Säkerhetsfrågan måste besvaras.'
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
          'INSERT INTO users(name, email, password, admin, securityQuestion, securityAnswer) VALUES(?, ?, ?, ?, ?, ?)',
          [request.body.name, request.body.email, password, admin, request.body.securityQuestion, request.body.securityAnswer]
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
