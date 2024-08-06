const bcrypt = require("bcryptjs"); // for hashing passwords
const jwt = require("jsonwebtoken"); // for generating JWT tokens
const User = require("../models/users");

const login = async (req, res) => {
    const { email, password } = req.body;

    console.log({ email: email, password: password })

    try {
        const user = await User.findOne({ "email": email });
        if (!user) return res.status(404).send({ error: `user with email: ${email} not found!!` })

        const passwordMatches = bcrypt.compare(password, user.password);
        if (!passwordMatches) return res.status(400).send({ error: "Incorrect Password!!" });

        const token = await jwt.sign({ user: { id: user._id, name: user.name, email: user.email, role: user.role } }, "1234", { expiresIn: "60h" })
        res.send({ token }).status(200)

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    login
}