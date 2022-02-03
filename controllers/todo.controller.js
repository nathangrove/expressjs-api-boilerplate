



module.exports = function(app) {
  
  // Create Schema
  var todoschema = new app.db.Schema({
    item: String
  });
  
  // create the model
  var TodoModel = app.db.model("Todo", todoschema);
  
  
  app.get('/todo', function(request, response) {
    // Get todos from MongoDB
    TodoModel.find({}, function(error, data) {
      if(error) throw error
      
      response.send(data);
      
    });
  });
  
  app.post('/todo', function(request, response) {
    // Insert todo into MongoDB
    var newTodo = TodoModel(request.body).save(function(error, data){
      if(error) throw error
      
      response.json(data);
    });
    
  });
  
  app.delete('/todo/:item', function(request, response) {
    // Delete todo from MongoDB
    TodoModel.find({_id: request.params.item.replace(/\-/g, ' ')}).remove(function(error, data) {
      if(error) throw error
      
      response.json(data);
    });
    
  });
  
};
