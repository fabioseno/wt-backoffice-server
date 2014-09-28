/*global require, console, process*/
var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

// routes
router.get('/', function (req, res) {
    'use strict';
    
    res.send('home');
});

require('./routes/default')(router);
require('./routes/user')(router);
require('./routes/auth')(router);

app.use('/api', router);

// database
var mongoose = require('mongoose');
mongoose.connect('mongodb://bo:bo@localhost/backofficedb');
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
    'use strict';
    console.log('Database connected...');
});


// starting server
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port ' + port);