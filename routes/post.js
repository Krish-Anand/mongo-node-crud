const express = require('express');
const router = express.Router();
const authentication = require('../helpers/tokenValidation');
const postControllerReference = require('../controllers/postController');

// Get all the list which belongs to post collection
router.get('/list', authentication, postControllerReference.postList)

// Add the post as new to post collection
router.post('/list', authentication, postControllerReference.postAdd)

// Get actually what you need as specific post
router.get('/:postId', authentication, postControllerReference.onePostDetails)

// Delete the exact post
router.delete('/:postId', authentication, postControllerReference.postDelete)

// Updating the post using ID
router.patch('/:postId', authentication, postControllerReference.postUpdate)

module.exports = router;