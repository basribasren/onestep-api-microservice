import amqp from 'amqplib'
/**
 * command to get list plugins: rabbitmq-plugins list
 * command to acrive GUI: rabbitmq-plugins enable rabbitmq_management 
 * default port rabbitmq: http://localhost:15672/
 * default user: guest
 * default pass: guest
 * lear about amqplib : https://www.squaremobius.net/amqp.node/channel_api.html
 */
const reconnecting = () => {
  createConnection()
}

const createConnection = async () => {
  try {
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: 'localhost',
      port: 5672,
      username: 'guest',
      password: 'guest',
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    })
    /**
     * Emitted once the closing handshake initiated by #close() has completed; or, 
     * if server closed the connection, once the client has sent the closing handshake; or, 
     * if the underlying stream (e.g., socket) has closed.
     */
    connection.on("error", function(err) {
      console.error(`[AMQP] connection error : ${err.message}`);
    });
    /**
     * Emitted if the connection closes for a reason other than #close being called or 
     * a graceful server-initiated close; such reasons include:
     * - a protocol transgression the server detected (likely a bug in this library)
     * - a server error
     * - a network error
     * - the server thinks the client is dead due to a missed heartbeat
     * 'close' will also be emitted, after 'error'.
     */
    connection.on("close", function() {
      console.error("[AMQP] reconnecting ...");
      return setTimeout(reconnecting, 5000);
    });
    console.log("[AMQP] connecion success: created");
    return connection
  } catch (err) {
    console.error("[AMQP]", err.message);
    return setTimeout(reconnecting, 1000);
  }
}

/**
 * Channels act like stream.Writable when you call publish or 
 * sendToQueue: they return either true, meaning “keep sending”, or 
 * false, meaning “please wait for a ‘drain’ event”.
 */
const createChannel = async (conn) => {
  const connection = await conn
  try {
    /**
     * Resolves to an open Channel 
     * May fail if there are no more channels available 
     * (i.e., if there are already channelMax channels open).
     */
    let channel = await connection.createChannel();
    /**
     * A channel will emit 'error' if the server closes 
     * the channel for any reason. Such reasons include:
     * - an operation failed due to a failed precondition 
     * (usually something named in an argument not existing)
     * - an human closed the channel with an admin tool
     */
    channel.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    /**
     * A channel will emit 'close' once the closing handshake 
     * (possibly initiated by #close()) has completed; or, 
     * if its connection closes.
     */
    channel.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    /**
     * Set the prefetch count for this channel. 
     * The count given is the maximum number of messages sent 
     * over the channel that can be awaiting acknowledgement; 
     * once there are count messages outstanding, 
     * the server will not send more messages on this channel 
     * until one or more have been acknowledged. 
     * A falsey value for count indicates no such limit.
     */
    channel.prefetch(10);
    console.log("[AMQP] channel success: created");
    return channel
  } catch (err) {
    console.error("[AMQP] create channel error:", err);
    await connection.close();
  }
}

/**
 * Assert a queue into existence. This operation is 
 * idempotent given identical arguments; however, 
 * it will bork the channel if the queue already exists 
 */
const createQueue = async (ch, queueName = 'message-service') => {
  const channel = await ch
  try {
    // durable: if true, the queue will survive broker restarts
    channel.assertQueue(queueName, { durable: true })
    console.log("[AMQP] queue success: created");
    return channel
  } catch (err) {
    console.error("[AMQP] create queue error:", err);
    connection.close();
  }
}

/**
 * Assert an exchange into existence. Unlike queues, you must supply a name, 
 * and it can’t be the empty string. You must also supply an exchange type, 
 * which determines how messages will be routed through the exchange.
 */
/**
const createExchange = async (ch, exchangeName = 'message-service', type = 'direct') => {
    const channel = await ch
    try {
        channel.assertExchange(exchangeName, type, { durable: true, })
        console.log("[AMQP] exchange success: created");
        return channel
    } catch (err) {
        console.error("[AMQP] create exchange error:", err);
        connection.close();
    }
}
*/

/**
 * Publish a single message to an exchange. The mandatory parameters are:
 * exchange and routingKey: the exchange and routing key, which determine where the message goes
 * content: a buffer containing the message content.
 * #publish(exchange, routingKey, content, options, function(err, ok) {...})
 */
/**
function publish(exchange, routingKey, content) {
  try {
    pubChannel.publish(exchange, routingKey, content, { persistent: true },
      function (err, ok) {
        if (err) {
          console.error("[AMQP] publish", err);
          offlinePubQueue.push([exchange, routingKey, content]);
          pubChannel.connection.close();
        }
      });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([exchange, routingKey, content]);
  }
}
*/

module.exports = { createConnection, createChannel, createQueue }
