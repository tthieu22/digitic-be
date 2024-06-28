const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWish, rating, uploadImages } = require("../controller/productCtrl");
const { isAdmin, authmiddleware } = require("../middlewares/authmiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.get("/:id", getaProduct)
router.put("/upload/:id", authmiddleware, isAdmin, uploadPhoto.array('image', 10), uploadImages, productImgResize)
router.put("/wishlist/:id", authmiddleware, addToWish)
router.put("/ratings/:id", authmiddleware, rating)

router.put("/:id", authmiddleware, isAdmin, updateProduct)
router.get("/", getAllProduct)
router.post("/", authmiddleware, isAdmin, createProduct)
router.delete("/:id", authmiddleware, isAdmin, deleteProduct)
module.exports = router