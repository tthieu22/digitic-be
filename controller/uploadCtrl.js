const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");
const uploadImages = asyncHandler(async (req, res, next) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.json(images);
    next();
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = { uploadImages, deleteImages };
