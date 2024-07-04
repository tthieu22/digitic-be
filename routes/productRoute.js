const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWish, rating, uploadImages, deleteImages } = require("../controller/productCtrl");
const { isAdmin, authmiddleware } = require("../middlewares/authmiddleware");
const { uploadPhoto, productImgResize, } = require("../middlewares/uploadImages");
const router = express.Router();
router.get("/:id", getaProduct)
router.put("/upload/", authmiddleware, isAdmin, uploadPhoto.array('image', 10), uploadImages, productImgResize)

router.put("/wishlist/", authmiddleware, addToWish)
router.put("/ratings/", authmiddleware, rating)

router.put("/:id", authmiddleware, isAdmin, updateProduct)
router.get("/", getAllProduct)
router.post("/", authmiddleware, isAdmin, createProduct)
router.delete("/:id", authmiddleware, isAdmin, deleteProduct)
router.delete("/delete-img/:id", authmiddleware, isAdmin, deleteImages)
module.exports = router