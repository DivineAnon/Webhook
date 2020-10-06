let queue = require("./helper/amqp_lib.js");

// Example
// var message = {type: '2', content: 'Hello RabbitMQ!!'};
// queue.publishExchange('lnsw.fanout', 'fanout', '', JSON.stringify(message))
// queue.publishExchange('lnsw.direct', 'direct', 'testroute1', JSON.stringify(message))

var message = {
    attributes : {
      userId: "john.doe",
      fullName: "John Doe",
      tokenClient: "kaskd",
      phoneNumber: "085",
      mailTo: "dedy@ilcs.co.id"
    },
    contents: {
      data: {
        uri : "/login/success",
        moduleName : "Registration",
        transactionId : "K/L0001",
        transactionData: {
            requestNumber: "test",
            moduleName: "test module",
            dateAccepted: "testing date",
            acceptedNumber: "accept12345"
          }
      },
      message : {
        type : "Notification",
        status : "Success",
        subject : "Send email with builder",
        text : "silahkan bla bla bla"
      }
    }
  }

queue.publishExchange('lnsw.e.notice', 'direct', 'notice.email', JSON.stringify(message))


