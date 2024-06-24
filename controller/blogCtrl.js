const Blog = require("../models/blogModel")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const { validateMongodbId } = require("../utils/validateMongodbId");


const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog)
    }
    catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updateBlog)
    }
    catch (error) {
        throw new Error(error)
    }
})
const getaBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const getaBlog = await Blog.findById(id).populate("likes").populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 }
            },
            { new: true })

        res.json(getaBlog)
    }
    catch (error) {
        throw new Error(error)
    }
})
const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const getAllBlog = await Blog.find();
        res.json(getAllBlog)
    }
    catch (error) {
        throw new Error(error)
    }
})
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id)
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog)
    }
    catch (error) {
        throw new Error(error)
    }
})

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId)
    //find the blog you want to be like
    const blog = await Blog.findById(blogId)
    //find the login user
    const loginUserId = req?.user?._id;
    console.log(loginUserId);
    //find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisLiked = blog?.dislikes?.find((userId => userId?.toString() === loginUserId?.toString()))
    if (alreadyDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        }, { new: true });
        res.json(blog)
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        }, { new: true });
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        }, { new: true });
        res.json(blog)
    }
})
//**dislike */
const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongodbId(blogId)
    //find the blog you want to be like
    const blog = await Blog.findById(blogId)
    //find the login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the blog
    const isDisliked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(userId => userId.toString() === loginUserId.toString())
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        }, { new: true });
        res.json(blog)
    }
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false
        }, { new: true });
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { dislikes: loginUserId },
            isDisliked: true
        }, { new: true });
        res.json(blog)
    }
})
module.exports = { createBlog, updateBlog, getaBlog, getAllBlog, deleteBlog, likeBlog, disLikeBlog }