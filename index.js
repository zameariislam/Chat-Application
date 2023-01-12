
// external imports 
const express = require('express')



const app = express()


const path = require('path')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')

// internal imports 
const { errorHandler, notFoundHandler } = require('./middlewares/common/errorHandler')



const loginRouter = require('./router/loginRouter')
const usersRouter = require('./router/usersRouter')
// const inboxRouter = require('./router/inboxRouter')

const port = process.env.PORT || 5000

// Database connection 

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(res => console.log('Database Connected Sucessfully ....'))
    .catch(err => console.log(err))


// request parsers 
app.use(express.json())


app.use(express.urlencoded({ extended: true }))

// set view engine 
app.set('view engine', 'ejs')

// set static folder 
app.use(express.static(path.join(__dirname, 'public')))


// parse cookies 
app.use(cookieParser(process.env.COOKIE_SECRET))

// routing setup 

app.use('/',loginRouter)
app.use('/users', usersRouter)
// app.use('/inbox',inboxRouter)


//   404 not found handler 



app.use(notFoundHandler)
//  default error Handler 
app.use(errorHandler)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
