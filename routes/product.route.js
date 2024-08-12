const express = require("express")
const {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct} = require("../controller/product.controller")
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/create", authMiddleware, isAdmin, createProduct)
router.get("/all-product", getAllProduct)
router.get("/:id", getProduct)
router.put("/:id", authMiddleware, isAdmin, updateProduct)
router.delete("/:id", authMiddleware, isAdmin, deleteProduct)

module.exports = router;