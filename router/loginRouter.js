
const express = require('express')
const router = express.Router()
const { getLogin } = require('../controller/loginController')
const decorateHtmlResponse = require('../middlewares/common/decorateHtlResponse')


router.get('/', decorateHtmlResponse('Login'), getLogin)



module.exports = router