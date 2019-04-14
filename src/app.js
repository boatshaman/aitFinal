
const express = require("express");
const app = express();
require('./db.js');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const session = require('express-session');
const Coordinate = mongoose.model('Coordinate');

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });
app.use(express.urlencoded({extended:false}));
app.use(require("body-parser").json());
app.use(express.static('public'));


app.get('/', (req, res) => {

res.render("main", {});
});


app.get('/user-coordinates', (req, res) => {

  Coordinate.find(function(err, coords, count) {
    res.send(JSON.stringify(coords));
  });


});

app.post('/add-coordinate', (req, res) => {
  const newObj = {};
  Object.keys(req.body).forEach((key) => {
    newObj[key] = sanitize(req.body[key])
  });
  console.log(newObj);
  new Coordinate(newObj).save(function(err, coord, count){
    if(err){
      res.render("main", {error:"Error occured..."});
  }else{
		res.redirect('/');
  }});

});


const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
