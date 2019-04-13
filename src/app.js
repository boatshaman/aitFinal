
const express = require("express");
const app = express();
require('./db.js');
const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize');
const session = require('express-session');

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


app.get('/', (req, res) => {

res.render("main", {});
});


const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
