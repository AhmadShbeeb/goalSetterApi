const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) // to get the payload data

      // get user from token(which has the user id)
      req.user = await User.findById(decoded.id).select('-password') // don't return password
      next()
    } catch (error) {
      console.log(error)
      res.status(401) // not authorized
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, not token')
  }
})

module.exports = { protect }
