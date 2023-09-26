const route = require('express').Router()
const mailController = require('./../controller/mailController')

route.post('/sendotp', mailController.sendOtp);

module.exports = route