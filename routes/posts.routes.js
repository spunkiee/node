const express = require('express');
const { getAllPosts, getPost, createPost, updatePost, getPostCount } = require('../controllers/posts.controller')

const router = express.Router();

// wwwmpapp.com/api/v1/posts/all-posts
router.get('/all-posts', getAllPosts);

router.get('/post/:id', getPost);

router.post('/add-post', createPost);

// Whenever you perform a put request the updated value is not sent to you but in database it has been updated, it throws the out dated one
router.put('/update-post/:id', updatePost);

router.get("/posts-count", getPostCount)

module.exports = router;
