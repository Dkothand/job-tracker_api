const bcrypt = require('bcrypt')
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js')

// post route (to log in)
sessions.post('/', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            res.status(500).send('internal error')
        }
        if (!foundUser) {
            res.status(401).send('wrong username or password!')
        } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // auto log in when a new user signs up
            req.session.currentUser = foundUser;
            res.status(200).send('logged In')
        } else {
            res.status(401).send('wrong username or password!')
        }
    });
});

// destroy route (to log out)
sessions.delete('/delete', (req, res)=>{
    req.session.destroy(() => {
        res.status(200).send('logged out');
        console.log('logged out');
    })
})


module.exports = sessions;
