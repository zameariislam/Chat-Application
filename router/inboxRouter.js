
const express = require('express')
const router = express.Router()
const { getInbox } = require('../controller/inboxController')
const decorateHtlResponse = require('../middlewares/common/decorateHtlResponse')


router.get('/', decorateHtlResponse('Inbox'), getInbox)



module.exports = router