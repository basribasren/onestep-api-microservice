const jwt = require('jsonwebtoken');

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
    next();
  } catch (err) {
    res.status(401).send({
      message: 'Key is not valid',
      url: req.baseUrl,
      method: req.method,
    });
  }
};

module.exports = { verifyGateway }
