const Product = require('../models/product')

// errorHandler
const ErrorHandler = require('../utils/errorHandler')

const catchAsyncError = require('../middlewares/catchAsyncError')

const APIFeatures = require('../utils/apiFeatures')

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body)

  res.status(200).json({
    success: true,
    product,
  })
})

// get all products => api/v1/products?keyword=vegetable
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query).search()

  const products = await apiFeatures.query
  res.status(200).json({
    success: true,
    products,
    count: products.length,
  })
})
// get single product => api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }
  res.status(200).json({
    success: true,
    product,
  })
})
// update product =>   /api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product,
  })
})

// Delete Product  => api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }
  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product is deleted',
  })
})
