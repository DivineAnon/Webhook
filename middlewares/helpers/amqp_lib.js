require('dotenv').config();
var amqp = require('amqplib/callback_api');
var url = 'amqp://' + process.env.AMQP_USER + ':' + process.env.AMQP_PASSWORD + '@' + process.env.AMQP_HOST +':'+ process.env.AMQP_PORT;

function defaultQueueSender(queueName, message) {
    amqp.connect(url, function(error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }
            channel.assertQueue(queueName, {durable: true});
            channel.sendToQueue(queueName, Buffer.from(message), {persistent: true});
            console.log(new Date().toString() + " [x] Queue %s : Content '%s'", queueName, message);
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
}

function defaultQueueReceiver(queueName, message) {
    amqp.connect(url, function(error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function(error, channel) {
            if (error) {
                throw error;
            }
            channel.assertQueue(queueName, {durable: true});
            channel.prefetch(1);
            channel.consume(queueName, function(msg) {
                console.log(new Date().toString() + " [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
                console.log(new Date().toString() + " [x] Received %s", msg.content.toString());
                message(msg.content);
                setTimeout(function() {
                    channel.ack(msg);
                }, 1000);
            }, {
                noAck: false
            });
        });
    });
}

function publishExchange(exchangeName, exchangeType, routingKey, message) {
    amqp.connect(url, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            channel.assertExchange(exchangeName, exchangeType, {durable: true});
            channel.publish(exchangeName, routingKey, Buffer.from(message));
            console.log(new Date().toString() + " [x]  Sent %s", message);
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
}

function subscribeExchange(exchangeName, exchangeType, message) {
    amqp.connect(url, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
   
            channel.assertExchange(exchangeName, exchangeType, {durable: true});
            channel.assertQueue('', {
                exclusive: true
            }, function(error2, q) {
                if (error2) {
                    throw error2;
                }
                console.log(new Date().toString() + " [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                channel.bindQueue(q.queue, exchangeName, '');
    
                channel.consume(q.queue, function(msg) {
                    if (msg.content) {
                        console.log(new Date().toString() +  " [x] %s", msg.content.toString());
                    }
                    message(msg.content);
                }, {
                    noAck: true
                });
            });
        });
    });
}


// --------------------------------------------------
module.exports = {
    defaultQueueSender,
    defaultQueueReceiver,
    publishExchange,
    subscribeExchange
};