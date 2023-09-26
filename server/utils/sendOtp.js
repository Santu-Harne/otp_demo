const mailOtpTemplate = require('./../template/mailOtpTemplate')
const sendMail = require('../middleware/mail')
const sendSms = require('./../middleware/sms')

const sendOtp = async (eOtp, eTo, sOtp, sTo) => {
  const template = mailOtpTemplate(eOtp)
  const eSubject = 'Verification code'
  await sendMail(eTo, eSubject, template)
  sendSms(sOtp, sTo)
}
module.exports = sendOtp