import mongoose from 'mongoose'

const mongooseConfig = (isProduction, log) => {
	if (!isProduction) {
		mongoose.set('debug', true)
	}
	let uri = process.env.DB_MONGOODB_URI || 'mongodb://localhost:27017/sample'
	let configuration = {
		useFindAndModify: false,
		useNewUrlParser: true,
		useCreateIndex: true,
		keepAlive: true,
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 1000, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
	}
	mongoose.connect(uri, configuration)
	/**
	 * mongoose have 5 _event
	 * _events: [Object: null prototype] {
	 * 		error: [Function],
	 * 		connected: {
	 * 			[Function: bound onceWrapper] listener: [Function]
	 * 		},
	 * 		close: {
	 * 			[Function: bound onceWrapper] listener: [Function]
	 * 		},
	 * 		reconnected: [Function],
	 * 		disconnected: [Function]
	 * 	}
	 */
	mongoose.connection.on('error', () => {
		log.error('[Mongoose]', '#20#', 'connection to database failed!')
		mongoose.connection.close()
	})
	mongoose.connection.on('connected', () => {
		log.success('[Mongoose]', 'success connect to mongo database')
	})
	mongoose.connection.on('disconnected', () => {
		log.warning('[Mongoose]', '20#', 'trying reconnect to database...')
		mongoose.connect(uri, configuration)
	})
	return mongoose
}

export default mongooseConfig
