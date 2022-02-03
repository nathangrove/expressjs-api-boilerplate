var express = require('express');
const fs = require('fs');

// an array of controller tests
var controllers = [];
fs.readdirSync('./controllers/').forEach(file => {
  if (file.indexOf(`.test.js`) > -1) controllers.push(file.split(/\./g)[0]);
});


var controllerObjects = [];
var controllerTests = [];

// include controllers and their tests
controllers.forEach( controller => {
  controllerObjects.push(require(`./controllers/${controller}.controller.js`));
  controllerTests.push(require(`./controllers/${controller}.test.js`));
})


// create the express app instance
function createApp(){
  
  var app = express();
  app.db = require('mongoose');
  app.db.connect('mongodb://127.0.0.1:27017/todolist');
  
  
  // Bind the controllers
  controllerObjects.forEach( controller => controller(app) );
  // todocontroller(app);
  
  return app;
}



describe('API Test', function() {

  // init the express app
  var app;
  app = createApp();
  app.listen(function(err) {
    if (err) { return done(err); }
  });
  
  after(function(done){
    app.db.disconnect();
    done();
  })

  
  // call the controller tests
  controllerTests.forEach( test => test(app) );
  
});