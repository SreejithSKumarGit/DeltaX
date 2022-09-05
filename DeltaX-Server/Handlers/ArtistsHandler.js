const Artists = require("../Database/Artists");


async function fetchTop(req,res,next)
{
    try {
        const artists=await Artists.find().sort({artist_rating:-1}).limit(10);
        res.status(200).json({status:"ok",artists:artists})
    } catch (error) {
        res.status(400).json({status:"Error",message:error});
    }
}
async function fetchallArtists(req,res,next)
{
    try {
        const artists=await Artists.find();
        res.status(200).json({status:"ok",artists:artists})
    } catch (error) {
        res.status(400).json({status:"Error",message:error});
    }
}
async function addArtist(req,res,next)
{
    try {
        await Artists.create({
            name:req.body.name,
            dob:req.body.dob,
            bio:req.body.bio,
            songs:[],
            artist_rating:req.body.artist_rating
        })
        res.status(200).json({status:"ok",message:"Data added successfully"})
    } catch (error) {
        res.status(400).json({status:"Error",message:error})   
    }
}

module.exports={fetchallArtists,addArtist,fetchTop};