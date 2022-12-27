//Server-mongodb connection

//Import mongoose
const mongoose = require('mongoose')

//State connection string via mongoose
mongoose.connect('mongodb://127.0.0.1:27017/aromaServer?directConnection=true', {
    useNewUrlParser: true
})
    .then(() => { console.log('MongoDB connected!') })
    .catch(err => { console.log('Failed to connect MongoDB', err) })

//Define aroma db model
const users = mongoose.model('users', {
    //schema creation
    username: String,
    password: String,
    email: String
})
const perfumes = mongoose.model('perfumes', {
    //schema creation
    productid: Number,
    name: String,
    price: Number,
    fragrance: String,
    topnote: String,
    basenote: String,
    description: String,
    category: String,
    series: String,
    url: String,
    url1: String
})
const carts = mongoose.model('carts', {
    //schema creation
    productid: Number,
    pname: String,
    price: Number,
    totalprice:Number,
    url:String,
    username: String,
    number: Number
})
module.exports = {
    users,
    perfumes,
    carts
}