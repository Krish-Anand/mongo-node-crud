const express = require('express');
const Posts = require('../models/postModel');
const router = express.Router();

// Get all the list which belongs to post collection
router.get('/list', async (req, res) => {
   try {
       const posts = await Posts.find();
       res.send(posts);
   } catch (err) {
       res.json({message: err});
   }
})

// Add the post as new to post collection
router.post('/add_Details', async (req, res) => {
    const post = new Posts({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const posts = await post.save();
        res.send(posts);
    } catch(err) {
        res.json({message: err});
    }
})

// Get actually what you need as specific post
router.get('/:postId', async (req, res) => {
    try {
        const posts = await Posts.findById({_id: req.params.postId})
        res.send(posts)
    } catch(err) {
        res.json({message: err})
    }
})

// Delete the exact post
router.delete('/:postId', async (req, res) => {
    try {
        const posts = await Posts.deleteOne({_id: req.params.postId})
        res.send(posts)
    } catch(err) {
        res.json({message: err})
    }
})

// Updating the post using ID
router.patch('/:postId', async (req, res) => {
    try {
        const Updatedposts = await Posts.updateOne({_id: req.params.postId}, { $set: {title: req.body.title}})
        res.send(Updatedposts)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router;