const session = require('express-session');
const redisStore = require('connect-redis');
/**
 * use session if store succesfully create
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
const sessionConfig = (app, redis) => {
    try {
        const NewStore = redisStore(session);
        const store = new NewStore(redis.options);
        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        app.use(session({
            secret: process.env.TOKEN_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                path: '/',
                secure: false,
                maxAge: expiryDate,
                httpOnly: true,
            },
            store,
        }));
        return app
    } catch (err) {
        return console.log('SESSION Error:' + err.message)
    }

};

module.exports = sessionConfig;
