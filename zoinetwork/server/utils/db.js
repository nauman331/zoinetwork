const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected successfully")
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
        process.exit(0)
    }
}
module.exports = connectDB;