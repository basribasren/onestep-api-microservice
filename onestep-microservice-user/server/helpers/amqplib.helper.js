const log = require('./logger.helper.js')

/**
 * #sendToQueue(queue, content, [options])
 * Send a single message with the content given as a buffer 
 * to the specific queue named, bypassing routing. 
 * The options and return value are exactly the same as for #publish.
 */
const send = async (amqp, msg) => {
    const connection = await amqp.connection
    const channel = await amqp.channel
    // message type must a string, Buffer, ArrayBuffer, Array, or Array-like Object.
    let message = Buffer.from(JSON.stringify(msg)); //change json to buffer
    try {
        channel.sendToQueue(amqp.queueName, message)
        return log.success('[AMQP]', 'success publish message')
    } catch (err) {
        log.failed('[AMQP]', '#AMQP204', `publish message error ${err}`)
        connection.close();
        throw new Error(`publish message error ${err}`)
    }
}

/**
 * #consume(queue, function(msg) {...}, [options])
 * Set up a consumer with a callback to be invoked with each message.
 * noAck (boolean): if true, the broker won’t expect an acknowledgement 
 * of messages delivered to this consumer; i.e., it will dequeue messages 
 * as soon as they’ve been sent down the wire. Defaults to false 
 * (i.e., you will be expected to acknowledge messages).
 */
// amqp.consume(connection, channel, 'message-queue')
const consume = async (amqp) => {
    // const connection = await amqp.connection
    // const channel = await amqp.channel
    // try {
    //     channel.consume(amqp.queueName, _processMessage, { noAck: true })
    // } catch (err) {
    //     log.failed('[AMQP]', '#AMQP205', `consume message error ${err}`)
    //     connection.close();
    // }
}

// const _processMessage = (message) => {
//     let temp = JSON.parse(message.content.toString());
//     console.log(temp)
// }

module.exports = { send, consume }
