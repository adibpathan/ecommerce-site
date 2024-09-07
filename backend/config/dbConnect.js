const mongoose = require("mongoose")

//connect to mongodb successfully

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        if(conn){
            console.log('connect to mongodb successfully')
        }else{
            console.log('not connected')
        } 
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect;