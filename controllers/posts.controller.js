const Posts = require('../models/posts.model');
const Comments = require('../models/comments.model');

// expoerts for exporting multiple from this file
exports.getAllPosts = (__, res) => {
    // Posts.find({}).populate("comments")
    // Posts.find({}).populate("commets", { message: 1})
    Posts.find({}).exec((err, posts) => {
        if(err) return status(404).json({ status: 'failed', message: 'fetching posts failed from db' });

        return res.json(posts);
    });
};

exports.getPost = (req, res) => {
    Posts.findOne({ _id: req.params.id }).exec((err, post) => {
        if(err) return status(404).json({ status: 'failed', message: 'fetching post failed from db' });

        return res.json(post);
    });
}

exports.createPost = (req, res) => {
    const Post = new Posts();
    const CommentScema = new Comments();

    const { title, desc, likes, comment, author, category, url } = req.body;
    const { user, message } = comment;

    Post.title = title;
    Post.desc = desc;
    Post.likes = likes,
    Post.author = author;
    Post.category = category;
    Post.url = url;

    CommentScema.user = user;
    CommentScema.message = message;

    CommentScema.save((err, result) => {
        if(err) return status(404).json({ status: 'failed', message: 'failed to create comment' });

        Post.comments = [result._id];
        
        Post.save((err, post) => {                      
            if(err) return status(404).json({ status: 'failed', message: 'failed to create post' });

            return res.json(post);
        });
    });

    // Posts.create(req.body).exec((err, post) => {                      // not used this approach
    //     if(err) return status(404).json({ status: 'failed', message: 'failed to create post' });

    //     return res.json(post);
    // });
}

// We dont have to use exac method here, this is the best part about findByIdAndUpdate, so we can use callback directly in the findByIdAndUpdate itself but still we uses exec because we dont want to make it complicated and also findByIdAndUpdate is not use a lot it is replaced by updateOne
// $set: { title: req.body.title }
// in update it is safer to go with this $set: { ...req.body } if some thing paas in the body that doesn't require in Scema body that this will skip that, this wont add that to the database
// {upsert: true} create the post if doesn't exist 
// {new:true} we get the updated value

// updateOne is very fast but it does not retrieve the data. If we want to retrieve the data also on updating then we use findByIdAndUpdate
exports.updatePost = (req, res) => {
    Posts.updateOne({ _id: req.params.id }, { $set: { title: req.body.title }}, {upsert: true, new:true} ).exec((err, post) => {
        if(err) return status(404).json({ status: 'failed', message: 'Failed to update post' });

        return res.json(post);
    });
};

// exports.updatePost = (req, res) => {
//     const { title } = req.body;
//     Posts.findByIdAndUpdate({ _id: req.params.id }, { title }).exec((err, post) => {
//         if(err) return status(404).json({ status: 'failed', message: 'Failed to update post' });

//         return res.json(post);
//     });
// };

exports.getPostCount = (req, res) => {
    Posts.aggregate([ { $group : { _id : "$author", no_of_posts : { $sum: 1 }}}]).exec((err, result) => {
        if(err) return status(404).json({ status: 'failed', message: 'Failed to update post' });

        return res.json(result);
    });
}