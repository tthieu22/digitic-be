const Category = require("../models/prodcategoryModel")
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require("../utils/validateMongodbId")

const createProdCategory = asyncHandler(async (req, res) => {
    try {
        const newProdCategory = await Category.create(req.body);
        res.json(newProdCategory)

    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createProdCategory }