const express = require('express')
const {createUser, loginUser, getAllUsers, getUser, deleteUser} = require("../controller/user.controller")
const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/all-users", getAllUsers)
router.get("/:id", getUser)
router.delete("/:id", deleteUser)

module.exports = router;