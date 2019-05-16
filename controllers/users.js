const bcrypt = require('bcrypt');
const express = require('express');
const user = express.Router();
const User = require('../models/users.js')

// post route (to sign up a new user)
user.post('/', async (req, res) =>{

    // we wait for User.find to resolve (to find the user in the database with the same username)
    const foundUsers = await User.find({username: req.body.username});

    // if the user was found, we check if the password from user input matches the password in the database
    if (foundUsers.length > 0 && bcrypt.compareSync(req.body.password, foundUsers[0].password)) {
      // if there is a match, that user signed up before
      res.status(500).send('You signed up before. Go to Log In.')
    } else if (foundUsers.length > 0) {
      res.status(500).send('User with such a username already exists. Pick a different username')
    } else {
      // the user is new, create a new user and log in automatically
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

      User.create(req.body, (err, createdUser) => {
        if (err) {
          console.log(err)
          res.status(500).send('Error registering new user')
        } else {
          req.session.currentUser = createdUser;
          console.log('new user was created');
          res.status(200).json({success: 'New user created!'})
        }
      })
    }
})

module.exports = user;
