// external imports
const express = require("express");

const { check } = require("express-validator");
const router = express.Router();
// internal imports
const { getUsers, addUser, removeUser } = require("../controller/usersController");

const decorateHtmlResponse = require("../middlewares/common/decorateHtlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators");


const User = require('../models/People')

// users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user 
router.post('/', decorateHtmlResponse('Users'),
    avatarUpload,
    addUserValidators(),
    addUserValidationHandler,
    addUser

)
router.delete('/:id', removeUser)

module.exports = router

