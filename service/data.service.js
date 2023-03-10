const jwt = require('jsonwebtoken')
const db = require('./db')

const register = (username, password, email) => {
    console.log('Registration in dataservice')
    return db.users.findOne({ "username": username })
        .then(users => {
            if (users) {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'Username already exist'
                }
            }
            else {
                const newUser = new db.users({
                    username,
                    password,
                    email
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Successfully registered'
                }
            }
        })
        .catch(err => { console.log('Failed to register', err) })
}

const login = (username, password) => {
    return db.users.findOne({ username, password })
        .then(users => {
            if (users) {
                currentUser = users.username

                const token = jwt.sign({ currentUser: username }, 'superkey')
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Login successfull',
                    currentUser,
                    token
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'Invalid Credentials'
                }
            }
        })
}

const resetpassword = (username, password) => {
    return db.users.findOne({ username })
        .then(users => {
            if (users) {
                users.password = password
                users.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: 'Successfully updated password',
                }
            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'User does not exist'
                }
            }
        })
}

const getPerfumes = (category) => {
    if (category == 'all') {
        return db.perfumes.find()
            .then(perfumes => {
                if (perfumes) {

                    return {
                        statusCode: 200,
                        status: true,
                        perfumes
                    }
                }
                else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: 'No items available'
                    }
                }
            })
    }
    else if (category == 'men' || category == 'women' || category == 'unisex') {
        return db.perfumes.find({ category })
            .then(perfumes => {
                if (perfumes) {

                    return {
                        statusCode: 200,
                        status: true,
                        perfumes
                    }
                }
                else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: 'No items available'
                    }
                }
            })
    }
    else {
        return db.perfumes.find({ series: category })
            .then(perfumes => {
                if (perfumes) {

                    return {
                        statusCode: 200,
                        status: true,
                        perfumes
                    }
                }
                else {
                    return {
                        statusCode: 401,
                        status: false,
                        message: 'No items available'
                    }
                }
            })
    }
}

const addtoCart = (pid, pname, price,url,number, username,discount) => {
    return db.carts.findOne({ username, productid:pid })
        .then(carts => {
            if (carts) {
                carts.number += number
                carts.disprice=carts.price-carts.discount
                carts.totalprice+=(carts.disprice*number)
                carts.save()
            }
            else {
                const newCart = new db.carts({
                    productid: pid,
                    pname,
                    price,
                    totalprice:((price-discount)*number),
                    url,
                    username,
                    number,
                    discount,
                    disprice:(price-discount)
                })
                newCart.save();
            }
            
            return {
                statusCode: 200,
                status: true,
                message: `Product successfully added to the cart`
            }
        })
}

const getCart=(username)=>{
    return db.carts.find({ username })
    .then(carts => {
        if (carts) {
            return {
                statusCode: 200,
                status: true,
                carts,
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'No items available'
            }
        }
    })
}

const removeItem=(productid,username)=>{
    return db.carts.deleteOne({productid,username})
    .then(carts=>{
        if(carts){
            return {
                statusCode: 200,
                status: true,
                message: 'Successfully deleted the cart item'
            }
        }
        else {
            return {
                statusCode: 402,
                status: false,
                message: 'Incorrect details'
            }
        }
    })
}

const getPerfumedetail=(productid)=>{
    return db.perfumes.findOne({productid})
    .then(perfumes => {
        if (perfumes) {

            return {
                statusCode: 200,
                status: true,
                perfumes
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'No items available'
            }
        }
    })
}

const saveMessage=(name, email, phonenumber, message)=>{
    return db.contacts.insertMany({name, email, phonenumber, message})
    .then(contacts => {
        if (contacts) {
            return {
                statusCode: 200,
                status: true,
                message:"Thank you for your contact"
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'Something went wrong'
            }
        }
    })
}

const saveEmail=(email)=>{
    return db.emails.insertMany({email})
    .then(emails => {
        if (emails) {
            return {
                statusCode: 200,
                status: true,
                message:"Thank you for folloying us!"
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'Something went wrong'
            }
        }
    })
}

const getRandom=()=>{
    return db.perfumes.aggregate([{$sample:{size:3}}])
    .then(perfumes => {
        if (perfumes) {

            return {
                statusCode: 200,
                status: true,
                perfumes
            }
        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'No items available'
            }
        }
    })
}

module.exports = {
    register,
    login,
    resetpassword,
    getPerfumes,
    addtoCart,
    getCart,
    removeItem,
    getPerfumedetail,
    saveMessage,
    saveEmail,
    getRandom
}