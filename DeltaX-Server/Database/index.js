const mongoose=require("mongoose");
require('dotenv').config({path:"../.env"});


async function connectDatabase()
{
    const mongodb_URI=process.env.mongodb_URI;
    try {
        await mongoose.connect(mongodb_URI);
        console.log("Database connected successfully");

    } catch (error) {
        console.log("Something went wrong",error);
    }
}
module.exports=connectDatabase;