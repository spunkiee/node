const { Schema, model } = require('mongoose')

const PostsSchema = new Schema({
    title: {
        type: String,
        // unique: true,           DeprecationWarning: collection.ensureIndex is deprecated
        required: [true, "Please provide title for the post"]
    },
    desc: {     
        type: String,
        required: true
    },
    category: {
        type: String,
        // Here how will you specify error message so we use object
        // enum: ["language", "api"], //value of categoryy from these values only 
        enum: {
            values: ["language", "api"],
            message: "Unacceptable option"
        },
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    // phone: {
    //     type: Number,
    //     required: true,
    //     validate: {
    //         validator: function (value) {
    //             return /\d{10/.test(value);
    //         },
    //         message: (props) => `${props.value} is not a valid phone number`
    //     }
    // },
    likes: {
        type: Number,
        min: [6, "Too few likes"],
        default: 0
    },
    date: {
        type: Date,
        default: Date()
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"             // refrencing to the comments collection
    }]
})

// single export 
module.exports = model("posts", PostsSchema);
// name of collection and connecting to post and following this postSchema
// If post collection doesn't exist inside database them model will create this collection for us