// external imports
const express = require("express");

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtlResponse");
const { doLoginValidators, loginValidationHandler } = require("../middlewares/login/loginValidator");

const router = express.Router();

// set page title 

const page_title = 'Login'

// login page
router.get("/", decorateHtmlResponse(page_title), getLogin);
router.post("/", decorateHtmlResponse(page_title),
    doLoginValidators(),
    loginValidationHandler,
    login
)

module.exports = router;