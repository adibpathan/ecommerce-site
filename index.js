const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/auth.route')

dotenv.config()
dbConnect()

const port = process.env.PORT;

const app = express()

app.use(express.json())

// middleware 
app.use("/api/user", authRouter)

app.get('/', (req, res)=>{
    res.send('hello adib')
})

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})

