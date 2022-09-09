const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

// Generate JWT
const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' }) // the token payload is 1st param which is user id

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // check if user exists by email
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  // hash password so if 2 users have the same passwords the hashedPassword wont be the same
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  const hashedPassword = await bcrypt.hash(password, 10)

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const userExists = await User.findOne({ email })

  if (!userExists) {
    res.status(400)
    throw new Error("User Doesn't exists")
  }

  const correctPassword = await bcrypt.compare(password, userExists.password) // returns true if same

  if (userExists && correctPassword) {
    res.json({
      _id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credential')
  }
})

const getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id) // we've set req.user in authMiddleware
  // res.status(200).json({ id: _id, name, email })
  res.status(200).json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
