const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');  
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();  //instance of express

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'public')));


//Database configuration
const { connectDatabase } = require("./db/connect")
connectDatabase();

// Authenticate Middleware
const { verifyToken } = require("./middleware/authenticate");

// Routes
const authRoutes = require("./routes/auth");
const shoeRoutes = require("./routes/shoes");
const userRoutes = require('./routes/users');
const purchaseShoeRoutes = require("./routes/purchaseshoes");
const contactRoutes = require("./routes/contact");
const orderRoutes = require("./routes/orders");
const SaleRoutes = require("./routes/sales");


//Base route(home page of the server)
app.get('/', (req, res) => {
    res.send({ msg: "Welcome to the Express Server!" }).status(200);
});

app.use("/auth", authRoutes);
app.use("/shoes", verifyToken, shoeRoutes);
app.use("/users", verifyToken, userRoutes);
app.use("/purchaseshoes", verifyToken, purchaseShoeRoutes);
app.use("/contact",verifyToken, contactRoutes);
app.use("/orders",verifyToken, orderRoutes); 
app.use("/sales",verifyToken, SaleRoutes);


// start the server
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})