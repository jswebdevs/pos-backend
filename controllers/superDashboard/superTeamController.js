const superTeamMember = require('../../models/superDashboard/superTeamModel');
const superTeamMemberRole = require('../../models/superDashboard/superTeamMemberRole');

const jwt = require ('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: emailConfig.auth.user,
    to: email,
    subject: 'Your OTP for Verification',
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  };
  await transporter.sendMail(mailOptions);
};

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

exports.createsuperTeamMember = async (req, res) => {
  try {
    const {
      image,
      firstName,
      lastName,
      designation,
      username,
      email,
      phone,
      password,
      confirmPassword,
      userRole,
      enableCustomAccess,
      customPermissions
    } = req.body;

    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword)
      return res.status(400).json({ message: 'All required fields must be filled' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    if (enableCustomAccess && userRole)
      return res.status(400).json({ message: 'Cannot use both custom access and role' });

    const existingUser = await superTeamMember.findOne({ $or: [{ email }, { username }, { phone }] });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    let userRoleValue = null;
    if (userRole && userRole !== 'null' && userRole !== '') {
      const role = await UserRole.findById(userRole);
      if (!role) return res.status(400).json({ message: 'Invalid user role' });
      userRoleValue = role._id;
    }

    const newsuperTeamMember = new superTeamMember({
      image,
      firstName,
      lastName,
      designation,
      username,
      email,
      phone,
      password,
      userRole: userRoleValue,
      enableCustomAccess,
      customPermissions: enableCustomAccess ? customPermissions : [],
    });

    await newsuperTeamMember.save();

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({ message: 'Super Team Member created', user: newsuperTeamMember });
  } catch (error) {
    console.error('Create User error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
