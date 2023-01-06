
//  external imports 

const express = require('express')
const router = express.Router()

const {check}=require('express-validator')

// internal imports  

const { getUsers,addUser } = require('../controller/usersContoller')
const avatarUpload = require('../middlewares/users/avatarUpload')
const decorateHtlResponse = require('../middlewares/common/decorateHtlResponse')
const {addUserValidators,addUserValidationHandler}=require('../middlewares/users/usersValidators')



router.get('/', decorateHtlResponse('Users'), getUsers)
router.post('/', avatarUpload,addUserValidators,addUserValidationHandler,addUser
)



module.exports = router