// ******IMPORTING LIBRAIRES*********
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const express= require("express");
const jwt= require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const util = require("util");
const router= express.Router();
const app=express();
dotenv.config(); //taking out variables of env file


// *******MIDDLEWARE INITIATES IN EVERY REQUEST*************
app.use(cookieParser()); // to parse cookies
app.use(express.json());

// ******IMPORTING VALUES FROM .ENV FILE***********
const password= process.env.DB_PASSWORD;
const userName= process.env.DB_USERNAME;
const SECRET_KEY = process.env.SECRET_KEY;

// *******MAKING CONNECTION WITH DB***********
const dbLink = `mongodb+srv://${userName}:${password}@algo-backend.c4rl4bd.mongodb.net/jio_clone?retryWrites=true&w=majority&appName=algo-backend`;
mongoose.connect(dbLink, {
    dbName: "jio_clone", // force MongoDB to use this DB
}).then(
    function (connection){
        console.log("connected to db");

    }
).catch(err => console.log(err));

// *******IMPORTING USER MODEL FROM ANOTHER FILE**********
const userModel = require("./model/userModel");

// *********AUTH ROUTER*************
const authRouter=require("./router/authRouter");
app.use("/api/auth", authRouter);
// **********USER ROUTER************
const userRouter = require("./router/userRouter");
app.use("/api/user", userRouter);
// *********MOVIE ROUTER***********
const movieRouter = require("./router/movieRouter");
app.use("/api", movieRouter); 

// *********SERVER SETUP**********
app.listen(3003,()=>{
    console.log("server started at port 3003");
})
