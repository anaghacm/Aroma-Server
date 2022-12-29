//Import Express
const express = require('express')

//Import data service
const dataService = require('./service/data.service')

//Import JWT Token
const jwt = require('jsonwebtoken')

//Import CORS
const cors = require('cors')

//Create an app using express
const app = express()

// Give command to share data via cors
app.use(cors({
    origin: ['http://localhost:4200']
}))

//To parse json data from request body
app.use(express.json())

//Create port number
app.listen(3000, () => {
    console.log('Server listening on the port : 3000')
})

//Application specific Middleware
const appMiddleware = (req, res, next) => {
    console.log('Application Specific Middleware')
    next();
}
app.use(appMiddleware)

//Router Specific Middleware
const jwtMiddleware = (req, res, next) => {
    try {
        console.log('Router Specific Middleware')
        const token = req.header('x-access-token')
        const data = jwt.verify(token, 'superkey')
        next();
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'Please login first'
        })
    }
}

//Resolving registration request - POST
app.post('/register', (req, res) => {
    console.log(req.body)
    dataService.register(req.body.username, req.body.password, req.body.email)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
        .catch(err => { console.log('error') })
})

//Resolving login request - POST
app.post('/login', (req, res) => {
    dataService.login(req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//Resolving reset password - POST
app.post('/resetpassword', (req, res) => {
    dataService.resetpassword(req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getPerfumes', (req, res) => {
    dataService.getPerfumes(req.body.category)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/addtoCart', (req, res) => {
    result = dataService.addtoCart(req.body.pid,req.body.pname,req.body.price,req.body.url,req.body.number, req.body.username, req.body.discount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getCart', (req, res) => {
    dataService.getCart(req.body.username)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.delete('/removeItem/:productid/:username', (req, res) => {
    result = dataService.removeItem(req.params.productid,req.params.username)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getPerfumedetail', (req, res) => {
    dataService.getPerfumedetail(req.body.productid)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/saveMessage', (req, res) => {
    result = dataService.saveMessage(req.body.name,req.body.email,req.body.phonenumber,req.body.message)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/saveEmail', (req, res) => {
    result = dataService.saveEmail(req.body.email)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getRandom', (req, res) => {
    dataService.getRandom()
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})