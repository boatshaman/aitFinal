// db.js
const mongoose = require('mongoose');


const Entry = new mongoose.Schema({
	createdBy: {type: String, required:true},
  	title: String,
	text: String,
	date: String
});

const Coordinate = new mongoose.Schema({
	memories: [Entry]
});

const User = new mongoose.Schema({
  username: {type: String, required:true},
  coords: [Coordinate]
});





let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode:
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/mapdiary';
}

mongoose.model('User', User);
mongoose.model('Coordinate', Coordinate);
mongoose.model('Entry', Entry);
mongoose.connect(dbconf);
