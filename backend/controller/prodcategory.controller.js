const PCategory = require("../models/prodcategory.model")

const createCategory = async(req, res, next)=>{
    try {
        const newCategory = await PCategory.create(req.body)
        res.json(newCategory)
    } catch (error) {
        next(error)
    }
}

const updateCategory = async(req, res, next)=>{
    try {
        const updateCategory = await PCategory.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updateCategory)
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async(req, res, next)=>{
    try {
        const deleteCategory = await PCategory.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "category deleted successfully",
            deleteCategory
        })
    } catch (error) {
        next(error)
    }
}

const getCategory = async(req, res, next)=>{
    try {
        const getCategory = await PCategory.findById(req.params.id)
        res.json(getCategory)
    } catch (error) {
        next(error)
    }
}

const getAllCategory = async(req, res, next)=>{
    try {
        const getallCategory = await PCategory.find()
        res.json(getallCategory)
    } catch (error) {
        next(error)
    }
}
module.exports = {createCategory, updateCategory, deleteCategory, getCategory, getAllCategory}