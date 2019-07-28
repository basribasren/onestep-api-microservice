const user = require('../user/user.service.js');
const helper = require('../../helpers/user.helper.js');

const authController = {
    // [POST] http://localhost:3000/api/v1/auth/change-password/:jwt<account>
    changePassword: (req, res, next) => {
        let data = helper.verifyToken(req.params.jwt)
        helper.generatePassword(req.body.newPassword)
            .then(hash => {
                return user.update(data.user.email, hash)
            })
            .then(account => {
                delete account.password
                res.status(201).send({
                    message: 'chang password success',
                    data: account,
                });
            })
            .catch(err => next(err))
    },

    // [POST] http://localhost:3000/api/v1/auth/verify-email/:jwt<account>
    verifyEmail: (req, res, next) => {
        let data = helper.verifyToken(req.params.jwt)
        user.update(data.user.email, { verified: true })
            .then(account => {
                delete account.password
                res.status(201).send({
                    message: 'verify email success',
                    data: account,
                });
            })
            .catch(err => next(err))
    },

    /**
     * LOGIN - SKENARIO
     * @skenario 2 - get user by username
     * @skenario 3 - comparing password
     * @skenario 4 - generate token using jwt
     * @skenario 5 - set session
     * @skenario 6 - return payload
     */
    login: (req, res, next) => {
        let dataUser = {};
        user.get(req.body.username)
            .then((account) => {
                if (!account) {
                    throw new Error(`user with ${req.body.username} is not found`);
                }
                dataUser = account;
                return helper.comparePassword(req.body.password, account.password);
            })
            .then((isMatch) => {
                if (isMatch) {
                    delete dataUser.password;
                    const token = helper.generateToken(dataUser);
                    res.status(200).send({
                        message: 'login success!',
                        data: {
                            token: token
                        },
                    });
                } else {
                    throw new Error('password not match... login failed!');
                }
            })
            .catch(err => next(err));
    },

    /**
     * LOGOUT - SKENARION
     * @skenario 2 - get token from session
     * @skenario 4 - destroy session
     * issue - when set wrong token, log out still success
     */
    logout: (req, res, next) => {
        const { token } = req.query.token;
        // req.session.destroy();
        res.status(200).send({
            message: 'logout success',
            data: {},
        });
    }
};
module.exports = authController;
