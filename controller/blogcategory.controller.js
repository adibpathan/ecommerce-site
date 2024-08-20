const BCategory = require("../models/blogcategory.model")

const createCategory = async(req, res, next)=>{
    try {
        const newCategory = await BCategory.create(req.body)
        res.json(newCategory)
    } catch (error) {
        next(error)
    }
}

const updateCategory = async(req, res, next)=>{
    try {
        const updateCategory = await BCategory.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updateCategory)
    } catch (error) {
        next(error)
    }
}

const deleteCategory = async(req, res, next)=>{
    try {
        const deleteCategory = await BCategory.findByIdAndDelete(req.params.id)
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
        const getCategory = await BCategory.findById(req.params.id)
        res.json(getCategory)
    } catch (error) {
        next(error)
    }
}

const getAllCategory = async(req, res, next)=>{
    try {
        const getallCategory = await BCategory.find()
        res.json(getallCategory)
    } catch (error) {
        next(error)
    }
}

module.exports = {createCategory, updateCategory, deleteCategory, getCategory, getAllCategory}