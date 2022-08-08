const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

const Product = require('../models/Product')

// @desription: Get all collect points
// @route: GET /api/v1/collect-points
// @access: public
exports.getProducts= asyncHandler(async (req, res, next) => {
  let query

  // copy req.query
  const reqQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit']
  //Loop over remove fields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param])

  // create a query string
  let queryStr = JSON.stringify(reqQuery)
  // create operators ($gt, $gte, ect .. )
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
  //Finding ressources
  query = Product.find(JSON.parse(queryStr)).populate({
    path: 'order',
    select: 'orderNumber quantity',
  })

  // Select Fields

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ')
    query = query.select(fields)
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 25
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Product.countDocuments()
  query = query.skip(startIndex).limit(limit)

  // Executing query
  const products = await query

  // Pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res
    .status(201)
    .json({
      success: 'true',
      count: products.length,
      pagination,
      data: products,
    })
})

// @desription: Get a single collect point
// @route: GET /api/v1/collect-points/:id
// @access: public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(
      new ErrorResponse(
        `Aucun produit trouvée avec l'id : ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(201).json({ success: 'true', data: product })
})

// @desription: Create a new collect point
// @route: POST /api/v1/collect-points/:id
// @access: pivate
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body)
  res.status(201).json({ success: 'true', data: product })
})
// @desription: Update collect point
// @route: POST /api/v1/collect-points/:id
// @access: pivate
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: 'true', data: product })
})
// @desription: Delete collect point
// @route: DELETE /api/v1/collect-points/:id
// @access: pivate
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const  product= await Product.findById(req.params.id)
  if (!product) {
    return next(
      new ErrorResponse(`Shop not found with id of ${req.params.id}`, 404),
    )
  }
  Product.remove()
  res.status(200).json({ success: 'true', data: {} })
})
