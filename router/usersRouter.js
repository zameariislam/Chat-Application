
const express=require('express')
const router=express.Router()
const {getUsers}=require('../controller/usersContoller')
const decorateHtlResponse=require('../middlewares/common/decorateHtlResponse')


router.get('/',  decorateHtlResponse('Users'), getUsers)



module.exports=router