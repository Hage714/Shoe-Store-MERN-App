
const express = require('express');
const router = express.Router();
const { updateUser, getUsers, getUser } = require('../controllers/users');

//route
router.put('/:id', updateUser);
router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
