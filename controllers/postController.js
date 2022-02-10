const Posts = require('../models/postModel');

const postList = async(req, res) => {
    try {
        const finalPostResults = await Posts.find().populate('products').then((postList) => {
            const postMapResults = postList.map((postValues) => {
                if (postValues.productTitle === 'Schools') return {...postValues.toObject(), titleCheck: true }
                else return {...postValues.toObject(), titleCheck: false }
            })
            return postMapResults;
        })
        res.send({ PostResults: finalPostResults, Status: 200, message: 'Successfully Listed' });

    } catch (err) {
        res.json({ message: 'Couldn`t Connect the Post List' });
    }
}

const postAdd = async(req, res) => {

    const productExits = await Posts.findOne({ productTitle: req.body.productTitle })
    if (productExits) return res.status(400).send('Product Already Exits')

    const post = new Posts({
        productTitle: req.body.productTitle,
        description: req.body.description
    })
    try {
        const posts = await post.save();
        res.send(posts);
    } catch (err) {
        res.json({ message: err });
    }
}

const onePostDetails = async(req, res) => {
    try {
        const posts = await Posts.findById({ _id: req.params.postId })
        res.send(posts)
    } catch (err) {
        res.json({ message: err })
    }
}

const postDelete = async(req, res) => {
    try {
        const posts = await Posts.deleteOne({ _id: req.params.postId })
        res.send(posts)
    } catch (err) {
        res.json({ message: err })
    }
}

const postUpdate = async(req, res) => {
    try {
        const Updatedposts = await Posts.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } })
        res.send(Updatedposts)
    } catch (err) {
        res.json({ message: err })
    }
}

module.exports = { postList, postAdd, onePostDetails, postDelete, postUpdate }