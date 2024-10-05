import mongoose from "mongoose";
let isConnected = false

export const connectToDB = async () =>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log("MongoDB is connected");
        return 
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"snapQuote",
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
    }
}