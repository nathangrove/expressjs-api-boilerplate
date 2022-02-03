const bodyParser = require('body-parser');
var express = require('express');
const fs = require('fs');


// load the route controllers
var controllers = [];
fs.readdirSync('./controllers/').forEach(file => {
  if (file.indexOf(`.controller.js`) > -1) controllers.push(require(`./controllers/${file}`));
});

// Init express
var app = express();

// load up the db
app.db = require('mongoose');
app.db.connect(`mongodb://${process.env.MONGO_HOST}:27017/db`);

// Static files
app.use(express.static('./public'));

// JSON parser
app.use(bodyParser.json());

// Load controllers
controllers.forEach( (controller) => controller(app) );

// Listen to port
app.listen(process.env.HTTP_PORT);
console.log("Your Listening to the port ", process.env.HTTP_PORT)
