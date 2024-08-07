const User = require("../models/user.model")

const createUser = async (req, res, next)=>{
    try {
        const email = req.body.email;
        const findUser = await User.findOne({email})
        if(!findUser){
            // create a new user 
            const newUser = await User.create(req.body)
            res.json(newUser)
        }else{
            throw new Error("User Already Exists")
        }
    } catch (error) {
        next(error)
    }
}

const loginUser = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const findUser = await User.findOne({email})
        if(findUser && await (findUser.isPasswordMatched(password))){
            res.json(findUser)
        }else{
            throw new Error('Invalid Credentials')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {createUser, loginUser};