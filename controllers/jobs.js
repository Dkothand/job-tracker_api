const express = require('express')
const jobs = express.Router()
const User = require('../models/users')
const Job = require('../models/jobs')
const mongoose = require('mongoose')

// INDEX ROUTE
jobs.get('/', (req, res) => {
    const userJobs = req.session.currentUser.jobs
    const jobsIds = userJobs.map(job => {
        return mongoose.Types.ObjectId(job)
    })
    Job.find({
        '_id': {$in: {jobsIds}}
    }, (err, foundJobs) => {
        if (err) {
            res.status(400).send({error: err.message})
        }
        res.status(200).send(foundJobs)
    })
})


// CREATE ROUTE - TESTED AND CONFIRMING CREATE ROUTE WORKS (DEVIN)
jobs.post('/', (req, res) => {
    // res.send('create route hit!')
    console.log('req is', req.body)
    Job.create(req.body, (error, createdJob) => {
        if (error) {
          res.status(400).json({ error: error.message });
        } else {
          console.log('createdJob=', createdJob);
          // need to push createdJob ._id to the logged in User's job array
          // find user by id
          User.findByIdAndUpdate(
              req.session.currentUser._id,
              {
                  $push: {jobs: createdJob._id}
              },
              {new: true},
              (err, updatedUser) => {
                  console.log(updatedUser)
                  res.status(200).send(createdJob)
              }
            )
        }
    })
})

// destroy route (DELETE) - TESTED AND CONFIRMING EDIT ROUTE WORKS (DEVIN)
jobs.delete('/:id', (req, res) => {
    Job.findByIdAndRemove(req.params.id, (err, deletedJob) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else {
        res.status(200).json(deletedJob);
        }
    })
})

// update route (PUT) - TESTED AND CONFIRMING UPDATE ROUTE WORKS (DEVIN)
jobs.put('/:id', (req, res) => {
    Job.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedJob) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else {
        res.status(200).json(updatedJob);
        }
    })
})



module.exports = jobs
