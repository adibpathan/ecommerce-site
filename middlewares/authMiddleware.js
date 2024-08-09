const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new Error("there is no token attached to header");
  }
};

// check if the user is admin or not

const isAdmin = async (req, res, next) => {
  try {
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== 'admin'){
        throw new Error('you are not an admin')
    }
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware, isAdmin };
