const { generateToken } = require("../config/jwtToken");
const User = require("../models/user.model");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken")

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
      const refreshToken = await generateRefreshToken(findUser._id);
      const updateuser = await User.findByIdAndUpdate(
        findUser._id,
        { refreshToken: refreshToken },
        { new: true }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      })

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

//handle refreshToken 
const handleRefreshToken = async(req, res, next)=>{
  try {
    const cookie = req.cookies;
    if(!cookie.refreshToken){
      throw new Error('No Refresh Token')
    }
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({refreshToken})
    // console.log(typeof(user._id))

    if(!user) throw new Error('no refreshtoken present in db or not matched')

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded)=>{
      if(err || (user._id).toString() !== decoded.id){
        throw new Error(`there is somethign wrong in refreshtoken`)
      }else{
        const accessToken = generateRefreshToken(user._id)
        res.json({
          accessToken
        })
      }
    })
  } catch (error) {
    next(error)
  }
}

//logout functionality
const logout = async(req, res, next)=>{
  try {
    const cookie = req.cookies;
    if(!cookie.refreshToken) {
      throw new Error('No Refresh Token')
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken})
    if(!user){
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
      return res.sendStatus(204)  //forbidden
    }

    await User.findOneAndUpdate({refreshToken}, {
      refreshToken: ""
    }, {new: true})

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })

    res.sendStatus(204)  //forbidden

  } catch (error) {
    next(error)
  }
}


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
    // const {_id} = req.user
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
      },
      { new: true }
    );
    res.json({ updateuser });
  } catch (error) {
    next(error);
  }
};

// block a user
const blockUser = async (req, res, next) => {
  try {
    const block = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      block,
      msg: "User blocked",
    });
  } catch (error) {
    next(error);
  }
};

// unblock a user
const unblockUser = async (req, res, next) => {
  try {
    const unblock = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      unblock,
      msg: "User unblocked",
    });
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
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout
};
