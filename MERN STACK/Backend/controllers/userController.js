const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Generate a password reset token
    const token = crypto.randomBytes(32).toString("hex");
    const user = awaitUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: error.message });
    }

    user.resetToken = token;
    user.resetToeknExpiration = Date.now() + 3600000;

    await user.save();

    //Send a password reset email with a link containing the token
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset",
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

  const document = await Document.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!document) {
    return res.status(400).json({ error: "No such document" });
  }

  res.status(200).json(document);
};

module.exports = { loginUser, signupUser, forgotPassword };
