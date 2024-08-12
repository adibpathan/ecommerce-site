const Product = require("../models/product.model")
const slugify = require("slugify")

const createProduct = async(req, res, next)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
       const newProduct = await Product.create(req.body)
       res.json({newProduct}) 
    } catch (error) {
        next(error)
    }
}

//get all products
const getAllProduct = async(req, res, next)=>{
    try {
        const allProducts = await Product.find()
        res.json({productLength: allProducts.length, allProducts})
    } catch (error) {
        next(error)
    }
}

//get a single product by using its id
const getProduct = async(req, res, next)=>{
    try {
        const getproduct = await Product.findById(req.params.id)
        res.json({getproduct})
    } catch (error) {
        next(error)   
    }
}

//update a products 
const updateProduct = async(req, res, next)=>{
    try {

        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }

        const editProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})

        res.json({editProduct})
    } catch (error) {
        next(error)
    }
}

//delete a product
const deleteProduct = async(req, res, next)=>{
    try {
       const deleteproduct = await Product.findByIdAndDelete(req.params.id) 
       res.json({deleteproduct})
    } catch (error) {
        next(error)   
    }
}

module.exports = {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct}
