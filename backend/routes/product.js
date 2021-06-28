const express = require('express')

const router =  express.Router();

const { getProducts, newProduct,getSingleProduct,updateProduct,deleteProduct} = require('../controllers/productController')

// get all products
router.route('/products').get(getProducts);
// get single product
router.route('/product/:id').get(getSingleProduct);

// create product
router.route('/admin/product/new').post(newProduct);

// update single product
router.route('/admin/product/:id').put(updateProduct);

// delete single product
router.route('/admin/product/:id').delete(deleteProduct);

module.exports = router;