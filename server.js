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
// const mongoose = require('mongoose')
// const { dir } = require('console')
// mongoose.connect(process.env.DATABASE_URL, { 
//      })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to mongoose'))

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:Black10280821!cedarrocket@learningproject.lpw241q.mongodb.net/?retryWrites=true&w=majority&appName=LearningProject";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)