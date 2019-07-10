import mongoose from 'mongoose'

const mongooseConfig = () => {
	if (process.env.APP_ENV === 'development') {
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
		console.log('[Mongoose] connection to database failed!')
		mongoose.connection.close()
	})
	mongoose.connection.on('connected', () => {
		console.log('[Mongoose] connection to database success...')
	})
	mongoose.connection.on('disconnected', () => {
		console.log('[Mongoose] trying reconnect to database...')
		mongoose.connect(uri, configuration)
	})
	return mongoose
}

export default mongooseConfig
