require('dotenv').config({path:"./.env"});
const express=require("express");
const cors=require("cors");
const connectDatabase = require('./Database');

const ArtistsRouter = require('./Routers/ArtistsRouter');
const SongsRouter = require('./Routers/SongsRouter');
const UsersRouter = require('./Routers/UsersRouter');

const app=express();
app.use(express.json());
app.use(cors());
const  PORT=process.env.PORT || 8080;
app.get("/",(req,res,next) =>{
    res.json("server start")
}) 

app.use(ArtistsRouter);
app.use(SongsRouter);
app.use(UsersRouter);


connectDatabase()
.then(()=>
{
    app.listen(PORT,()=>
    {
        console.log("Server connected to ", PORT);
    })
})


