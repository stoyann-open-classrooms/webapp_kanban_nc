const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv').config()



// Load models
const Kanban = require('./models/Kanban')
const Product = require('./models/Product')
const Request = require('./models/Request')
const Order = require('./models/Order')


// connect DB
mongoose.connect("mongodb+srv://superAdmin:DDlbBff9Kj5U9Jt1@krystoclusterv1.thnbs.mongodb.net/kanban_API_v1?retryWrites=true&w=majority")

//Read JSON files
const kanbans = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/kanbans.json`, 'utf-8'),
)
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8'),
)
const requests = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/requests.json`, 'utf-8'),
)
const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/orders.json`, 'utf-8'),
)


//import into DB
const importData = async () => {
  try {
    
    await Kanban.create(kanbans)
     await Request.create(requests)
    await Product.create(products)
  await Order.create(orders)
    console.log('Data imported...'.green.bgCyan)
    process.exit()
} catch (error) {
    console.log(error)
}
}


// Delete data 
const deleteData = async () => {
    try {
        await Kanban.deleteMany()
        await Product.deleteMany()
        await Request.deleteMany()
        await Order.deleteMany()
       
      console.log('Data Destroyed...'.red.bgWhite)
      process.exit()
    } catch (error) {
      console.log(error)
    }
  }
  

//  create commande for import an destroyed data 

  if(process.argv[2] === '-i' ) {
    importData()

  }else if(process.argv[2] === '-d') {
    deleteData()
  }