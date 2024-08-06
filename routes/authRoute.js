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
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  updateOrderStatus,
  getAllOrder,
} = require("../controller/userCtrl");
const { authmiddleware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminCtrl);
router.post("/cart", authmiddleware, userCart);
router.post("/forgot-password-token", forgotPasswordToken);

router.post("/cart/applycoupon", authmiddleware, applyCoupon);
router.post("/cart/cash-order", authmiddleware, createOrder);
router.get("/cart", authmiddleware, getUserCart);
router.put("/reset-password/:token", resetPassword);

router.get("/wish-list", authmiddleware, getWishList);
router.get("/all-users", getallUser);
router.get("/order/get-order", authmiddleware, getOrder);
router.get("/order/get-all-order", authmiddleware, isAdmin, getAllOrder);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authmiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authmiddleware, emptyCart);
router.delete("/:id", deleteaUser);
router.put("/password", authmiddleware, updatePassword);
router.put("/edit-user", authmiddleware, updateaUser);
router.put("/save-address", authmiddleware, saveAddress);
router.put("/block-user/:id", authmiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authmiddleware, isAdmin, unblockUser);
router.put(
  "/order/update-order/:id",
  authmiddleware,
  isAdmin,
  updateOrderStatus
);
router.put("/reset-password/:token", resetPassword);
module.exports = router;
