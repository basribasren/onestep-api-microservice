const user = require('../user/user.service.js');
const helper = require('../../helpers/user.helper.js');

const authController = {
    verifyEmail: (req, res, next) => {
        // how to verify
    },

    /**
     * user mengklik link pada email yang telah dikirimkan
     * sistem mengambil data pada param jwt
     * user memasukkan password baru
     * user memasukkan confirm password
     * user mengklik button change password
     * sistem membuat hash dari password
     * sistem mengupdate account by email
     */
    // [POST] http://localhost:3000/api/v1/auth/change-password/:jwt<account>
    changePassword: (req, res, next) => {
        let data = helper.verifyToken(req.params.jwt)
        helper.generatePassword(req.body.newPassword)
            .then(hash => {
                return user.update(data.user.email)
            })
            .then(account => {
                delete account.password
                res.status(201).send({
                    message: 'please check your email for reset the password',
                    data: account,
                });
            })
            .catch(err => next(err))
    },

    changeUsername: (req, res, next) => {
        // how to change username
    },
    changeRole: (req, res, next) => {
        // how to change role
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
