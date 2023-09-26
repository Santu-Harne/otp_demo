const mongoose = require('mongoose')

const connect = mongoose.connect(process.env.USERS_MONGO_URL)
  .then(response => console.log('users database connected successfully'))

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  collection: "users",
  timestamps: true
})

module.exports = mongoose.model("Users", UsersSchema)