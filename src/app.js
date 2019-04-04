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
console.log("cool a connection!");
res.send("Hello!").end();
});


app.listen(3000);
