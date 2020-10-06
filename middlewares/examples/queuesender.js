let queue = require("./amqp_lib.js");
var message = {type: '2', content: 'Hello RabbitMQ!!'};
//example
queue.defaultQueueSender("amqp.test", JSON.stringify(message))