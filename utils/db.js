const mongoose=require('mongoose');
const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Connection Failed : ${error}`);
        process.exit();
        
    }
};
module.exports=connectDb;