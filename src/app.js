
const express = require("express");
const app = express();
require('./db.js');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const session = require('express-session');
const Coordinate = mongoose.model('Coordinate');
const Entry = mongoose.model('Entry');
const cookieParser = require('cookie-parser')


app.use(cookieParser());
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });
app.set('views', __dirname + '/../views/');
app.use(express.urlencoded({extended:false}));
app.use(require("body-parser").json());
app.use(express.static('public'));
app.use(function(req, res, next){
  if(!req.cookies['db.identity']){
    res.set('Set-Cookie', 'db.identity='+Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }
      next();
  });


app.get('/', (req, res) => {

res.render("main", {});
});


app.get('/user-coordinates', (req, res) => {
   const cook = req.cookies['db.identity'];
  Coordinate.find({cookie:cook}, function(err, coords, count) {
    res.send(JSON.stringify(coords));
  });


});


app.get('/mem/:latlng/:memid', (req, res) => {
  const cook = req.cookies['db.identity'];
  Coordinate.findOne({cookie:cook, latlng:req.params.latlng}, function(err, coord, count) {
    coord.memories.forEach((mem) => {
      if(mem._id == req.params.memid){
        res.send(JSON.stringify(mem));
      }
    });
    // res.send(JSON.stringify(coord));
  });


});

app.get('/edit-memory/:latlng/:memid', (req, res) => {
  const cook = req.cookies['db.identity'];
  Coordinate.findOne({cookie:cook, latlng:req.params.latlng}, function(err, coord, count) {
    coord.memories.forEach((mem) => {
      if(mem._id == req.params.memid){
        res.render("editMem", {mem, latlng:req.params.latlng});
      }
    });
    // res.send(JSON.stringify(coord));
  });
});
  app.post('/edit-memory/:latlng/:memid', (req, res) => {
    const cook = req.cookies['db.identity'];
    Coordinate.findOne({latlng: req.params.latlng, cookie:cook }, function(err, coord) {
      const mem = coord.memories.id(req.params.memid);
      console.log("!!!",mem);
      mem.set(req.body);
      coord.save().then(function(saved){
        res.redirect("/");
        // res.send("Success");
        console.log("success");
      }).catch(function(err){
        res.status(500).send(err);
      });
      // res.redirect("/")
    

    });
    // BlogPost.findById(req.params.postId, function(err, post) {
    //   var subDoc = post.comments.id(req.params.commentId);
    //   subDoc.set(req.body);
    //
    //   // Using a promise rather than a callback
    //   post.save().then(function(savedPost) {
    //     res.send(savedPost);
    //   }).catch(function(err) {
    //     res.status(500).send(err);
    //   });
    // });


});

app.post('/add-coordinate', (req, res) => {
  const cook = req.cookies['db.identity'];
  const newObj = {cookie:cook};
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


app.post('/delete-coordinate', (req, res) => {
  const cook = req.cookies['db.identity'];
  const newObj = {cookie:cook};
  Object.keys(req.body).forEach((key) => {
    newObj[key] = sanitize(req.body[key])
  });
  console.log(newObj);
  Coordinate.deleteOne(newObj, function(err){
    if(err){
      console.log("error deleting");
      res.render("main", {error:"Error occured while deleting..."});
    }else{
      res.redirect('/');
    }

  });

});

app.get("/add-memory/:slug", (req, res) => {
  // console.log(req.params.slug);
  res.render("addMem", {latlng:req.params.slug});
});

app.post("/add-memory/:slug", (req, res) => {
  const latlng = req.params.slug;
  const cook = req.cookies['db.identity'];
  const query_obj = {latlng, cookie:cook};
  console.log(req.body);

  const newObj = {};
  Object.keys(req.body).forEach((key) => {
    newObj[key] = sanitize(req.body[key])
  });
  Coordinate.findOneAndUpdate({latlng, cookie:cook}, {$push: {memories: newObj}}, function(err, coord, count) {
    if(err){console.log("error adding memory");}
    res.redirect('/');
});



});



const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
