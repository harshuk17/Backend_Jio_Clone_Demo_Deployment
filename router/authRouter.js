// ******IMPORTING HANDLER FOR AUTH***********
const express = require("express");
const {    
    loginHandler,
    signupHandler,
    logoutHandler,
    profileHandler,
    allMoviesHandler,
    protectedRouteMiddleware,
    isAdminMiddleware,
    allMoviesMiddleware} = require("../controller/authController");

// *******AUTH-ROUTER CREATED*************
const authRouter = express.Router();

// ***********AUTH KE METHODS AND ROUTES**************
authRouter.post("/login",loginHandler);
authRouter.post("/profile",protectedRouteMiddleware,profileHandler);
authRouter.post("/signup",signupHandler);
authRouter.post("/logout",logoutHandler);

module.exports= authRouter;