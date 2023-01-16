// external imports
const express = require("express");

// internal imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtlResponse");

const router = express.Router();

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post("/",decorateHtmlResponse("Login"), login);

module.exports = router;