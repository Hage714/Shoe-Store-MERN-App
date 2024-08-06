const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) res.status(401).send({ error: "No token provided!!" });

    try {
        const decoded = jwt.verify(token, "1234")
        req.user = decoded.user;

        next()
    } catch (error) {
        console.log({ error: error.message });
        return res.status(400).send({ error: error.message })
    }
}

module.exports = {
    verifyToken
}