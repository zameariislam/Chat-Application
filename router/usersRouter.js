// external imports
const express = require("express");

const { check } = require("express-validator");
const router = express.Router();
// internal imports
const { getUsers, addUser, removeUser } = require("../controller/usersController");
const checkLogin = require("../middlewares/common/checkLogin");

const decorateHtmlResponse = require("../middlewares/common/decorateHtlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidators");


const User = require('../models/People')

// users page
router.get("/", decorateHtmlResponse("Users"),
    checkLogin,
    getUsers);

// add user 
router.post('/',
    checkLogin,

    avatarUpload,
    addUserValidators(),
    addUserValidationHandler,
    addUser

)
router.delete('/:id', checkLogin,
    removeUser
)

module.exports = router

