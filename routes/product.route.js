const express = require("express")
const {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct} = require("../controller/product.controller")

const router = express.Router()

router.post("/create", createProduct)
router.get("/all-product", getAllProduct)
router.get("/:id", getProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router;