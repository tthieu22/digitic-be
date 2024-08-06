const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authmiddleware } = require("../middlewares/authmiddleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();
router.put(
  "/",
  authmiddleware,
  isAdmin,
  uploadPhoto.array("image", 10),
  uploadImages,
  productImgResize
);

router.delete("/delete-img/:id", authmiddleware, isAdmin, deleteImages);
module.exports = router;
