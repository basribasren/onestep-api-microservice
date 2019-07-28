import amqp from 'amqplib'

const reconnecting = () => {
  createConnection()
}

/**
 * command to get list plugins: rabbitmq-plugins list
 * command to active GUI: rabbitmq-plugins enable rabbitmq_management 
 * default port rabbitmq: http://localhost:15672/
 * default user: guest
 * default pass: guest
 * lear about amqplib : https://www.squaremobius.net/amqp.node/channel_api.html
 */
const createConnection = async (log) => {
  try {
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.AMQP_HOST,
      port: process.env.AMQP_PORT,
      username: process.env.AMQP_USER,
      password: process.env.AMQP_PASS,
      locale: 'en_US',
      frameMax: 0,
      heartbeat: 0,
      vhost: '/',
    })

    connection.on("error", function(err) {
      log.failed('[AMQP]', '#AMQP201', `connection error ${err.message}`)
    });

    connection.on("close", function() {
      log.warning('[AMQP]', '#AMQP101', 'reconnecting ...')
      return setTimeout(reconnecting, 5000);
    });
    log.success('[AMQP]', 'success created connection')
    return connection
  } catch (err) {
    log.failed('[AMQP]', '#AMQP201', `${err.message}`)
    return setTimeout(reconnecting, 1000);
  }
}

/**
 * Channels act like stream.Writable when you call publish or 
 * sendToQueue: they return either true, meaning “keep sending”, or 
 * false, meaning “please wait for a ‘drain’ event”.
 */
const createChannel = async (conn, log) => {
  const connection = await conn
  try {
    /**
     * Resolves to an open Channel 
     * May fail if there are no more channels available 
     * (i.e., if there are already channelMax channels open).
     */
    let channel = await connection.createChannel();

    channel.on("error", function(err) {
      log.failed('[AMQP]', '#AMQP202', `channel error ${err.message}`)
    });

    channel.on("close", function() {
      log.warning('[AMQP]', '#AMQP102', 'channel closed')
    });

    channel.prefetch(10);
    log.success('[AMQP]', 'success created channel')
    return channel
  } catch (err) {
    log.failed('[AMQP]', '#AMQP202', `create channel error ${err}`)
    await connection.close();
  }
}

/**
 * Assert a queue into existence. This operation is 
 * idempotent given identical arguments; however, 
 * it will bork the channel if the queue already exists 
 */
const createQueue = async (ch, queueName = 'message-service', log) => {
  const channel = await ch
  try {
    // durable: if true, the queue will survive broker restarts
    channel.assertQueue(queueName, { durable: true })
    log.success('[AMQP]', 'success created queue')
    return channel
  } catch (err) {
    log.failed('[AMQP]', '#AMQP203', `create queue error ${err}`)
    return connection.close();
  }
}

export default {
  createConnection,
  createChannel,
  createQueue
}
