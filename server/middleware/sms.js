require('dotenv').config()
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const sendSms = async (sOtp, phone) => {

  const message = `
  Hello Customer!

  Please use the verification code below on the UniStoreIndia website:
  OTP :${sOtp}
  If you didn't request this, you can ignore or let us know.

  Thanks!
  UniStoreIndia Team`

  let options = {
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
    body: message,
    channel: "sms"
  }
  try {
    const response = await client.messages.create(options)
    // console.log(response);
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendSms;