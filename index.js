const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')

dotenv.config()
dbConnect()

const port = process.env.PORT;

const app = express()

app.get('/', (req, res)=>{
    res.send('hello adib')
})

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})

