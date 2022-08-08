const mongoose = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
    slug: String,
    image: {
      type: String,
      required: [true, 'Vous devez charger un logo ou une photo de profil'],
      default: 'public\\upload\\no-photo',
    },
    designation: {
      type: String,
      required: [true, "Merci d'entrer un nom de produit"],
      trim: true,
      maxlength: [50, 'Le nom doit contenir au maximum 50 caractères'],
    },
    refference: {
      type: String,
      required: [true, "Merci d'entrer une refference"],
      unique: true,
      trim: true,
      maxlength: [10, 'La refference doit contenir au maximum 10 caractères'],
    },
    
     orderDayAverage: Number,
    
    rupture: Boolean,

    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

// Create  order slug from the order number
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.refference, { lower: true })
  next()
})
// Create boolean rupture stock
ProductSchema.pre('save', function (next) {
  if (this.stock === 0) {
    this.rupture = true
  } else {
    this.rupture = false
  }
  next()
})

module.exports = mongoose.model('Product', ProductSchema)
