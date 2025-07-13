const userModel = require("../model/userModel");
const mongoose=require("mongoose");


const createUser = async function(req,res){
    try{

        const object= req.body;
        const user = await userModel.create(object);
        res.status(200).json({
            userData: user
        })

    }catch(err){
        console.log("unknown error occur");
        res.status(500).json({
            message: err
        })
    }
};
// getAll -> userModel.find()
const getAllUser = async function(req,res){
    try{
        console.log("inside all user handler");
        const user= await userModel.find();
        // const userObj= JSON.stringify(user);
        if(user.length != 0){
            res.status(200).json({
                allUsers: user
            })
        }else{
            res.status(404).json({
                message:"user list is null"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
};
// getbyId=userModel.findById
const getById = async function(req,res){
    let id = req.params.id;
    const user = await userModel.findById(id);

    try{
        if(user){
            res.status(200).json({
                userById:user
            })
        }else{
            res.status(404).json({
                message:"user not found enter valid id"
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }   
};
// deletedByUSer: user model delayByID
const deleteUser = async function(req,res){
    let id= req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    try{
        if(user==null){
            res.status(200).json({
                message:"success"
            })
        }else{
            res.status(404).json({
                message:"user not found"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
};
// updating datav
const updateUser = async function(req, res) {
    const id = req.params.id;
    const dataToBeUpdated = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, dataToBeUpdated, {
            new: true,        // returns the updated document
            runValidators: true // runs schema validations again
        });

        if (user) {
            res.status(200).json({
                message: "User updated successfully",
                updatedUser: user
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports={
    createUser,
    getAllUser,
    getById,
    deleteUser,
    updateUser
}