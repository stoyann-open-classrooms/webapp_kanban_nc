const mongoose = require('mongoose')
const slugify = require('slugify')
const KanbanSchema = new mongoose.Schema(
  {
    slug: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    requests: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Requests',
      },
    uid_nfc: {
      type: String,
      required: ['true', 'Vous devez ajouter un nom pour le shop'],
      unique: true,
      trim: true,
      maxlength: [
        10,
        "L'identifiant d'un kanban ne peut contenir plus de de 10 caractères",
      ],
    },


    quantity: {
      type: Number,
    },
   
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// create Shop slug from the shop name
KanbanSchema.pre('save', function (next) {
  this.slug = slugify(this.uid_nfc, { lower: true })
  next()
})


module.exports = mongoose.model('Kanban', KanbanSchema)
