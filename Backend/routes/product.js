const express = require('express')
const router = express.Router()

//controllers
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/product')


// // Includes other resource routers
const order = require('./order')
// Re-Routes into other resource routers 
router.use('/:productId/orders', order)

router.route('/').get(getProducts).post( createProduct)
router
  .route('/:id')
  .get(getProduct)
  .put( updateProduct)
  .delete( deleteProduct)

module.exports = router
