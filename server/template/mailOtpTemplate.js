
const mailOtpTemplate = (otp) => {

  return `<div>
  <div style="text-align:center; background-color:#EEEEEE; display: inline-block; padding: 50px; border-radius: 40px 5px">
  <h1 style="color:purple;">UNISTOREINDIA</h1>
  <div style="text-align:center" }}>
    <h3>Hello!</h3>
    <p>Please use the verification code below on the UniStoreIndia website:</p>
    <h2 style="height:40px; background-color: #E9F1FE">${otp}</h2>
    <p>If you didn't request this, you can ignore this email or let us know.</p>
    <p>Thanks! <br /> UniStoreIndia Team</p>
  </div>
</div>
  </div>`
}

module.exports = mailOtpTemplate