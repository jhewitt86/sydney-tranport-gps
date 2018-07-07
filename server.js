var express = require('express'),
    app = express(),
    port = process.env.PORT || 3006,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Declare routs
var routes = require('./api/routes/routes');
routes(app);

// Start database
const database = require('./api/controllers/db-controller');

database.start( () => {
  database.getAll( (response) => {
    console.log(response);
  });
});

// Route errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port);

console.log('Running on ' + port);
