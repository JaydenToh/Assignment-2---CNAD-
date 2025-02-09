const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: `"Notification Service" <${process.env.EMAIL_USER}>`,
    to: "liewzhanyang@gmail.com",
    subject: "Notification Service",
    text:"hi hihi",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = { sendEmail };
