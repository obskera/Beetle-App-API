const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const ejs = require('ejs') 
const fetch = require('node-fetch')
const path = require('path')

// create express app
const app = express();

app.use(cors())

//set EJS as view engine e.g. res.render('index.ejs', {object: objectData}), make sure to get db data first and set as object
app.set('view engine', 'ejs')

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
//test
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', async (req, res) => {
    const response = await fetch('https://beetle-app-api.herokuapp.com/people');
    const data = await response.json();

    res.render('index.ejs', {all: data})
    console.log(data);
    //res.json({"message": "Welcome to Beetle Reporting application. Organize and keep track of your league players."});
    //fetch all people and put in all variable

    // fetch('https://beetle-app-api.herokuapp.com/people')
    // .then(all => {
    //     //render index ejs page as html and send
    //     res.render('index.ejs', {all: all})
    //   })
});

// Require Notes routes
require('./app/routes/note.routes.js')(app);
// Require People routes
require('./app/routes/person.routes.js')(app);

// listen for requests
const PORT = 8080
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}, you better go catch it!`);
});

//set default css/js/images to public folder
app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))