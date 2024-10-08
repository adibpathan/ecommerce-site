const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConnect')
const authRouter = require('./routes/auth.route')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/product.route")
const blogRotuer = require("./routes/blog.route")
const categoryRouter = require("./routes/prodcategory.route")
const blogcategoryRouter = require("./routes/blogcategory.route")
const brandRouter = require("./routes/brand.route")
const couponRouter = require("./routes/coupon.route")
const morgan = require("morgan")

dotenv.config()
dbConnect()

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

// middleware 
app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
app.use("/api/blog", blogRotuer)
app.use("/api/category", categoryRouter)
app.use("/api/blogcategory", blogcategoryRouter)
app.use("/api/brand", brandRouter)
app.use("/api/coupon", couponRouter)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res)=>{
    res.send('hello adib')
})

app.listen(port, ()=>{
    console.log(`server is listening on http://localhost:${port}`)
})

