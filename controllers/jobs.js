const express = require('express')
const jobs = express.Router()
const User = require('../models/users')
const Job = require('../models/jobs')
const mongoose = require('mongoose')

// post route (to display a list of jobs of the logged in user)
jobs.post('/', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, foundUser) => {
        if (err) {
            res.status(400).send({error: err.message})
        }
        // convert jobs ids from stings to document ids
        const jobsIds = foundUser.jobs.map(job => {
            return mongoose.Types.ObjectId(job)
        })
        // get jobs that are in user jobs array
        Job.find({
            '_id': {$in: jobsIds}
        }, (err, foundJobs) => {
            if (err) {
                res.status(400).send({error: err.message})
            }
            res.status(200).send(foundJobs)
        })
    })
})


// create route (to create a new job and to push id to user's jobs array)
jobs.post('/create', (req, res) => {
    // save the username from req.body
    const user = req.body.username
    // delete the username property from req.body
    delete req.body.username

    // create a new job
    Job.create(req.body, (error, createdJob) => {
        if (error) {
          res.status(400).json({ error: error.message });
        } else {
          console.log('createdJob=', createdJob);
          // push the created job's id into user jobs array
          User.findOneAndUpdate(
            {username: user},
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


// destroy route (to remove a job from the list of jobs)
jobs.delete('/:id', (req, res) => {
    // remove a job from the database
    Job.findByIdAndRemove(req.params.id, (err, deletedJob) => {
        if (err) {
        res.status(400).json({ error: err.message });
        } else {
            // delete the removed job's id from user jobs array
            User.findOneAndUpdate(
                {username: req.body.username},
                {
                    $pull: {jobs: deletedJob._id}
                },
                {new: true},
                (err, updatedUser) => {
                    res.status(200).send(deletedJob)
                }
            )
        }
    })
})


// update route (to switch 'applied/not applied')
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
