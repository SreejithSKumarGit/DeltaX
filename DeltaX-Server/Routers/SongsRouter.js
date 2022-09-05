const express=require("express");
const { fetchSongs, addSong, updateSongs } = require("../Handlers/SongsHandler");

const SongsRouter=express.Router();

SongsRouter.get("/getSongs",fetchSongs);
SongsRouter.post("/addSongs",addSong);
SongsRouter.post("/updateSongs",updateSongs);

module.exports=SongsRouter;