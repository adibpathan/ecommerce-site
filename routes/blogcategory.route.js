const express = require("express")
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../controller/blogcategory.controller");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router()

router.post("/create", authMiddleware, isAdmin, createCategory)
router.put("/:id", authMiddleware, isAdmin, updateCategory)
router.delete("/:id", authMiddleware, isAdmin, deleteCategory)
router.get("/:id", getCategory)
router.get("/", getAllCategory)

module.exports = router;