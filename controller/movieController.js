const { default: mongoose } = require("mongoose");
const movieModel = require("../model/movieModel");

const createMovie = async function(req,res){
    const movieObject = req.body;
    try{
        if(!movieObject){
            return res.status(404).json({
                message:"movie object not present"
            })
        }
        const newMovieObject = await movieModel.create(movieObject);
        res.status(200).json({
            message:"new movie created",
            movie:newMovieObject
        })
    }catch(err){
        res.status(500).json({
            message:"unknown error occured"
        })
    }
}
const getAllMovies= async function(req,res){
    const movieList = await movieModel.find();
    try{
        if(!movieList){
            return res.status(404).json({
                message:"movie list is empty"
            })
        }
        res.status(200).json({
            message:"all movies lists",
            movies:movieList
        })
    }catch(err){
        res.status(500).json({
            message:"some unknown error occured",
            error:err
        })
    }
}
const deleteMovie = async function(req,res){
    const movieId = req.params;
    const movieDelete = await movieModel.findByIdAndDelete(movieId);
    try{
         if(!movieDelete){
        return res.status(404).json({
            message:"movie was not find",
            status:"success"
        })
    }
    res.status(200).json({
        message:"movie was deleted",
        status:"success"
    })
    }catch(err){
        res.status(500).json({
            message:"some unknown error occured",
            error:err
        })
    }
}
const getMovieById = async function(req,res){
    const movieId = req.params.id;
    try{
        const movie = await movieModel.findById(movieId);
        if(!movie){
            return res.status(404).json({
                message:"movie not found! Enter valid Id"
            })
        }
        res.status(200).json({
            message:"movie was found",
            movie:movie
        })
    }catch(err){
        res.status(500).json({
            message:"some unknown error occured",
            error:err
        })
    }
}
module.exports= {createMovie,getAllMovies,deleteMovie,getMovieById}