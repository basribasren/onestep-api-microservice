#Log code

##Success Log
`#AMQP001` Success Creating AMQP Connection `Log on Line 50 .config.js`

`#AMQP002` Success Creating AMQP Channel `Log on Line 101 .config.js`
* Set the prefetch count for this channel. 
* The count given is the maximum number of messages sent 
* over the channel that can be awaiting acknowledgement; 
* once there are count messages outstanding, 
* the server will not send more messages on this channel 
* until one or more have been acknowledged. 
* A falsey value for count indicates no such limit.

`#AMQP003` Success Creating AMQP Queue `Log on Line 119 .config.js`

`#AMQP004` Success Publish Message `Log on Line 15 .helper.js`

`#AMQP005` -

##Warning Log
`#AMQP101` Reconnect AMQP Connection `Log on Line 67 .config.js`
Emitted if the connection closes for a reason other than #close being called or a graceful server-initiated close; such reasons include:
* - a protocol transgression the server detected (likely a bug in this library)
* - a server error
* - a network error
* - the server thinks the client is dead due to a missed heartbeat
* 'close' will also be emitted, after 'error'.

`#AMQP102` Closing AMQP Connection `Log on Line 88 .config.js`
* A channel will emit 'close' once the closing handshake (possibly initiated by #close()) has completed; or, 
* if its connection closes.

`#AMQP103` -

`#AMQP104` -

`#AMQP105` -


##Error Log
`#AMQP201` Failed Creating AMQP Connection `Log on Line 35 .config.js`
* Emitted once the closing handshake initiated by #close() has completed; or, 
* if server closed the connection, once the client has sent the closing handshake; or, 
* if the underlying stream (e.g., socket) has closed.

`#AMQP202` Failed Creating AMQP Channel `Log on Line 80 .config.js`
* A channel will emit 'error' if the server closes the channel for any reason. Such reasons include:
* - an operation failed due to a failed precondition (usually something named in an argument not existing)
* - an human closed the channel with an admin tool

`#AMQP203` Failed Creating AMQP Queue `Log on Line 122 .config.js`

`#AMQP204` Failed Publish Message `Log on Line 18 .helper.js`

`#AMQP205` Failed Consume Message `Log on Line 38 .helper.js`

