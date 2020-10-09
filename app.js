'use strict';

const config = require("./config.js");
const token = 'mcphooks', apiUrl = config.apiUrl;
const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser.json());

process.on('unhandledRejection', err => {
  console.log(err)
});	

app.post('/receive-webhook', (req, res) => {
  if(req.body !== token){
    return res.status(401);
  }
  return res.status(200).send(req.body);
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