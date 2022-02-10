const express = require('express');
const router = express.Router();
const authentication = require('../helpers/tokenValidation');
const productController = require('../controllers/productController');


//listing the products 
router.get('/product', authentication, productController.productList)

//updating the products
router.patch('/product/:productID', authentication, productController.productUpdate)

//deleting the products
router.delete('/product/:productID', authentication, productController.productDelete)

// adding the products against to the posts
router.post('/product', authentication, productController.productAddwithPost)

module.exports = router;