let queue = require("../middlewares/amqp_conn.js");
let message = queue.defaultExchange('task1');
console.log(message);
