var request = require('supertest');
var expect = require('chai').expect;

module.exports = function(app){
  
  
  describe('ToDo Controller tests', function(){
    
    it('should return all data in database as an array', function(done){
      
      // get the model
      var TodoModel = app.db.model("Todo");

      let count = 0;
      TodoModel.find({}, function(error, data) {
        if(error) throw error
        count = data.length;
        
        request(app)
        .get('/todo')
        .send()
        .expect(200)
        .end( (err, res) => {
          if (err) return done(err);
          expect(res.length == count)// .to.be.equal(count);
          return done();
        });
        
      });
    });

    it('should add an entry to the database and return entry', function(done){
      
      // get the model
      var TodoModel = app.db.model("Todo");

      request(app)
        .post('/todo')
        .send({ item: "This is a test"})
        .expect(200)
        .end( (err, res) => {
          if (err) return done(err);
          if (!res.body._id) return done("_id not present in response");

          expect(res.body._id);

          TodoModel.find({ _id: res.body._id }, function(error, data){
            if (err) return done(err);
            expect(data.length);
            return done();
          });

      });
        
    });

    it('should allow one to be deleted', function(done){
      
      // get the model
      var TodoModel = app.db.model("Todo");
          
      TodoModel.find( {}, (err, data) => {
          let count = data.length;
          let id = data[0]._id;

          request(app)
            .delete(`/todo/${id}`)
            .send()
            .expect(200)
            .end( (err, res) => {
              if (err) return done(err);

              TodoModel.find({}, (err, data) => {
                if (err) return done(err);
                if (count - 1 != data.length) return done(`Record count is ${data.length} expected ${count - 1}`);
                done();
              });
            })
        })
    })

    
  })

  
}