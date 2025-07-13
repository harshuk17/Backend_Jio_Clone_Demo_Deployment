// *********USER ROUTES AND THERE HANDLERS************

const express = require("express");
const userRouter = express.Router();
const {createUser,getAllUser,getById,deleteUser,updateUser}= require("../controller/userController");
const {protectedRouteMiddleware,isAdminMiddleware}=require("../controller/authController");

userRouter.post("/", createUser);
userRouter.get("/All", getAllUser);
userRouter.delete("/:id",protectedRouteMiddleware,isAdminMiddleware,deleteUser);
userRouter.patch("/:id",updateUser);

module.exports= userRouter;     