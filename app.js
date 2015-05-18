var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var logger = require('morgan');
var log = require('./lib/log')(module);

var app = express();
var port = process.env.PORT || config.get('port');


app.set('views', __dirname + '/views');
app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');

if (app.get('env') == 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('combined'));
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./routes')(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(port, function() {
  log.info('Listening on port ' + port);
});