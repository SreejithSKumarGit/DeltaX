const express=require("express");
const { register, login} = require("../Handlers/UsersHandler");


const UsersRouter=express.Router();

UsersRouter.post("/register",register);
UsersRouter.post("/login",login);



module.exports=UsersRouter;