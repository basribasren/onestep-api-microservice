import jwt from 'jsonwebtoken'

const verifyGateway = (req, res, next) => {
    const key = req.headers['x-gateway-key'];
    if (!key) {
        return res.status(401).send({
            message: 'No key, authorization denied',
            url: req.baseUrl,
            method: req.method,
        });
    }
    try {
        const data = jwt.verify(key, process.env.GATE_SECRET);
        console.log('[GATEWAY] verify on token gateway success...')
        next();
    } catch (err) {
        console.log('[GATEWAY] verify on token gateway failed!')
        res.status(401).send({
            message: 'Key is not valid',
            url: req.baseUrl,
            method: req.method,
        });
    }
};

export default verifyGateway
