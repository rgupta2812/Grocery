const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const path = require('path');
const morgan = require("morgan");
const routes = require('./routes');
const config = require('./config/configuration');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors({ origin: true, credentials: true }));
app.use(
  session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: { sameSite: 'lax', maxAge: 1 * 60 * 60 * 10000, secure: false },
    store: new MongoStore({ mongoUrl: config.mongoose.url }),
  }),
);

app.use('/api/gs', routes);


module.exports = app;
