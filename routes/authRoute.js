const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controller/userCtrl");
const { authmiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUserCtrl);
router.post("/forgot-password-token", forgotPasswordToken)

router.put("/reset-password/:token", resetPassword)

router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authmiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/password", authmiddleware, updatePassword)
router.put("/edit-user", authmiddleware, updateaUser);
router.put("/block-user/:id", authmiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authmiddleware, isAdmin, unblockUser);
router.put("/reset-password/:token", resetPassword)
module.exports = router;
