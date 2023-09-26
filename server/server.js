require('dotenv').config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { StatusCodes } = require("http-status-codes")
const path = require("path")

// port
const PORT = process.env.PORT

// ref
const app = express()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware
app.use(cors())
app.use(cookieParser(process.env.ACCESS_TOKEN_SECRET)) // add token_secret only for signed cookies

// route modules
const usersRoute = require('./route/usersRoute')

// primary route 
app.use('/api/users/', usersRoute)



const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is listening @ http://localhost:${PORT}`);
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
  }
}

start()