<h1>JobsHunter</h1>

<h2>Jobs Hunter Back-End Overview </h2>

<p>
Job Hunters removes the friction of having to visit multiple job platforms or search your inbox to find your dream job! 
</p>

<p>
The Jobs Hunter application solves the problem of job seekers searching for jobs online and not having a simple way to save the jobs they are interested in. As employers distribute jobs across the internet, job seekers can come across jobs anywhere. Prior to Job Hunters, one of the ways to save a job was to email yourself the link.
</p>

<p>
Users can add the company name, job title, role description and a link to the online application. The added jobs are then saved to the “Jobs Inbox.” A user can directly access the job link to apply and update their jobs inbox to reflect so.
</p>

<h2>Technical Details </h2>

<p>
To build the back-end of the Jobs Hunter application we used Express.js, Node.js. MongoDB, and Mongoose. There are routes to handle user login as well as full CRUD implementation for jobs the users wants to view and create. 
</p>

<p>
The technical challenges we experienced to build the back-end were:

<li>Creating a relationship between the users model and the jobs model in the database</li>

<li>Pulling all of the jobs the user has added to the frontend for rendering in the browser </li>

<li>Creating a relationship between our backend and front end while working on both localhost ports and heroku deployment </li>

<li>Allowing cross-origin access for requests between our frontend and backend </li>

</p>

<h2>Improvements</h2>

<p> The project had a deadline of six days to build. If granted more time, we would build out ...

<li>Better relation between our database models. When looking at the app and the tasks it performs, having the jobs model nested in the users in a one-to-many relationship would be a better implementation.</li>

<li>User authentication is not enabled through express-sessions. We were not able to store the user session through this method despite having success in past projects of a similar stack. With more time, we could debug and create a better solution to store user session via Express resulting in a smoother implementation of user authorization.</li>

</p>
