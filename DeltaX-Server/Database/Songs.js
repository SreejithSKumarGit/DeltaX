const mongoose=require("mongoose");
const Artists = require("./Artists");



const songSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date_of_release:{
        type:String,
        require:true
    },
    image:{
        type:String,
        required:true
    },
    song_rating:{
        type:Number,
        required:true
    },
    artists:[String]
})

const Songs=mongoose.model("Song",songSchema);

module.exports=Songs;