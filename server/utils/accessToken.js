const jwt = require("jsonwebtoken")

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5h' })
}

module.exports = { createAccessToken }