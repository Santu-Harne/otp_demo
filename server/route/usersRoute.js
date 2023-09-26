const route = require("express").Router()
const usersController = require('./../controller/usersController')

//user auth
route.post(`/register`, usersController.register)
route.post(`/login`, usersController.login)
route.get(`/getall`, usersController.getAll)
route.get(`/getcurrent/:id`, usersController.getCurrent)
route.post(`/verify-account/:id`, usersController.verifyOtp)

module.exports = route