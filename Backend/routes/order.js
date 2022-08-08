const express = require('express')

//controllers

const { getOrders, createOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/order')

// // Includes other resource routers
// const  kanban = require('./kanban')
// // Re-Routes into other resource routers 
// router.use('/:kanbanId/requests', kanban)

const router = express.Router({mergeParams: true})




router.route('/').get(getOrders).post( createOrder)
router
  .route('/:id')
  .get(getOrder)
  .put( updateOrder)
  .delete( deleteOrder)

module.exports = router
