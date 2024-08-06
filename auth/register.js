const bcrypt = require("bcryptjs");
const Customer = require("../models/customers");
const User = require("../models/users");

const register = async (req, res) => {
    const data = req.body

    console.log(data);

    try {
        const existingCustomer = await User.findOne({ "email": data.email });
        if (existingCustomer) return res.status(400).send({ error: `Customer with email: ${data.email} already exists!` })

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role
        });
        await newUser.save()

        if (!newUser) return res.status(400).send({ error: "User could not be created!!" })
        if (data.role === "customer") {
            const newCustomer = await Customer.create({ user: newUser._id })
            console.log(newCustomer);
        }
        return res.send({ message: `Customer with email: ${data.email} successfully created` }).status(201)

    } catch (error) {
        console.log({ error: error.message });
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    register
}