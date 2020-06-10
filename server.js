// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.get('/add', (req, res) => {
  res.send(projectData);
})


// Post Route
app.post('/', (req,res)=>{
  let newEntry = {
      date:req.body.date,
      temperature: req.body.temperature,
      content: req.body.content
    };
    Object.assign(projectData,newEntry);
    console.log(projectData);
});


// Setup Server
const port = 8000;

const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})