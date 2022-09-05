const express=require("express");
const { fetchallArtists, addArtist,fetchTop } = require("../Handlers/ArtistsHandler");

const ArtistsRouter=express.Router();

ArtistsRouter.get("/getArtists",fetchTop);
ArtistsRouter.get("/getAllArtists",fetchallArtists);
ArtistsRouter.post("/addArtists",addArtist);

module.exports=ArtistsRouter;