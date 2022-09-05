const mongoose=require("mongoose");
const Songs=require("./Songs");


const artistsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    bio:{
        type:String,

    },
    artist_rating:{
        type:Number,
        required:true
    },
    songs:[String]
})

const Artists=mongoose.model("artist",artistsSchema);

module.exports=Artists;