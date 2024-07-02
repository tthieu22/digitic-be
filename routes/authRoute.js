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
  loginAdminCtrl,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
} = require("../controller/userCtrl");
const { authmiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminCtrl);
router.post("/cart", authmiddleware, userCart);
router.post("/forgot-password-token", forgotPasswordToken)

router.get("/cart", authmiddleware, getUserCart);
router.put("/reset-password/:token", resetPassword)

router.get("/wish-list", authmiddleware, getWishList);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authmiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/password", authmiddleware, updatePassword)
router.put("/edit-user", authmiddleware, updateaUser);
router.put("/save-address", authmiddleware, saveAddress)
router.put("/block-user/:id", authmiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authmiddleware, isAdmin, unblockUser);
router.put("/reset-password/:token", resetPassword)
module.exports = router;
