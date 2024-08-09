const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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
  cart: {
    type: Array,
    default: []
  },
  address: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Address"
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Product"
  }]
}, {
  timestamps: true
});

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function(enterPassword){
  return await bcrypt.compare(enterPassword, this.password)
}

// create a model 
const User = mongoose.model('User', userSchema)

module.exports = User;
