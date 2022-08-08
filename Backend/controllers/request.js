const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Request = require('../models/Request')



// @desription: Get Requests
// @route: GET /api/v1/requests
// @route: GET /api/v1/:kanbanId/requests
// @access: public
exports.getRequests = asyncHandler(async (req, res, next) => {
    let query
  
    if (req.params.kanbanId) {
      query = Request.find({ kanban: req.params.kanbanId })
    } else {
      query = Request.find().populate({
        path: 'kanban',
        select: 'uid_nfc',
      })
    }
  
    const requests = await query
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    })
  })






  exports.getRequests= asyncHandler(async (req, res, next) => {
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
    query = Request.find(JSON.parse(queryStr)).populate({
      path: 'kanban',
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
    const total = await Request.countDocuments()
    query = query.skip(startIndex).limit(limit)
  
    // Executing query
    const requests = await query
  
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
        count: Request.length,
        pagination,
        data: requests,
      })
  })

// @desription: Get a single request
// @route: GET /api/v1/requests/:id
// @access: public
exports.getRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id)

  if (!request) {
    return next(
      new ErrorResponse(
        ` ❌ Request not found with id of ${req.params.id}`,
        404,
      ),
    )
  }
  res.status(201).json({ success: 'true', data: request })
})

// @desription: Create a new request
// @route: POST /api/v1/requests:id
// @access: public
exports.createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create(req.body)
  res.status(201).json({ success: 'true', data: request })
})
// @desription: Update Request
// @route: POST /api/v1/requests/:id
// @access: pivate
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!request) {
    return next(
      new ErrorResponse(
        `❌ Request not found with id of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({ success: 'true', data: kanban })
})
// @desription: Delete request
// @route: DELETE /api/v1/requests/:id
// @access: pivate
exports.deleteRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.params.id)
  if (!request) {
    return next(
      new ErrorResponse(
        `❌ Request not found with id of ${req.params.id}`,
        404,
      ),
    )
  }
  Request.remove()
  res.status(200).json({ success: 'true', data: {} })
})
