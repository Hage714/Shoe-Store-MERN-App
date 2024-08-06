const express = require("express");

const { login } = require("../auth/login");
const { register } = require("../auth/register");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;