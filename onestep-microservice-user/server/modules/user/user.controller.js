const userService = require('./user.service.js');
const emailService = require('../email/email.service.js');
const helper = require('../../helpers/user.helper.js');
const uuidv1 = require('uuid/v1');

/**
 * generate data
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
const generateData = (data, role) => {
    return helper.generatePassword(data.password)
        .then((hash) => {
            if (!data.username) {
                data.username = generateUsername()
            }
            const user = {
                username: data.username,
                password: hash,
                email: data.email,
                role: role,
            };
            return user;
        })
        .catch((err) => {
            throw new Error('generate data user failed');
        })
}

/**
 * if user register using passport,
 * username will undefined. so, we'll
 * create random username in initial.
 * @return {[type]} [description]
 */
const generateUsername = () => {
    const randomNumber = uuidv1();
    return randomNumber
}

const userController = {
    get: (req, res, next) => {
        const client = req.app.get('redis.connection')
        const key = `user:get:${req.params.username}`;
        client.get(key, (err, result) => {
            if (result) {
                const user = JSON.parse(result)
                delete user.password
                return res.status(200).send({
                    message: 'get detail user success',
                    data: user,
                });
            } else {
                userService.get(req.params.username)
                    .then((result) => {
                        delete result.password;
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get detail user success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },

    list: (req, res, next) => {
        const client = req.app.get('redis.connection')
        const key = `user:list`;
        client.get(key, (err, result) => {
            if (result) {
                const filter = JSON.parse(result).map(user => {
                    delete user.password
                    return user
                })
                return res.status(200).send({
                    message: 'get list user success',
                    data: filter,
                });
            } else {
                userService.list('user')
                    .then((users) => {
                        const filter = users.map(user => {
                            delete user.password
                            return user
                        })
                        return filter
                    })
                    .then((result) => {
                        client.setex(key, 3600, JSON.stringify(result))
                        res.status(200).send({
                            message: 'get list user success',
                            data: result,
                        });
                    })
                    .catch(err => next(err));
            }
        })
    },

    create: (req, res, next) => {
        generateData(req.body, 'user')
            .then(data => {
                return userService.create(data)
            })
            .then((user) => {
                delete user.password;
                const jwt = helper.generateToken({ email: user.email })
                return emailService.sendVerifyEmail({
                        connection: req.app.get('amqp.connection'),
                        channel: req.app.get('amqp.channel'),
                        queueName: 'message-queue',
                    }, user.email, jwt)
                    .then(() => {
                        return user
                    })
                    .catch(err => {
                        // if amqp failed then delete the user
                        userService.remove(user.username)
                        throw err
                    })
            })
            .then(result => {
                res.status(201).send({
                    message: 'create user success',
                    data: result,
                });
            })
            .catch(err => next(err));
    },

    update: (req, res, next) => {
        generateData(req.body, 'user')
            .then((data) => {
                return userService.update(req.params.username, data);
            })
            .then((result) => {
                res.status(201).send({
                    message: 'update user success',
                    data: result,
                });
            })
            .catch(err => next(err));
    },

    remove: (req, res, next) => {
        userService.remove(req.params.username)
            .then(result => {
                res.status(201).send({
                    message: 'remove user success',
                    data: result,
                });
            })
            .catch(err => next(err));
    },
};

module.exports = userController;
