const config = require("./config.js");
const token = 'mcphooks', apiUrl = config.apiUrl;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const helmet = require('helmet');
const cors = require('cors');
const fetch = require('node-fetch');

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

app.post('/receive-webhook', (req, res) => {
  return res.status(200).json({
    code : '200',
    message: 'Berhasil Mendapatkan Payload',
    data: req.body
  });
});

app.post('/add-webhook', async function (req, res) {
  const data = req.body;
    for (var i in data.messages) {
        const id = data.messages[i].author;
        const orderNo = data.messages[i].body;
        const bookingType = data.messages[i].chatId;
        const storeOrderId = data.messages[i].senderName;
        const errorMessage = data.messages[i].author;
        const prebook = data.messages[i].body;
        const prebookMessage = data.messages[i].chatId;
        if(data.messages[i].fromMe)return;
        
        if(/help/.test(body)){
            await apiChatApi('message', {chatId: chatId, body: text});
        }else if(/chatId/.test(body)){
            await apiChatApi('message', {chatId: chatId, body: chatId});
        }else if(/file (pdf|jpg|doc|mp3)/.test(body)){
            const fileType = body.match(/file (pdf|jpg|doc|mp3)/)[1];
            const files = {
                doc: "http://domain.com/tra.docx",
                jpg: "http://domain.com/tra.jpg",
                mp3: "http://domain.com/tra.mp3",
                pdf: "http://domain.com/tra.pdf"
            };
            var dataFile = {
                phone: author,
                body: files[fileType],
                filename: `File *.${fileType}`
            };
            if(fileType == "jpg")dataFile['caption'] = "Text under the photo.";
            await apiChatApi('sendFile', dataFile);
        }else if(/ptt/.test(body)){            
            await apiChatApi('sendAudio', {audio: "http://domain.com/tra.ogg", chatId: chatId});
        }else if(/geo/.test(body)){
            await apiChatApi('sendLocation', {lat: 51.178843, lng: -1.826210, address: 'Stonehenge', chatId: chatId});
        }else if(/group/.test(body)){
            let arrayPhones = [ author.replace("@c.us","") ];
            await apiChatApi('group', {groupName: 'Bot group', phones: arrayPhones, messageText: 'Welcome to the new group!'});
        }
    }
    res.send('Ok');
});

app.listen(3000, () => console.log('[Testing] Webhook is listening'));

async function apiChatApi(method, params){
  const options = {};
  options['method'] = "POST";
  options['body'] = JSON.stringify(params);
  options['headers'] = { 'Content-Type': 'application/json' };
  
  const url = `${apiUrl}/${method}?token=${token}`; 
  
  const apiResponse = await fetch(url, options);
  const jsonResponse = await apiResponse.json();
  return jsonResponse;
}