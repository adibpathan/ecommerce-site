const Coupon = require("../models/coupon.model")

const createCoupon = async(req, res, next)=>{
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        next(error)
    }
}

module.exports = {createCoupon}