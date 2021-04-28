const mongoose = require('mongoose')

const PostsSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: String,
    tags: [String],
    selectedFile: {
        data: Buffer,
        contentType: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("post", PostsSchema)