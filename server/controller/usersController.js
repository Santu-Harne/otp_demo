const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcryptjs')
const Users = require('../model/usersModel')
const { createAccessToken } = require('./../utils/accessToken')
const otpGenerator = require('otp-generator')
const sendOtp = require('./../utils/sendOtp')

let eOtp = null;
let sOtp = null;

const usersController = {
  register: async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body

      const encPassword = await bcrypt.hash(password, 10)

      const newUser = await Users.create({
        name,
        email,
        mobile,
        password: encPassword
      })
      eOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      sOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      sendOtp(eOtp, email, sOtp, mobile)

      res.status(StatusCodes.OK).json({ msg: "User registered Successfully", data: newUser })
    }
    catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { emailOtp, smsOtp } = req.body
      const id = req.params.id
      if (eOtp === emailOtp && sOtp === smsOtp) {
        await Users.findByIdAndUpdate({ _id: id }, { verified: true })
        eOtp = null;
        sOtp = null;
        res.status(StatusCodes.OK).json({ msg: "Account verified Successfully" })
      }
      else res.json({ msg: "Please try after some time!" })
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      // user email exists or not
      const extUser = await Users.findOne({ email })
      if (!extUser)
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User doesn't exists.." })

      // compare password
      const isMatch = await bcrypt.compare(password, extUser.password)
      if (!isMatch)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Password!" })

      // generate token
      const accessToken = createAccessToken({ _id: extUser._id })

      res.status(StatusCodes.OK).json({ token: accessToken, userId: extUser._id })

    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await Users.find({}).select("-password")

      res.status(StatusCodes.OK).json({ allUsers: users })
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  },
  getCurrent: async (req, res) => {
    try {
      const id = req.params.id
      const user = await Users.findOne({ _id: id }).select("-password")

      res.status(StatusCodes.OK).json(user)
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
  }
}

module.exports = usersController