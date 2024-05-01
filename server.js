if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Express / ejs packages
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Connect routers to server
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

// Setting express settings
var path = require('path')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname + 'public')))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)


// Connect to MongoDB
const mongoose = require('mongoose')
const { dir } = require('console')
mongoose.connect(process.env.DATABASE_URL, { 
     })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)