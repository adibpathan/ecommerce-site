const Blog = require("../models/blog.model")
const User = require("../models/user.model")

const createBlog = async(req, res, next)=>{
    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json({
            message: "Blogs created successfully",
            newBlog
        })
    } catch (error) {
        next(error)
        // throw new Error(error)
    }
}
const updateBlog = async(req, res, next)=>{
    try {
        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json({
            message: "Blogs updated successfully",
            updateBlog
        })
    } catch (error) {
        next(error)
        // throw new Error(error)
    }
}
const deleteBlog = async(req, res, next)=>{
    try {
        const deleteBlog = await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Blogs deleted successfully",
            deleteBlog
        })
    } catch (error) {
        next(error)
        // throw new Error(error)
    }
}

const getBlog = async(req, res, next)=>{
    try {
       const getBlog = await Blog.findById(req.params.id).populate("likes").populate("dislikes")
       const updateViews = await Blog.findByIdAndUpdate(req.params.id, {
        $inc: {numViews: 1}
       }, {new: true})

       res.json({getBlog})
    } catch (error) {
        next(error)
    }
}

const getAllBlogs = async(req, res, next)=>{
    try {
       const getBlogs = await Blog.find() 
       res.status(200).json({
        numOfBlogs: getBlogs.length,
        getBlogs
       })
    } catch (error) {
        next(error)
    }
}

const likeBlog = async(req, res, next)=>{
    try {
        const {blogId} = req.body;
        // console.log(blogId)

        const blog = await Blog.findById(blogId)
        // console.log(blog)

        // console.log(req.user._id)
        const loginUserId = req.user._id;
        const isLiked = blog.isLiked;

        const alreadyDisliked = blog.dislikes.find((userId)=>userId.toString() === loginUserId.toString())
        // console.log(alreadyDisliked)
        if(alreadyDisliked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: {dislikes: loginUserId},
                isDisliked: false
            }, {new: true})
            res.json(blog)
        }
        if(isLiked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: {likes: loginUserId},
                isLiked: false
            }, {new: true})
            res.json(blog)
        }else{
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: {likes: loginUserId},
                isLiked: true
            }, {new: true})
            res.json({blog})
        }
    } catch (error) {
        next(error)
    }
}

const disLikeBlog = async(req, res, next)=>{
    try {
        const {blogId} = req.body;

        const blog = await Blog.findById(blogId)
        const loginUserId = req.user._id;
        const isDisliked = blog.isDisliked;

        const alreadyLiked = blog.likes.find((userId)=>userId.toString() === loginUserId.toString())
        if(alreadyLiked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: {likes: loginUserId},
                isLiked: false
            }, {new: true})
            res.json(blog)
        }
        if(isDisliked){
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull: {dislikes: loginUserId},
                isDisliked: false
            }, {new: true})
            res.json(blog)
        }else{
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push: {dislikes: loginUserId},
                isDisliked: true
            }, {new: true})
            res.json({blog})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs, likeBlog, disLikeBlog}
