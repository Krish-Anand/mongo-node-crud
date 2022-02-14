const ProductModal = require('../models/productModel');
const Posts = require('../models/postModel');

const productList = async(req, res) => {
    try {
        const listProducts = await ProductModal.find()
        res.send(listProducts);
    } catch (err) {
        res.send('Couldn`t connect the database');
    }
}

const productUpdate = async(req, res) => {
    try {
        const updatedProducts = await ProductModal.updateOne({ _id: req.params.productID }, { $set: { products: req.body.products } })
        res.send(updatedProducts);
    } catch (err) {
        res.send('Couldn`t connect the database');
    }
}

const productDelete = async(req, res) => {
    try {
        const deletedProducts = await ProductModal.deleteOne({ _id: req.params.productID })
        res.send(deletedProducts);
    } catch (err) {
        res.send('Couldn`t connect the database');
    }
}

const productAddwithPost = async(req, res) => {
    const productExists = await ProductModal.findOne({ products: req.body.products })
    if (productExists) return res.status(400).send('Product already exits with respective posts')

    const productTitleExists = await Posts.findOne({ productTitle: req.body.productTitle })
    if (!productTitleExists) return res.status(400).send('ProductTitle is dosn`t Exits')

    const productReference = new ProductModal();
    productReference.productTitle = req.body.productTitle,
        productReference.products = req.body.products

    try {
        const productFinalResults = await productReference.save().then(async() => {
            productTitleExists['products'].push(productReference)
            const endResults = await productTitleExists.save();
            return endResults;
        })
        res.send(productFinalResults);
    } catch (err) {
        res.send('Could`nt save the product details');
    }
}

module.exports = { productList, productUpdate, productDelete, productAddwithPost }