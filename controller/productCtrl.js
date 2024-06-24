const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newproduct = await Product.create(req.body);
        res.json(newproduct)
    }
    catch (error) {
        throw new Error(error)
    }
})

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {




        const findProdcut = await Product.findById(id);
        res.json(findProdcut)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async (req, res) => {
    console.log(req.query)
    try {
        // Filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"]
        queryobj2 = excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        // console.log(queryObj)
        let query = Product.find(JSON.parse(queryStr))

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(" ");
            query = query.sort(sortBy);
        }
        else {
            query = query.sort('-createAt')

        }

        // limiting the feilds 
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(" ")
            query = query.select(fields)

        } else {
            query = query.select("-__v");
        }
        //pagination 
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        console.log(page, limit, skip);
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) throw new Error("This Page doesn't exists ")
        }

        const prodcut = await query;

        // console.log(queryObj, req.query)
        // const getallProduct = await Product.find(queryObj)
        // const getallProduct = await Product.find({
        //     brand: req.query.brand,
        //     category: req.query.category
        // });
        // const getallProduct = await Product.where("category").equals(req.query.category);
        res.json(prodcut)
    }
    catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true, });
        res.json(updateProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct)
    }
    catch (error) {
        throw new Error(error)
    }
})
module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct }