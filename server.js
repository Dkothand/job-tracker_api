
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3003
const app = express()
const Job = require('./models/jobs.js')
const session = require('express-session');


// Database connection
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost:27017/jobs'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongoose...')
})

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(cors())
app.use(express.json()); //use .json(), not .urlencoded()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))


// CONTROLLERS
const jobsController = require('./controllers/jobs')
app.use('/jobs', jobsController)

const userController = require('./controllers/users.js')
app.use('/users', userController)

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);



// INDEX ROUTE (for testing purposes)
app.get('/', (req, res) => {
  console.log(req.headers)
   res.send('Hello World')
  })

// seed route (for testing purposes)
app.get('/seed', (req, res) => {
  Job.create([
    {
      agency: "DEPARTMENT OF BUSINESS SERV.",
      business_title: "Account Manager",
      job_description: "ies to increase M/WBE utilization.  The primary objective for the Account Manager is to help agencies increase the number and dollar value of contracts awarded to M/WBE at various contract levels.  Specifically, the Account Manager will seek to bring agencies into compliance with the Citywide utilization goals and other metrics used for measuring agency performance. Each account manager will be responsible for procurements of all sizes and methods for their respective agencies.  The Account Manager will report to the Director of Procurement Initiatives.    Account Manager Model  Each agency has very specific vendor requirements and needs, as well as obstacles to increasing M/WBE Utilization. The account mana",
    },
    {
      agency: "NYC HOUSING AUTHORITY",
      business_title: "Maintenance Worker - Technical Services-Heating Unit",
      job_description: "Under direct supervision, assist in the routine maintenance operation and repair of public buildings, structures, and the equipment they contain; perform related work.  Responsibilities  include, but are not limited to the following:    1.  Perform minor and major repairs to boilers, burners, vacuum tank, pumps, motors and other various heating equipment citywide.  2.  Survey and report on existing conditions of heating equipment.  3.  Assist Heating Superintendent with periodic reports.  4.  Assist skill trades staff.  5.  Provide assistance during emergencies.  6.  Respond to all heating/hot water service disruptions.    Candidates selected must be available to work and travel throughout the five boroughs; and will be required to work rotating shifts, including holidays and weekends.    8:00 AM - 4:00 PM  4:00 PM - 12:00 AM  12:00 AM - 8:00 AM",
    },
    {
      agency: "DEPARTMENT OF BUSINESS SERV.",
      business_title: "Account Manager",
      job_description: "ies to increase M/WBE utilization.  The primary objective for the Account Manager is to help agencies increase the number and dollar value of contracts awarded to M/WBE at various contract levels.  Specifically, the Account Manager will seek to bring agencies into compliance with the Citywide utilization goals and other metrics used for measuring agency performance. Each account manager will be responsible for procurements of all sizes and methods for their respective agencies.  The Account Manager will report to the Director of Procurement Initiatives.    Account Manager Model  Each agency has very specific vendor requirements and needs, as well as obstacles to increasing M/WBE Utilization. The account mana",
    },
    {
      agency: "DEPT OF HEALTH/MENTAL HYGIENE",
      business_title: "Contract Analyst",
      job_description: "OPEN TO PERMANENT PROCUREMENT ANALYSTS ONLY. YOU MUST CLEARLY STATE YOUR CIVIL SERVICE STATUS ON YOUR COVER LETTER.  ALL OTHER CANDIDATES WILL NOT BE CONSIDERED.      The mission of the Bureau of HIV/ AIDS Prevention and Control (the Bureau) is to prevent new infections and reduce morbidity and mortality among HIV-infected persons. The goals of the Administration Unit of the Bureau is to provide the necessary administrative support and coordination in the areas of contract administration; procurement; human resources management; fiscal administration; and contracts management to enable the program areas (",
    },
    {
      agency: "DEPT OF ENVIRONMENT PROTECTION",
      business_title: "ASSOCIATE CHEMIST",
      job_description: "Working in the Distribution Water Quality Operations Division, Organic Section, Queens, New York, the Associate Chemist II will report to the Organic Lab Section Supervisor and will perform and oversee complex testing of drinking water samples for trace organic contaminants by one or more gas chromatographic methods. This person will be responsible for maintaining the capability of the organic section to perform testing by their assigned methods, including: training analysts, maintaining stocks of equipment and supplies, diagnosing instrument problems and performing routine maintenance on gas chromatographs. The Associate Chemist will also draft or review analytical reports, Standard Operating Procedures (SOPs), and final reports to external agencies for his/her assigned methods. They shall participate in analysis of proficiency samples from NYS Department of Health Environmental Laboratory Approval Program (ELAP) and other Proficiency Test (PT) suppliers.",
    },
    {
      agency: "NYC HOUSING AUTHORITY",
      business_title: "Cost Estimating Manager",
      job_description: "Reporting to the Deputy Director of Technical Planning, with latitude for independent judgment, the Cost Estimating Manager is responsible for oversight and management of the day-to-day operations of the Cost Estimating Section of Capital Planning.  Responsibilities include, but are not limited to the following:    1.  Supervise cost estimating staff.  2.  Plan, assign and review work of subordinates.   3.  Oversee the preparation of various levels of cost estimates for the planning, design, construction, remodeling or repair of buildings, mechanical systems or various installations.  4.  Monitor quantity takeoffs and cost evaluations in relation to contract drawings, specifications or",
    },
  ])
})

//Listener
app.listen(PORT, () => {
    console.log('Hello World', PORT)
})
