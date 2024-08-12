const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/auth.route')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/product.route")

dotenv.config()
dbConnect()

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(cookieParser())

// middleware 
app.use("/api/user", authRouter)
app.use("/api/product", productRouter)


app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res)=>{
    res.send('hello adib')
})

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})

