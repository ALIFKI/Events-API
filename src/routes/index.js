const express = require('express');
const router = express.Router()
const app = express()
const eventsRoute = require('./events');
// const AuthMiddleware= require('../middleware/auth')

router.use('/api/events',eventsRoute)

module.exports = router