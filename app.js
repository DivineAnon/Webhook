var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const helmet = require('helmet');
const cors = require('cors');


function loging(req, res, next) {
  var logger = require('./middlewares/logger_winston');
  let appName = process.env.APP_NAME;
  let requestTime = new Date(Date.now());
  let request = {
    method: req.method,
    url: req.url,
    body: req.body
  }
  console.log(request);

  let tmp = res.send;
  res.send = function (data) {
    let executionTime = (new Date() - requestTime) + 'ms';
    let response = {
      statusCode: res.statusCode,
      body: (data) ? JSON.parse(data) : null
    };
    let log = {
      appName,
      requestTime: dateFormat(requestTime, "yyyy-mm-dd HH:MM:ss"),
      executionTime,
      request,
      response
    }
    // log level error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
    logger.log('info', JSON.stringify(log));
    tmp.apply(res, arguments);
  }
  next();
}

var getListCommodity = require('./routes/SSMServices/getListCommodityKI');
var checkPPJKKI = require('./routes/SSMServices/checkPPJKKI');
var checkPJ = require('./routes/SSM/checkPJ');
var skkMigas = require('./routes/SSMMigas/skkMigas');

var app = express();

app.use(helmet());
app.use(cors());
app.use(loging);
app.use(require('sanitize').middleware);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/wsdl', getListCommodity);
app.use('/api/wsdl', checkPPJKKI);
app.use('/api/wsdl', checkPJ);
app.use('/api/wsdl', skkMigas);

app.use((req, res, next) => {
  res.status(404).json({
    code: '02',
    error: 'Not Found'
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  })
});

module.exports = app;
