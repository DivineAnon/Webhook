let queue = require("./amqp_lib.js");

queue.defaultQueueReceiver('logs', '', function(message) {
    console.log(new Date().toString() + ' incoming message : ' + message);  
    // return message;    
});