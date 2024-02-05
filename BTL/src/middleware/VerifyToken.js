const jwt = require("jsonwebtoken");

verifyToken =  (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({error: true, message: "Token không được cung cấp"});
    }

    token = token.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, decoded) => {
        if (err) {
            return res.status(401).send({error: true, message: "Từ chối truy cập"});
        }
        req.username = decoded.username;
        next();
    });
};


module.exports = verifyToken;