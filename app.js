const express = require('express')

const mongoose = require('mongoose')

const app = express()

const { MONGODB } = require('./config')
const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')
const bodyParser = require('body-parser')
const auth = require('./middleware/auth')

app.use(bodyParser.json())

app.use('/api/todo', auth, todoRoutes)

app.use('/api/users', userRoutes)

app.use((req, res, next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    const status = err.status || 500
    res.status(status).json({error: {message: err.message}})
})


mongoose.connect(MONGODB,{useNewUrlParser:true})
    .then(() => {
        console.log('connected');
        return app.listen(3500)
    })
    .then(() => console.log('server running'))
    .catch(err => console.log('error'))

// app.listen(3300,() => console.log('started'))