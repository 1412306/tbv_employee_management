const jwtHelper = require("../helpers/jwt.helper");
const config = global.config

const accessTokenSecret = config.accessTokenSecret;

let isAuth = async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
            req.jwtDecoded = decoded;
            req.userLogin = decoded.data;
            next();
        } catch (error) {
            console.log("Error while verify token:", error);
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
}
module.exports = {
    isAuth: isAuth,
};