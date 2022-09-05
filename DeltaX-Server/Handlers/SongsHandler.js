const Artists = require("../Database/Artists");
const Songs = require("../Database/Songs");

async function addSong(req,res,next)
{

    try {
        await Songs.create({
            title:req.body.title,
            date_of_release:req.body.date_of_release,
            image:req.body.image,
            artists:[],
            song_rating:req.body.song_rating
        })
        const song=await Songs.findOne({title:req.body.title})
        for(let i=0;i<req.body.artists.length;i++)
        {
            const artist=await Artists.findOne({name:req.body.artists[i]})
            if(!artist.songs.includes(song.title))
            {
                song.artists.push(artist.name)
                artist.songs.push(song.title)
                artist.save()
            }  
        }
        song.save()
        res.status(200).json({status:"ok",message:"Song added successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"Error",message:error});
    }
}
async function fetchSongs(req,res,next)
{
    try {
        const songs=await Songs.find().sort({song_rating:-1}).limit(10);
        res.status(200).json({status:"ok",songs:songs});
    } catch (error) {
        console.log(error);
        res.status(400).json({status:"error",message:error})   
    }
}
async function updateSongs(req,res,next)
{
    try {
        const songs=await Songs.findOne({title:req.body.title});
        songs.artists=[...songs.artists,...req.body.artists];
        songs.save();
        res.status(200).json({status:"ok",message:"Artists added successfully"})
    } catch (error) {
        
    }   
}

module.exports={fetchSongs,addSong,updateSongs};