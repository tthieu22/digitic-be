const express = require("express");
const { createProdCategory, updateProdCategory, deleteProdCategory } = require("../controller/prodcategoryCtrl");
const { authmiddleware, isAdmin } = require("../middlewares/authmiddleware");
const route = express.Router();

route.post("/", authmiddleware, isAdmin, createProdCategory)
route.put("/:id", authmiddleware, isAdmin, updateProdCategory)
route.delete("/:id", authmiddleware, isAdmin, deleteProdCategory)
route.get("/:id", updateProdCategory)
module.exports = route