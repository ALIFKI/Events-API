const express = require('express')
const router = express.Router()
const eventController = require('../controller/eventsController')
const helper = require('../helpers/upload')

router.post('/',helper.upload.single('image'),eventController.postEvent)
router.get('/',eventController.getEvents)


module.exports = router

