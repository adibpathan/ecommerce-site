const { generateToken } = require("../config/jwtToken");
const User = require("../models/user.model");

const createUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      // create a new user
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      throw new Error("User Already Exists");
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      res.json({
        _id: findUser._id,
        firstname: findUser.firstname,
        lastname: findUser.lastname,
        email: findUser.email,
        mobile: findUser.mobile,
        token: generateToken(findUser._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

//get all users

const getAllUsers = async (req, res, next) => {
  try {
    const getallUser = await User.find();
    res.json({ length: getallUser.length, getallUser });
  } catch (error) {
    next(error);
  }
};

// get a single user
const getUser = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.json(getUser);
  } catch (error) {
    next(error);
  }
};

//delete a user

const deleteUser = async (req, res, next) => {
  try {
    const deleteuser = await User.findByIdAndDelete(req.params.id);
    res.json({
      deleteuser,
      msg: "user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// update a user
const updateUser = async (req, res, next) => {
  try {
    const updateuser = await User.findByIdAndUpdate(req.params.id, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile
    }, {new: true});
    res.json({ updateuser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};
