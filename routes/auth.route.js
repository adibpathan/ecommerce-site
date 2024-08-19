const express = require('express')
const {createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword} = require("../controller/user.controller")
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/refresh", handleRefreshToken)
router.get("/logout", logout)

router.get("/all-users", getAllUsers)
router.post("/forgot-password-token", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)

router.put("/password", authMiddleware, updatePassword)

router.get("/:id", authMiddleware, isAdmin, getUser)
router.delete("/:id", deleteUser)

router.put("/:id", authMiddleware, updateUser)

router.put("/block-user/:id", authMiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser)




module.exports = router;