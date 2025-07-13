const express= require("express");
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const jwt= require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const util = require("util");
const userModel=require("../model/userModel")
dotenv.config();
// *******CONVERTING JWT METHODS INTO ASYNC/AWAIT**************
const promisify = util.promisify;
const promisedJWTsign= promisify(jwt.sign);
const promisedJWTverify= promisify(jwt.verify);

const loginHandler= async function(req,res){
    try{
        const {name, email, password, confirmPassword,role}=req.body;
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(409).json({
                "message":"invalid email or password",
                "status":"failure"
            })
        }
        const areEqual= password===user.password;
        if(!areEqual){
            return res.status(404).json({
                "message":"enter correct password",
                "status":"failure"
            })
        }
        const loginToken=await promisedJWTsign({id:user._id},process.env.SECRET_KEY);
        // console.log(loginToken);
        return res
        .cookie("jwtToken", loginToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        })
        .status(200)
        .json({
            message: "token was passed",
        });
    }catch(err){
        return res.status(500).json({
            "message":"some unkown error occured",
            "error":err.message
        })
    }
    
}
const signupHandler = async (req, res) => {
    try {
        const {name, email, password, confirmPassword,role} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Required data missing",
                status: "failure"
            });
        }
        
        const user = await userModel.findOne({email});
        if (user) {
            // step-2- check if email is already registerd
            return res.status(409).json({
                message: "User is already registered with this email",
                status: "failure"
            });
        }
        
        // step-3- create new user
        const newUser = await userModel.create({name, email, password, confirmPassword,role});
        return res.status(201).json({
            message: "User created successfully",
            newUser,
            status: "success"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unknown error occurred on server",
            "error": err.message
        });
    }
};
const logoutHandler = async (req,res) =>{
    res.clearCookie("jwtToken",{path:"/"})
    return res.status(200).json({
        message:"the cookie was cleared"
    })
}
const profileHandler= async function(req,res){
    const userId = req.id;
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        "message":"authorized person",
        "userID":userId,
        user:user
    })
}
const allMoviesHandler = async function(req,res){
    res.status(200).json({
        message:"list of all movies"
    })
}

// *******MIDDLEWARES*********
const protectedRouteMiddleware= async function (req,res,next){
    const jwtToken = req.cookies.jwtToken;
    if(!jwtToken){
        return res.status(403).json({
            "message":"unauthorized access must login before",
            status:"failure"
        });
    }
    const decryptedToken = await promisedJWTverify(jwtToken,process.env.SECRET_KEY);
    // the decryted token contains the id of the user 
    req.id=decryptedToken.id
    next();
}
const isAdminMiddleware = async function(req,res,next){
    try{
        const userID = req.id;
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
            }
            if((user.role !== "admin" && user.role !== "moderator")){
                return res.status(404).json({
                message:"Access denied! only valid for admin"
            })
        }
        next();
    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
}
const allMoviesMiddleware = async function(req,res,next){
    const userId = req.id;
    const user = await userModel.findById(userId);
    if(user.role!=="admin"&& user.role!=="moderator"&& user.role!=="feed curator"){
        return res.status(404).json({
            message:"not a valid role for accesing all movies"
        })
    }
    next();
}
module.exports={
    loginHandler,
    signupHandler,
    logoutHandler,
    profileHandler,
    allMoviesHandler,
    protectedRouteMiddleware,
    isAdminMiddleware,
    allMoviesMiddleware
}