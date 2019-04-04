// db.js
const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs');


const User = new mongoose.Schema({
  username: {type: String, required:true},
  coords: [Coordinate]
});

const Coordinate = new mongoose.Schema({
	memories: [Entry]
});

const Entry = new mongoose.Schema({
	createdBy: {type: String, required:true},
  	title: String,
	text: String,
	date: String
});



mongoose.model('User', User);
mongoose.model('Coordinate', Coordinate);
mongoose.model('Entry', Entry);
mongoose.connect('mongodb://localhost/mapdiary');
