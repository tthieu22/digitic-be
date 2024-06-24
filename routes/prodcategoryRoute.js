const express = require("express");
const { createProdCategory } = require("../controller/prodcategoryCtrl");
const { authmiddleware, isAdmin } = require("../middlewares/authmiddleware");
const route = express.Router();

route.post("/", authmiddleware, isAdmin, createProdCategory)
module.exports = route