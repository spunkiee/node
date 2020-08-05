const { Schema, model } = require('mongoose')

const CommentsSchema = new Schema({
    user: {
        type: String,
        required: [true, "Please provide title for the post"]
    },
    message: {
        type: String,
        required: true
    }
})

// single export 
module.exports = model("comments", CommentsSchema);
// name of collection and connecting to post and following this postSchema
// If post collection doesn't exist inside database them model will create this collection for us