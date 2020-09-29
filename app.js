const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const app = express();

app.use(helmet());

const users = require('./routes/users');
const cars = require('./routes/cars');

app.use(logger('dev'));

// Bodyparser Middleware
app.use(express.json());


app.use('/users', users);
app.use('/cars', cars)

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.error(err);
});

const port = app.get('port') || 8080;
app.listen(port, () => console.log(`Server is listening on port ${port}`));


