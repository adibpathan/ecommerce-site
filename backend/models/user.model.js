const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  cart: {
    type: Array,
    default: []
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Address"
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  }],
  refreshToken: {
    type: String
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.isPasswordMatched = async function(enterPassword){
  return await bcrypt.compare(enterPassword, this.password)
}

userSchema.methods.createPasswordResetToken = async function(){
  const resetToken = crypto.randomBytes(32).toString("hex")
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
  this.passwordResetExpires = Date.now() + 10*60*1000; //10 minutes
  return resetToken;
}

// create a model 
const User = mongoose.model('User', userSchema)

module.exports = User;
