const models = require('../models');

const { User } = models;
const attributes = [
    'id',
    'username',
    'password',
    'email',
    'role',
    'verified'
];

const userService = {
    /**
     * get user by username
     * @type {[type]}
     */
    get: username => {
        return User.findOne({
                attributes: attributes,
                where: { username: username },
            })
            .then(user => {
                return user.get({ plain: true })
            })
            .catch((err) => {
                throw new Error(`${err.name}: get detail user failed!`);
            })
    },
    /**
     * get list user with limit 50 by default
     * @type {[type]}
     */
    list: (role) => {
        return User.findAll({
                limit: Number(50),
                offset: Number(0),
                attributes: attributes,
                where: { role: role },
            })
            .then(users => {
                return users
            })
            .catch((err) => {
                throw new Error(`${err.name}: get list user failed!`);
            })
    },

    /**
     * create user
     * @return {[type]}      [description]
     */
    create: data => {
        return User.create(data)
            .then(result => {
                return result.get({ plain: true })
            })
            .catch((err) => {
                throw new Error(`${err.name}: create new user failed!`);
            })
    },

    /**
     * update user by username
     * @return {[type]}        [description]
     */
    update: (username, data) => {
        return User.update(data, {
                where: {
                    username,
                },
            })
            .then(result => {
                return result
            })
            .catch((err) => {
                throw new Error(`${err.name}: update new user failed!`);
            });
    },

    /**
     * remove user by username
     * @return {[type]}        [description]
     */
    remove: username => {
        return User.destroy({
                where: {
                    username: username,
                },
            })
            .then(result => {
                return result
            })
            .catch((err) => {
                throw new Error(`${err.name}: delete user failed!`);
            })
    },
};


module.exports = userService;
