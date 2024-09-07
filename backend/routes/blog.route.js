const express = require("express")
const { createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs, likeBlog, disLikeBlog } = require("../controller/blog.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router()

router.post("/create", authMiddleware, isAdmin, createBlog)
router.put("/like", authMiddleware, likeBlog)
router.put("/dislike", authMiddleware, disLikeBlog)
router.put("/:id", authMiddleware, isAdmin, updateBlog)
router.delete("/:id", authMiddleware, isAdmin, deleteBlog)
router.get("/:id", getBlog)
router.get("/", getAllBlogs)


module.exports = router;