const Brand = require("../models/brand.model")

const createBrand = async(req, res, next)=>{
    try {
        const newBrand = await Brand.create(req.body)
        res.json(newBrand)
    } catch (error) {
        next(error)
    }
}

const updateBrand = async(req, res, next)=>{
    try {
        const updateBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updateBrand)
    } catch (error) {
        next(error)
    }
}

const deleteBrand = async(req, res, next)=>{
    try {
        const deleteBrand = await Brand.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Brand deleted successfully",
            deleteBrand
        })
    } catch (error) {
        next(error)
    }
}

const getBrand = async(req, res, next)=>{
    try {
        const getBrand = await Brand.findById(req.params.id)
        res.json(getBrand)
    } catch (error) {
        next(error)
    }
}

const getAllBrand = async(req, res, next)=>{
    try {
        const getallBrand = await Brand.find()
        res.json(getallBrand)
    } catch (error) {
        next(error)
    }
}

module.exports = {createBrand, updateBrand, deleteBrand, getBrand, getAllBrand}