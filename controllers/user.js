const User = require('./../models/users')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('./../config')
const { use } = require('../routes/user')

exports.register = async (req, res, next) => {

    const { name,email,password } = req.body
    const user = await User.findOne({email})
    if(user)
        return res.status(403).json({error: {message: 'Email is already taken!'}})
    const newuser = new User({name,email,password})
    try{
        await newuser.save()
        const token = getValidToken(newuser)
        res.status(200).json({ token })
    } catch(error){
        error.status = 400
        next(error)
    }
}

exports.login = async (req, res, next) => {

    const { email,password } = req.body
    const user = await User.findOne({email})
    if(!user)
        return res.status(403).json({error: {message: 'Incorrect Email/Password.'}})
    
    if(password!=user.password)
        return res.status(403).json({error: {message: 'Incorrect Email/Password.'}})
    const token = getValidToken(user)
    res.status(200).json({token})
}

getValidToken = user => {
    return jwt.sign({
        id : user._id,
        email : user.email,
        name : user.name
    }, SECRET_KEY,{expiresIn:'1h'})
}
