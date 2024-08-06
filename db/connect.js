const mongoose = require('mongoose');
const connectionString = "mongodb://localhost:27017/shosstoredb";

const connectDatabase = async () => {
    await mongoose
        .connect(connectionString)
        .then(() => console.log('Database connected successfully'))
        .catch((error) => console.log(error.message));
}

module.exports = { connectDatabase }

